"""
ATS scoring module using NLP techniques for resume analysis
"""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy
import numpy as np
from typing import Dict, List, Tuple
import re

# Load English language model for NLP
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import os
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def preprocess_text(text: str) -> str:
    """
    Preprocess text by removing special characters and normalizing
    """
    # Convert to lowercase
    text = text.lower()
    # Remove special characters but keep spaces
    text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text)
    # Remove extra whitespace
    text = ' '.join(text.split())
    return text

def calculate_tf_idf_score(resume_text: str, job_description: str) -> float:
    """
    Calculate TF-IDF based similarity score between resume and job description
    """
    # Preprocess texts
    resume_text = preprocess_text(resume_text)
    job_description = preprocess_text(job_description)
    
    # Create TF-IDF vectorizer
    vectorizer = TfidfVectorizer(stop_words='english')
    
    # Calculate TF-IDF matrices
    try:
        tfidf_matrix = vectorizer.fit_transform([job_description, resume_text])
        
        # Calculate cosine similarity
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        
        # Convert to percentage and round to 2 decimal places
        return round(similarity * 100, 2)
    except:
        return 0.0

def extract_skills(text: str) -> List[str]:
    """
    Extract skills from text using NLP
    """
    # Common technical skills and keywords
    common_skills = {
        'python', 'javascript', 'java', 'c++', 'ruby', 'php', 'swift', 'kotlin',
        'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask',
        'sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch',
        'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git',
        'machine learning', 'artificial intelligence', 'data science', 'blockchain',
        'devops', 'ci/cd', 'agile', 'scrum', 'rest api', 'graphql'
    }
    
    # Process the text
    doc = nlp(text.lower())
    
    # Extract noun phrases and technical terms
    extracted_skills = set()
    for token in doc:
        if token.text in common_skills:
            extracted_skills.add(token.text)
    for ent in doc.ents:
        if ent.text.lower() in common_skills:
            extracted_skills.add(ent.text.lower())
    
    return list(extracted_skills)

def find_skill_matches(resume_text: str, job_description: str) -> Tuple[List[str], List[str]]:
    """
    Find matching and missing skills between resume and job description
    """
    # Extract skills from both texts
    resume_skills = set(extract_skills(resume_text))
    job_skills = set(extract_skills(job_description))
    
    # Find matches and missing skills
    matched_skills = list(resume_skills.intersection(job_skills))
    missing_skills = list(job_skills - resume_skills)
    
    return matched_skills, missing_skills

def calculate_ats_score(resume_text: str, job_description: str) -> Dict:
    """
    Calculate comprehensive ATS score including keyword matches and content relevance
    """
    # Calculate base similarity score
    base_score = calculate_tf_idf_score(resume_text, job_description)
    
    # Find skill matches
    matched_skills, missing_skills = find_skill_matches(resume_text, job_description)
    
    # Calculate skill match percentage
    total_required_skills = len(matched_skills) + len(missing_skills)
    skill_match_score = len(matched_skills) / total_required_skills * 100 if total_required_skills > 0 else 0
    
    # Calculate final weighted score
    final_score = (base_score * 0.6) + (skill_match_score * 0.4)
    final_score = round(final_score, 1)
    
    return {
        "score": final_score,
        "matchedKeywords": matched_skills,
        "missingKeywords": missing_skills,
        "details": {
            "contentRelevance": base_score,
            "skillMatchScore": skill_match_score,
            "totalSkillsRequired": total_required_skills,
            "skillsMatched": len(matched_skills),
            "skillsMissing": len(missing_skills)
        }
    }
