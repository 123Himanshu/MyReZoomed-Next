"""
Gemini AI integration for resume enhancement and ATS analysis
"""

import google.generativeai as genai
import os
from typing import Dict, List, Optional
import json
import logging

logger = logging.getLogger(__name__)

# Direct API key configuration (temporary for testing)
api_key = "AIzaSyAB6SXYVqMItI7Zk44GI1WoS8vaLgNY8do"
os.environ["GEMINI_API_KEY"] = api_key
# Configure Gemini API
try:
    genai.configure(api_key=api_key)
    logger.info("Successfully configured Gemini API")
except Exception as e:
    logger.error(f"Error configuring Gemini API: {str(e)}")
    raise ValueError(f"Failed to configure Gemini API: {str(e)}")

# Configure Gemini API
genai.configure(api_key=api_key)

def get_gemini_model():
    """Get the most capable available Gemini model"""
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        return model
    except Exception as e:
        logger.error(f"Error getting Gemini model: {str(e)}")
        return None

def format_resume_sections(text: str) -> Dict:
    """
    Use Gemini to format and structure the resume text into clear sections
    """
    try:
        model = get_gemini_model()
        if not model:
            raise Exception("No suitable Gemini model found")

        prompt = f"""
        You are a professional resume parser and formatter. Format and structure the following resume text into clear sections.
        Identify and organize the following sections if present:
        - Personal Information (name, contact, etc.)
        - Summary/Objective
        - Skills
        - Work Experience
        - Education
        - Projects
        - Certifications
        - Additional Information

        For each work experience and education entry, ensure to extract and format:
        - Company/Institution name
        - Position/Degree
        - Dates
        - Key responsibilities/achievements

        Return the response as a structured JSON with these sections as keys.
        
        Resume text to parse:
        {text}
        """

        response = model.generate_content(prompt)
        if response and response.text:
            # Try to parse the response as JSON
            try:
                # Clean up the response text to ensure it's valid JSON
                json_str = response.text.strip()
                if json_str.startswith("```json"):
                    json_str = json_str.split("```json")[1]
                if json_str.endswith("```"):
                    json_str = json_str[:-3]
                
                # Log the raw and cleaned response
                logger.info("Raw Gemini response: %s", response.text)
                logger.info("Cleaned JSON string: %s", json_str)
                
                formatted_sections = json.loads(json_str.strip())
                logger.info("Parsed JSON response: %s", json.dumps(formatted_sections, indent=2))
                return formatted_sections
            except json.JSONDecodeError as e:
                logger.error(f"Error parsing Gemini response as JSON: {str(e)}")
                # Return a basic structure with the raw text
                return {"raw_text": response.text}
        else:
            raise Exception("No response from Gemini")

    except Exception as e:
        logger.error(f"Error in format_resume_sections: {str(e)}")
        return {"error": str(e), "raw_text": text}

def enhance_resume_with_ai(resume_text: str) -> Dict:
    """
    Enhance and format resume text using Gemini AI
    """
    try:
        model = get_gemini_model()
        if not model:
            raise Exception("No suitable Gemini model found")

        # First, format the resume into sections
        formatted_sections = format_resume_sections(resume_text)

        # Then, enhance each section
        prompt = f"""
        You are a professional resume enhancer. Improve the following resume sections to make them more impactful and ATS-friendly.
        For each bullet point:
        1. Use strong action verbs
        2. Include measurable achievements
        3. Remove fluff and passive language
        4. Ensure relevant keywords are included
        5. Make achievements quantifiable where possible

        Resume sections to enhance:
        {json.dumps(formatted_sections, indent=2)}
        
        Return the enhanced version in the same JSON structure.
        """

        response = model.generate_content(prompt)
        if response and response.text:
            try:
                # Clean up the response text to ensure it's valid JSON
                json_str = response.text.strip()
                if json_str.startswith("```json"):
                    json_str = json_str.split("```json")[1]
                if json_str.endswith("```"):
                    json_str = json_str[:-3]
                
                # Log the raw and cleaned response for enhancement
                logger.info("Raw enhancement response: %s", response.text)
                logger.info("Cleaned enhancement JSON string: %s", json_str)
                
                enhanced_sections = json.loads(json_str.strip())
                logger.info("Parsed enhancement JSON: %s", json.dumps(enhanced_sections, indent=2))
                return enhanced_sections
            except json.JSONDecodeError as e:
                logger.error(f"Error parsing enhanced resume JSON: {str(e)}")
                return formatted_sections
        else:
            return formatted_sections

    except Exception as e:
        logger.error(f"Error in enhance_resume_with_ai: {str(e)}")
        return {"error": str(e), "original_text": resume_text}

def analyze_ats_score(resume_text: str, job_description: str) -> Dict:
    """
    Analyze ATS compatibility using Gemini AI
    """
    try:
        model = get_gemini_model()
        if not model:
            raise Exception("No suitable Gemini model found")

        prompt = f"""
        Analyze this resume against the job description for ATS compatibility.
        
        Resume:
        {resume_text}
        
        Job Description:
        {job_description}
        
        Provide a detailed analysis in JSON format with the following structure:
        {
            "score": <overall score 0-100>,
            "analysis": {
                "keyword_match": <score 0-100>,
                "format_compatibility": <score 0-100>,
                "missing_keywords": [list of important missing keywords],
                "suggestions": [list of specific improvements]
            }
        }
        """

        response = model.generate_content(prompt)
        if response and response.text:
            try:
                # Clean up and parse the response
                json_str = response.text.strip()
                if json_str.startswith("```json"):
                    json_str = json_str.split("```json")[1]
                if json_str.endswith("```"):
                    json_str = json_str[:-3]
                
                # Log the responses
                logger.info("Raw ATS analysis response: %s", response.text)
                logger.info("Cleaned ATS analysis JSON string: %s", json_str)
                
                analysis_result = json.loads(json_str.strip())
                logger.info("Parsed ATS analysis: %s", json.dumps(analysis_result, indent=2))
                return analysis_result
            except json.JSONDecodeError as e:
                logger.error(f"Error parsing ATS analysis JSON: {str(e)}")
                return {
                    "score": 75,
                    "error": str(e),
                    "analysis": {
                        "keyword_match": 70,
                        "format_compatibility": 80,
                        "missing_keywords": [],
                        "suggestions": ["Error parsing AI response - using fallback values"]
                    }
                }
    except Exception as e:
        logger.error(f"Error in ATS analysis: {str(e)}")
        return {
            "score": 75,
            "error": str(e),
            "analysis": {
                "keyword_match": 70,
                "format_compatibility": 80,
                "missing_keywords": [],
                "suggestions": ["Error during analysis - using fallback values"]
            }
        }

def extract_skills_from_text(text: str) -> List[str]:
    """
    Extract skills from text using AI
    TODO: Implement skill extraction
    """
    # Placeholder implementation
    return ["Python", "JavaScript", "React", "Node.js"]
