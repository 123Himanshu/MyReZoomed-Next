"""
PDF and Image parsing utilities with OCR support using PyMuPDF for better performance
"""

import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io
from pdf2image import convert_from_bytes
from typing import Dict, Any, List, Optional
import imghdr
import logging

logger = logging.getLogger(__name__)

def detect_file_type(file_content: bytes) -> str:
    """
    Detect the file type using file signatures
    """
    # Check if it's an image
    img_type = imghdr.what(None, h=file_content)
    if img_type:
        return f"image/{img_type}"
    
    # Check for PDF signature
    if file_content.startswith(b'%PDF'):
        return "application/pdf"
    
    return "application/octet-stream"

def extract_text_from_image(image) -> str:
    """
    Extract text from an image using OCR
    """
    try:
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        logger.error(f"OCR Error: {str(e)}")
        return ""

def extract_text_from_pdf(file_content: bytes) -> str:
    """
    Extract text from PDF file with enhanced extraction and OCR fallback using PyMuPDF
    """
    if not file_content:
        logger.error("Empty file content provided")
        return ""
        
    extracted_text = []
    
    try:
        # Open PDF from memory buffer
        with fitz.open(stream=file_content, filetype="pdf") as doc:
            total_pages = len(doc)
            logger.info(f"Processing PDF with {total_pages} pages")
            
            for page_num in range(total_pages):
                logger.debug(f"Processing page {page_num + 1}/{total_pages}")
                page = doc[page_num]
                
                # First try normal text extraction
                text = page.get_text("text")
                if text.strip():
                    extracted_text.append(text)
                    continue
                
                # If no text found, try getting text from images
                images = page.get_images()
                if not images:
                    logger.debug(f"No images found on page {page_num + 1}")
                    continue
                    
                logger.debug(f"Found {len(images)} images on page {page_num + 1}")
                for img_idx, img in enumerate(images):
                    try:
                        xref = img[0]
                        pix = fitz.Pixmap(doc, xref)
                        
                        # Skip images that are too small
                        if pix.width < 50 or pix.height < 50:
                            logger.debug(f"Skipping small image: {pix.width}x{pix.height}")
                            continue
                            
                        try:
                            # Convert to PIL Image for OCR
                            if pix.n >= 3:  # RGB or RGBA
                                pil_image = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                            else:  # Grayscale
                                pil_image = Image.frombytes("L", [pix.width, pix.height], pix.samples)
                            
                            ocr_text = extract_text_from_image(pil_image)
                            if ocr_text:
                                extracted_text.append(ocr_text)
                        finally:
                            pix = None
                    except Exception as img_err:
                        logger.error(f"Error processing image {img_idx} on page {page_num + 1}: {str(img_err)}")
                        continue
        
        final_text = "\n".join(extracted_text)
        logger.info(f"Successfully extracted {len(final_text)} characters")
        return final_text
    
    except Exception as e:
        logger.error(f"Error extracting text with PyMuPDF: {str(e)}")
        
        # Fallback to pdf2image + OCR if PyMuPDF fails
        try:
            logger.info("Attempting fallback to pdf2image + OCR")
            images = convert_from_bytes(file_content)
            logger.info(f"Converted PDF to {len(images)} images")
            
            texts = []
            for idx, image in enumerate(images, 1):
                try:
                    logger.debug(f"Processing image {idx}/{len(images)}")
                    text = extract_text_from_image(image)
                    if text:
                        texts.append(text)
                except Exception as ocr_err:
                    logger.error(f"OCR error on image {idx}: {str(ocr_err)}")
                    continue
            
            final_text = "\n".join(texts)
            logger.info(f"Fallback extracted {len(final_text)} characters")
            return final_text
        
        except Exception as fallback_err:
            logger.error(f"Fallback extraction failed: {str(fallback_err)}")
            return ""

    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
        return ""
        
        return clean_extracted_text(extracted_text)
    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
        return ""

def clean_extracted_text(text: str) -> str:
    """
    Clean and format the extracted text
    """
    if not text:
        return ""
    
    # Split into lines and remove empty lines
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    
    # Remove duplicate consecutive lines
    cleaned_lines = []
    prev_line = None
    for line in lines:
        if line != prev_line:
            cleaned_lines.append(line)
            prev_line = line
    
    # Join lines with proper spacing
    cleaned_text = '\n'.join(cleaned_lines)
    
    return cleaned_text

