# Unique Art Vision Studios - Backend Integration Contracts

## API Endpoints Required

### 1. Contact Form Submission
**Endpoint:** `POST /api/contact`
**Purpose:** Handle contact form submissions from potential clients

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (optional)",
  "projectType": "string (required)",
  "message": "string (required)",
  "timestamp": "datetime (auto-generated)"
}
```

**Response:**
```json
{
  "success": boolean,
  "message": "string",
  "submissionId": "string"
}
```

### 2. Newsletter/Updates Subscription
**Endpoint:** `POST /api/subscribe`
**Purpose:** Allow visitors to subscribe to updates

**Request Body:**
```json
{
  "email": "string (required)",
  "name": "string (optional)"
}
```

### 3. Get Portfolio Stats
**Endpoint:** `GET /api/stats`
**Purpose:** Provide real-time statistics for the website

**Response:**
```json
{
  "totalProjects": number,
  "happyClients": number,
  "yearsExperience": number,
  "storiesCreated": number
}
```

## Database Models

### 1. Contact Submissions
```
Collection: contact_submissions
Fields:
- _id: ObjectId
- name: String
- email: String  
- phone: String (optional)
- projectType: String
- message: String
- status: String (new, contacted, completed)
- createdAt: Date
- updatedAt: Date
```

### 2. Subscribers
```
Collection: subscribers
Fields:
- _id: ObjectId
- email: String (unique)
- name: String (optional)
- subscribedAt: Date
- isActive: Boolean
```

### 3. Portfolio Stats
```
Collection: stats
Fields:
- _id: ObjectId
- totalProjects: Number
- happyClients: Number
- storiesCreated: Number
- lastUpdated: Date
```

## Current Mock Data Integration Points

### Frontend Mock Removal Plan:
1. **Contact Form:** Replace mock submission with actual API call
2. **Stats Display:** Replace static numbers with dynamic API data
3. **Form Validation:** Add proper validation and error handling
4. **Success Messages:** Implement proper toast notifications

### Backend Features to Implement:
1. **Contact Form Processing:** Store submissions and send notifications
2. **Email Integration:** Send auto-responses to form submissions
3. **Admin Dashboard:** View and manage contact submissions
4. **Analytics:** Track form submissions and popular project types
5. **Rate Limiting:** Prevent spam submissions

## Integration Steps:
1. Create MongoDB models and connections
2. Implement contact form API endpoint
3. Add email notifications (optional)
4. Update frontend to use real API endpoints
5. Add proper error handling and loading states
6. Test all form submissions and API responses

## Security Considerations:
- Input validation and sanitization
- Rate limiting for API endpoints
- CORS configuration
- Environment variable protection
- MongoDB injection prevention