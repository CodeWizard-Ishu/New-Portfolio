# Contact Form Backend

A lightweight Node.js backend service for handling contact form submissions from [utkarshjaiswal.vercel.app](https://utkarshjaiswal.vercel.app). Visitors can send messages directly to your email without needing their own email accounts.

## ✨ Features

- 📧 Email delivery using Resend API
- 🛡️ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Input validation and sanitization
- 🔒 CORS protection
- 🎨 Beautiful HTML email templates
- 📱 Mobile-friendly responses
- ⚡ TypeScript support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Resend account ([Sign up free](https://resend.com))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd contact-form-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file with:

```env
PORT=3000
RESEND_API_KEY=re_your_api_key_here
YOUR_EMAIL=your-email@example.com
FROM_EMAIL=onboarding@resend.dev
NODE_ENV=development
```

**Getting Resend API Key:**
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys → Create API Key
3. Copy and paste into `.env`

### Run Development Server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

## 📡 API Endpoints

### POST `/api/contact`

Send a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Your message here"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! I will get back to you soon."
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-01-04T10:30:00.000Z"
}
```

## 🧪 Testing

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

**Using JavaScript:**
```javascript
const response = await fetch('http://localhost:3000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Hello',
    message: 'Test message'
  })
});

const data = await response.json();
console.log(data);
```

## 🌐 Deployment

### Deploy to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repository
4. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add environment variables from `.env`
6. Deploy!

### Deploy to Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

Add environment variables in Railway dashboard.

## 📂 Project Structure

```
contact-form-backend/
├── src/
│   └── index.ts          # Main application file
├── dist/                 # Compiled JavaScript (generated)
├── .env                  # Environment variables (create this)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Built With

- [Express](https://expressjs.com/) - Web framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Resend](https://resend.com/) - Email delivery
- [Helmet](https://helmetjs.github.io/) - Security headers
- [CORS](https://github.com/expressjs/cors) - Cross-origin support

## 📝 License

MIT

## 🤝 Support

For issues or questions, please [open an issue](https://github.com/your-username/contact-form-backend/issues) or contact me through the website.

---

Made with ❤️ by Utkarsh Jaiswal