def extract_resume_sections(pdf_text: str) -> Dict[str, Any]:
    """
    Extract different sections from resume text
    """
    sections = {
        "contactInfo": "",
        "summary": "",
        "experience": "",
        "education": "",
        "skills": [],  # Changed to array
        "projects": "",
        "certifications": "",
        "languages": []  # Changed to array
    }

    # Basic section detection based on common headers
    lines = pdf_text.split('\n')
    current_section = ""
    
    for line in lines:
        line = line.strip()
        lower_line = line.lower()
        
        # Determine section based on common headers
        if any(x in lower_line for x in ["email", "phone", "address"]):
            current_section = "contactInfo"
        elif any(x in lower_line for x in ["summary", "objective", "profile"]):
            current_section = "summary"
        elif any(x in lower_line for x in ["experience", "employment", "work history"]):
            current_section = "experience"
        elif any(x in lower_line for x in ["education", "academic"]):
            current_section = "education"
        elif any(x in lower_line for x in ["skills", "technologies", "competencies"]):
            current_section = "skills"
        elif any(x in lower_line for x in ["projects", "portfolio"]):
            current_section = "projects"
        elif any(x in lower_line for x in ["certifications", "certificates"]):
            current_section = "certifications"
        elif any(x in lower_line for x in ["languages", "language skills"]):
            current_section = "languages"
            
        # Add content to current section
        if current_section and line:
            if current_section == "skills":
                if not isinstance(sections[current_section], list):
                    sections[current_section] = []
                # Use the skill extractor for better parsing
                extracted_skills = extract_skills_from_text(line)
                sections[current_section].extend(extracted_skills)
            elif current_section == "languages":
                if not isinstance(sections[current_section], list):
                    sections[current_section] = []
                # Split by common delimiters and add to list
                items = [item.strip() for item in line.split(',') if item.strip()]
                sections[current_section].extend(items)
            else:
                if isinstance(sections[current_section], str):
                    sections[current_section] += line + "\n"
    
    # Clean up the sections
    cleaned_sections = {}
    for k, v in sections.items():
        if isinstance(v, str):
            cleaned_value = v.strip()
            if cleaned_value:
                cleaned_sections[k] = cleaned_value
        elif isinstance(v, list):
            # Remove duplicates and empty items from lists
            cleaned_list = list(set([item for item in v if item]))
            if cleaned_list:
                cleaned_sections[k] = cleaned_list
    
    return cleaned_sections

def extract_skills_from_text(text: str) -> List[str]:
    """
    Extract skills from text by splitting on common delimiters and using common patterns
    """
    # Common skill indicators
    skill_indicators = [
        "skills:", "technical skills:", "technologies:",
        "programming:", "languages:", "tools:",
        "frameworks:", "platforms:", "databases:"
    ]
    
    # Split text into lines
    lines = text.lower().split('\n')
    
    # Find skills section
    skills_text = ""
    is_skills_section = False
    
    for line in lines:
        line = line.strip()
        
        # Check if this line starts a skills section
        if any(indicator in line for indicator in skill_indicators):
            is_skills_section = True
            skills_text += line + " "
            continue
            
        # Check if we've reached the end of skills section
        if is_skills_section and (not line or any(word in line.lower() for word in ["experience", "education", "projects"])):
            break
            
        # Add line if we're in skills section
        if is_skills_section:
            skills_text += line + " "
    
    # Common delimiters in skill lists
    delimiters = [',', '•', '|', ';', '/', '\\', '·', '→', '-', '−']
    
    # Replace all delimiters with comma
    for delimiter in delimiters:
        skills_text = skills_text.replace(delimiter, ',')
    
    # Split by comma and clean up
    skills = [
        skill.strip()
        for skill in skills_text.split(',')
        if skill.strip() and len(skill.strip()) > 1  # Ignore single characters
    ]
    
    # Remove duplicates while preserving order
    seen = set()
    unique_skills = []
    for skill in skills:
        if skill.lower() not in seen:
            seen.add(skill.lower())
            unique_skills.append(skill)
    
    return unique_skills

def parse_docx_file(file_content: bytes) -> str:
    """
    Parse DOCX files
    TODO: Implement DOCX parsing
    """
    # Placeholder implementation
    return "Extracted DOCX text will go here..."
