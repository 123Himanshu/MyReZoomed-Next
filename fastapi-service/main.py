from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import uvicorn
import os
from typing import Optional

security = HTTPBearer()

# Import our modules (to be implemented)
# from gemini import enhance_resume_with_ai, analyze_ats_score
# from pdf_parser import extract_text_from_pdf
# from ats_score import calculate_tf_idf_score

app = FastAPI(title="Resume ATS API", version="1.0.0")

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Resume ATS API is running"}

@app.get("/ping")
async def ping():
    return {"status": "ok", "message": "Service is healthy"}

from pdf_parser import extract_text_from_pdf, detect_file_type, extract_text_from_image
from gemini import enhance_resume_with_ai
from PIL import Image
import io

import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
):
    try:
        logger.info(f"Received file: {file.filename}")
        
        # Read the file content
        content = await file.read()
        logger.info(f"File size: {len(content)} bytes")
        
        # Detect file type
        try:
            file_type = detect_file_type(content)
            logger.info(f"Detected file type: {file_type}")
        except Exception as e:
            logger.error(f"Error detecting file type: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Error detecting file type: {str(e)}")
        
        extracted_text = ""
        
        try:
            if file_type.startswith('image/'):
                # Handle image files with OCR
                logger.info("Processing image file with OCR")
                image = Image.open(io.BytesIO(content))
                extracted_text = extract_text_from_image(image)
                logger.info(f"OCR text length: {len(extracted_text) if extracted_text else 0}")
            elif file_type == 'application/pdf':
                # Handle PDF files
                logger.info("Processing PDF file")
                extracted_text = extract_text_from_pdf(content)
                logger.info(f"PDF text length: {len(extracted_text) if extracted_text else 0}")
            else:
                logger.error(f"Unsupported file type: {file_type}")
                raise HTTPException(
                    status_code=400,
                    detail=f"Unsupported file type: {file_type}. Only PDF and image files are supported."
                )
        except Exception as e:
            logger.error(f"Error processing file: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail=f"Error processing file: {str(e)}"
            )
        
        if not extracted_text:
            logger.error("No text could be extracted from the file")
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the file. Please ensure the file contains readable text."
            )
            
        try:
            # Use Gemini to parse and enhance the resume
            logger.info("Using Gemini AI to parse and enhance the resume")
            enhanced_data = enhance_resume_with_ai(extracted_text)
            logger.info("Resume enhancement complete")
        except Exception as e:
            logger.error(f"Error parsing text into sections: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail=f"Error parsing resume sections: {str(e)}"
            )
        
        try:
            # Create the response
            logger.info("Creating response")
            response = JSONResponse(content={
                "status": "success",
                "filename": file.filename,
                "originalText": extracted_text,
                "enhancedData": enhanced_data
            })
            response.headers["Access-Control-Allow-Credentials"] = "true"
            logger.info(f"Successfully processed file: {file.filename}")
            print(response)
            return response
            
        except Exception as e:
            logger.error(f"Error creating response: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail=f"Error creating response: {str(e)}"
            )
    except Exception as e:
        logger.error(f"Unhandled error in upload endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/enhance-resume")
async def enhance_resume(file: UploadFile = File(...)):
    """
    Endpoint to enhance resume using AI
    TODO: Implement actual enhancement logic
    """
    try:
        # Validate file type
        if not file.filename.endswith(('.pdf', '.doc', '.docx')):
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        # TODO: Extract text from PDF
        # text = extract_text_from_pdf(file)
        
        # TODO: Enhance with Gemini AI
        # enhanced_text = enhance_resume_with_ai(text)
        
        return JSONResponse({
            "success": True,
            "message": "Resume enhancement endpoint ready",
            "filename": file.filename
        })
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/check-ats")
async def check_ats_score(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Endpoint to check ATS score
    TODO: Implement actual ATS scoring logic
    """
    try:
        # Validate file type
        if not file.filename.endswith(('.pdf', '.doc', '.docx')):
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        # TODO: Extract text from resume
        # resume_text = extract_text_from_pdf(file)
        
        # TODO: Calculate TF-IDF score
        # score = calculate_tf_idf_score(resume_text, job_description)
        
        # TODO: Analyze with Gemini AI
        # analysis = analyze_ats_score(resume_text, job_description)
        
        return JSONResponse({
            "success": True,
            "message": "ATS checking endpoint ready",
            "filename": file.filename,
            "job_description_length": len(job_description)
        })
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
