const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, checkSize, nextStep, notes } = req.body;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn("Missing SMTP credentials in environment. Simulating success.");
    console.log("Lead captured:", req.body);
    return res.status(200).json({ success: true, message: "Logged to console" });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT),
    secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; background-color: #0F1C32; color: #FFFFFF; padding: 20px;">
      <h2 style="color: #F5C637;">PowerWyze — Agentic intelligence for live events</h2>
      <p style="color: rgba(255,255,255,0.72);">New investor interest received from the interactive kiosk.</p>
      
      <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); color: #F5C637; width: 150px;">Name</td>
          <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1);">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); color: #F5C637;">Email</td>
          <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1);">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); color: #F5C637;">Check Size</td>
          <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1);">${checkSize}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); color: #F5C637;">Next Step</td>
          <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1);">${nextStep}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); color: #F5C637;">Notes</td>
          <td style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1);">${notes || '-'}</td>
        </tr>
      </table>

      <div style="margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; font-size: 12px; color: rgba(255,255,255,0.72);">
        <p>Follow @powerwyze</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: SMTP_FROM || '"PowerWyze Kiosk" <no-reply@powerwyze.com>',
      to: 'stephanie@powerwyze.com',
      subject: `🔔 New PowerWyze investor interest — ${name} (${checkSize})`,
      html: htmlBody,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
