from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Unique Art Vision Studios API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Models for Unique Art Vision Studios
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    projectType: str
    message: str
    status: str = "new"
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    projectType: str
    message: str

class Subscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: Optional[str] = None
    subscribedAt: datetime = Field(default_factory=datetime.utcnow)
    isActive: bool = True

class SubscriberCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = None

class PortfolioStats(BaseModel):
    totalProjects: int = 500
    happyClients: int = 200
    yearsExperience: int = 5
    storiesCreated: int = 1000
    lastUpdated: datetime = Field(default_factory=datetime.utcnow)


# Validation functions
def validate_phone(phone: str) -> bool:
    if not phone:
        return True
    # Indian phone number validation
    pattern = r'^(\+91|91)?[6-9]\d{9}$'
    return bool(re.match(pattern, phone))

def validate_project_type(project_type: str) -> bool:
    valid_types = [
        "Cinematic Reels Production",
        "Event Highlight Videos", 
        "Talking-Head Edits",
        "Short-Form Social Content",
        "Corporate Videos",
        "Wedding Films",
        "Music Videos",
        "Other"
    ]
    return project_type in valid_types


# API Routes
@api_router.get("/")
async def root():
    return {"message": "Unique Art Vision Studios API", "status": "active"}


@api_router.post("/contact", response_model=dict)
async def submit_contact_form(submission: ContactSubmissionCreate):
    """Handle contact form submissions"""
    try:
        # Validate phone number if provided
        if submission.phone and not validate_phone(submission.phone):
            raise HTTPException(
                status_code=400, 
                detail="Invalid phone number format"
            )
        
        # Validate project type
        if not validate_project_type(submission.projectType):
            raise HTTPException(
                status_code=400,
                detail="Invalid project type"
            )
        
        # Create contact submission object
        contact_data = ContactSubmission(**submission.dict())
        
        # Save to database
        result = await db.contact_submissions.insert_one(contact_data.dict())
        
        if result.inserted_id:
            return {
                "success": True,
                "message": "Thank you for your inquiry! We'll get back to you within 24 hours.",
                "submissionId": contact_data.id
            }
        else:
            raise HTTPException(
                status_code=500,
                detail="Failed to submit contact form"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Contact form submission error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred"
        )


@api_router.post("/subscribe", response_model=dict)
async def subscribe_newsletter(subscriber_data: SubscriberCreate):
    """Handle newsletter subscriptions"""
    try:
        # Check if email already exists
        existing = await db.subscribers.find_one({"email": subscriber_data.email})
        if existing:
            return {
                "success": True,
                "message": "You're already subscribed to our updates!"
            }
        
        # Create new subscriber
        subscriber = Subscriber(**subscriber_data.dict())
        result = await db.subscribers.insert_one(subscriber.dict())
        
        if result.inserted_id:
            return {
                "success": True,
                "message": "Successfully subscribed to updates!"
            }
        else:
            raise HTTPException(
                status_code=500,
                detail="Failed to subscribe"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Newsletter subscription error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred"
        )


@api_router.get("/stats", response_model=PortfolioStats)
async def get_portfolio_stats():
    """Get portfolio statistics"""
    try:
        # Try to get stats from database
        stats = await db.stats.find_one()
        
        if stats:
            return PortfolioStats(**stats)
        else:
            # Return default stats if none in database
            default_stats = PortfolioStats()
            # Optionally save default stats to database
            await db.stats.insert_one(default_stats.dict())
            return default_stats
            
    except Exception as e:
        logging.error(f"Stats retrieval error: {str(e)}")
        # Return default stats on error
        return PortfolioStats()


@api_router.get("/contact-submissions", response_model=List[ContactSubmission])
async def get_contact_submissions(limit: int = 50):
    """Get contact submissions (admin endpoint)"""
    try:
        submissions = await db.contact_submissions.find().sort("createdAt", -1).limit(limit).to_list(limit)
        return [ContactSubmission(**submission) for submission in submissions]
    except Exception as e:
        logging.error(f"Contact submissions retrieval error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve submissions"
        )


@api_router.get("/subscribers", response_model=List[Subscriber])
async def get_subscribers(limit: int = 100):
    """Get newsletter subscribers (admin endpoint)"""
    try:
        subscribers = await db.subscribers.find({"isActive": True}).sort("subscribedAt", -1).limit(limit).to_list(limit)
        return [Subscriber(**subscriber) for subscriber in subscribers]
    except Exception as e:
        logging.error(f"Subscribers retrieval error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve subscribers"
        )


# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Unique Art Vision Studios API started successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Database connection closed")
