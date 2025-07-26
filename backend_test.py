#!/usr/bin/env python3
"""
Backend API Testing for Unique Art Vision Studios
Tests all API endpoints with valid and invalid data
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from frontend .env
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading backend URL: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("ERROR: Could not get backend URL from frontend/.env")
    sys.exit(1)

API_URL = f"{BASE_URL}/api"
print(f"Testing API at: {API_URL}")

class TestResults:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.errors = []
    
    def add_pass(self, test_name):
        self.passed += 1
        print(f"✅ PASS: {test_name}")
    
    def add_fail(self, test_name, error):
        self.failed += 1
        self.errors.append(f"{test_name}: {error}")
        print(f"❌ FAIL: {test_name} - {error}")
    
    def summary(self):
        total = self.passed + self.failed
        print(f"\n{'='*60}")
        print(f"TEST SUMMARY: {self.passed}/{total} tests passed")
        if self.errors:
            print(f"\nFAILED TESTS:")
            for error in self.errors:
                print(f"  - {error}")
        print(f"{'='*60}")

def test_api_root():
    """Test the root API endpoint"""
    results = TestResults()
    
    try:
        response = requests.get(f"{API_URL}/")
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "status" in data:
                results.add_pass("API Root endpoint")
            else:
                results.add_fail("API Root endpoint", "Missing expected fields in response")
        else:
            results.add_fail("API Root endpoint", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("API Root endpoint", f"Request failed: {str(e)}")
    
    return results

def test_contact_form_valid():
    """Test contact form with valid data"""
    results = TestResults()
    
    # Test data as specified in the request
    test_data = {
        "name": "Test Client",
        "email": "test@example.com",
        "phone": "+919876543210",
        "projectType": "Cinematic Reels Production",
        "message": "I want to create a cinematic reel for my brand"
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=test_data)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "submissionId" in data:
                results.add_pass("Contact form submission with valid data")
                print(f"  Submission ID: {data['submissionId']}")
            else:
                results.add_fail("Contact form submission", "Missing success flag or submissionId")
        else:
            results.add_fail("Contact form submission", f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        results.add_fail("Contact form submission", f"Request failed: {str(e)}")
    
    return results

def test_contact_form_invalid():
    """Test contact form with invalid data"""
    results = TestResults()
    
    # Test invalid email
    invalid_email_data = {
        "name": "Test Client",
        "email": "invalid-email",
        "phone": "+919876543210",
        "projectType": "Cinematic Reels Production",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=invalid_email_data)
        if response.status_code == 422:  # Pydantic validation error
            results.add_pass("Contact form - Invalid email validation")
        else:
            results.add_fail("Contact form - Invalid email validation", f"Expected 422, got {response.status_code}")
    except Exception as e:
        results.add_fail("Contact form - Invalid email validation", f"Request failed: {str(e)}")
    
    # Test invalid phone number
    invalid_phone_data = {
        "name": "Test Client",
        "email": "test@example.com",
        "phone": "123",  # Invalid phone
        "projectType": "Cinematic Reels Production",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=invalid_phone_data)
        if response.status_code == 400:
            data = response.json()
            if "Invalid phone number" in data.get("detail", ""):
                results.add_pass("Contact form - Invalid phone validation")
            else:
                results.add_fail("Contact form - Invalid phone validation", f"Wrong error message: {data}")
        else:
            results.add_fail("Contact form - Invalid phone validation", f"Expected 400, got {response.status_code}")
    except Exception as e:
        results.add_fail("Contact form - Invalid phone validation", f"Request failed: {str(e)}")
    
    # Test invalid project type
    invalid_project_data = {
        "name": "Test Client",
        "email": "test@example.com",
        "phone": "+919876543210",
        "projectType": "Invalid Project Type",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=invalid_project_data)
        if response.status_code == 400:
            data = response.json()
            if "Invalid project type" in data.get("detail", ""):
                results.add_pass("Contact form - Invalid project type validation")
            else:
                results.add_fail("Contact form - Invalid project type validation", f"Wrong error message: {data}")
        else:
            results.add_fail("Contact form - Invalid project type validation", f"Expected 400, got {response.status_code}")
    except Exception as e:
        results.add_fail("Contact form - Invalid project type validation", f"Request failed: {str(e)}")
    
    return results

def test_portfolio_stats():
    """Test portfolio stats endpoint"""
    results = TestResults()
    
    try:
        response = requests.get(f"{API_URL}/stats")
        if response.status_code == 200:
            data = response.json()
            required_fields = ["totalProjects", "happyClients", "yearsExperience", "storiesCreated", "lastUpdated"]
            if all(field in data for field in required_fields):
                results.add_pass("Portfolio stats endpoint")
                print(f"  Stats: {data['totalProjects']} projects, {data['happyClients']} clients, {data['yearsExperience']} years")
            else:
                missing = [field for field in required_fields if field not in data]
                results.add_fail("Portfolio stats endpoint", f"Missing fields: {missing}")
        else:
            results.add_fail("Portfolio stats endpoint", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Portfolio stats endpoint", f"Request failed: {str(e)}")
    
    return results

def test_newsletter_subscription():
    """Test newsletter subscription endpoint"""
    results = TestResults()
    
    # Test valid subscription
    test_data = {
        "email": "newsletter@example.com",
        "name": "Newsletter Subscriber"
    }
    
    try:
        response = requests.post(f"{API_URL}/subscribe", json=test_data)
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                results.add_pass("Newsletter subscription with valid data")
            else:
                results.add_fail("Newsletter subscription", "Missing success flag")
        else:
            results.add_fail("Newsletter subscription", f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        results.add_fail("Newsletter subscription", f"Request failed: {str(e)}")
    
    # Test duplicate subscription
    try:
        response = requests.post(f"{API_URL}/subscribe", json=test_data)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "already subscribed" in data.get("message", "").lower():
                results.add_pass("Newsletter subscription - Duplicate handling")
            else:
                results.add_fail("Newsletter subscription - Duplicate handling", f"Unexpected response: {data}")
        else:
            results.add_fail("Newsletter subscription - Duplicate handling", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Newsletter subscription - Duplicate handling", f"Request failed: {str(e)}")
    
    # Test invalid email
    invalid_data = {
        "email": "invalid-email",
        "name": "Test User"
    }
    
    try:
        response = requests.post(f"{API_URL}/subscribe", json=invalid_data)
        if response.status_code == 422:  # Pydantic validation error
            results.add_pass("Newsletter subscription - Invalid email validation")
        else:
            results.add_fail("Newsletter subscription - Invalid email validation", f"Expected 422, got {response.status_code}")
    except Exception as e:
        results.add_fail("Newsletter subscription - Invalid email validation", f"Request failed: {str(e)}")
    
    return results

def test_mongodb_integration():
    """Test MongoDB integration by checking data persistence"""
    results = TestResults()
    
    # Test contact submissions retrieval (admin endpoint)
    try:
        response = requests.get(f"{API_URL}/contact-submissions")
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                results.add_pass("MongoDB integration - Contact submissions retrieval")
                print(f"  Found {len(data)} contact submissions in database")
            else:
                results.add_fail("MongoDB integration - Contact submissions", "Response is not a list")
        else:
            results.add_fail("MongoDB integration - Contact submissions", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("MongoDB integration - Contact submissions", f"Request failed: {str(e)}")
    
    # Test subscribers retrieval (admin endpoint)
    try:
        response = requests.get(f"{API_URL}/subscribers")
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                results.add_pass("MongoDB integration - Subscribers retrieval")
                print(f"  Found {len(data)} subscribers in database")
            else:
                results.add_fail("MongoDB integration - Subscribers", "Response is not a list")
        else:
            results.add_fail("MongoDB integration - Subscribers", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("MongoDB integration - Subscribers", f"Request failed: {str(e)}")
    
    return results

def main():
    """Run all tests"""
    print("🚀 Starting Unique Art Vision Studios Backend API Tests")
    print(f"Testing against: {API_URL}")
    print("="*60)
    
    all_results = TestResults()
    
    # Run all test suites
    test_suites = [
        ("API Root", test_api_root),
        ("Contact Form - Valid Data", test_contact_form_valid),
        ("Contact Form - Invalid Data", test_contact_form_invalid),
        ("Portfolio Stats", test_portfolio_stats),
        ("Newsletter Subscription", test_newsletter_subscription),
        ("MongoDB Integration", test_mongodb_integration)
    ]
    
    for suite_name, test_func in test_suites:
        print(f"\n📋 Running {suite_name} tests...")
        results = test_func()
        all_results.passed += results.passed
        all_results.failed += results.failed
        all_results.errors.extend(results.errors)
    
    # Print final summary
    all_results.summary()
    
    # Return exit code based on results
    return 0 if all_results.failed == 0 else 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)