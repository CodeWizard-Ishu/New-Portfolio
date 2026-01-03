import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { body, validationResult } from 'express-validator';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(helmet());
app.use(cors({
  origin: ['https://utkarshjaiswal.vercel.app', 'http://localhost:3000', 'http://localhost:5173'],
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 15 * 60 * 1000;

const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return next();
  }

  if (record.count >= RATE_LIMIT) {
    return res.status(429).json({ 
      success: false, 
      message: 'Too many requests. Please try again later.' 
    });
  }

  record.count++;
  next();
};

const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject must not exceed 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters')
];


app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Contact Form Backend API', 
    endpoints: {
      health: '/health',
      contact: 'POST /api/contact'
    }
  });
});

app.post('/api/contact', rateLimiter, contactValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, subject, message } = req.body;

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(500).json({ 
        success: false, 
        message: 'Email service is not configured' 
      });
    }

    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.YOUR_EMAIL!],
      replyTo: email,
      subject: subject ? `Contact Form: ${subject}` : 'New Message from Contact Form',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Message</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📬 New Contact Form Message</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #667eea; margin-top: 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Sender Information</h2>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 12px; font-weight: bold; color: #666; width: 120px; vertical-align: top;">👤 Name:</td>
                  <td style="padding: 12px; color: #333;">${name}</td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="padding: 12px; font-weight: bold; color: #666; vertical-align: top;">📧 Email:</td>
                  <td style="padding: 12px; color: #333;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
                </tr>
                ${subject ? `
                <tr>
                  <td style="padding: 12px; font-weight: bold; color: #666; vertical-align: top;">📋 Subject:</td>
                  <td style="padding: 12px; color: #333;">${subject}</td>
                </tr>
                ` : ''}
              </table>

              <h2 style="color: #667eea; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 30px;">💬 Message</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #667eea;">
                <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.8;">${message}</p>
              </div>

              <div style="margin-top: 30px; padding: 20px; background: #e7f3ff; border-radius: 6px; border-left: 4px solid #2196F3;">
                <p style="margin: 0; color: #1976D2; font-size: 14px;">
                  <strong>💡 Quick Reply:</strong> Simply hit reply to respond directly to ${name} at ${email}
                </p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
              <p style="margin: 5px 0;">📅 Received: ${new Date().toLocaleString('en-US', { 
                dateStyle: 'full', 
                timeStyle: 'short' 
              })}</p>
              <p style="margin: 5px 0;">🌐 Source: utkarshjaiswal.vercel.app</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
NEW CONTACT FORM MESSAGE
========================

From: ${name}
Email: ${email}
${subject ? `Subject: ${subject}` : ''}

MESSAGE:
--------
${message}

---
Received: ${new Date().toLocaleString()}
Source: utkarshjaiswal.vercel.app

Reply directly to this email to respond to ${name}.
      `
    });

    console.log('Email sent successfully:', data);

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! I will get back to you soon.' 
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📧 Ready to receive contact form submissions`);
});

export default app;