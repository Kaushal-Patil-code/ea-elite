import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, subject, message, source } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required.' },
        { status: 400 },
      );
    }

    const isJapan = source === 'japan';
    const emailSubject =
      subject ||
      `${isJapan ? 'Japan Expansion' : 'Contact'} Enquiry from ${name}`;

    const accentColor = '#C5A55A';
    const darkBg = '#0B1224';
    const cardBg = '#111D35';
    const lightText = '#E2E8F0';
    const mutedText = '#94A3B8';
    const heading = isJapan ? 'Japan Expansion Enquiry' : 'Contact Enquiry';
    const tagline = isJapan
      ? 'New enquiry from the Japan Expansion page'
      : 'New enquiry from the Contact page';

    const detailRow = (label: string, value: string) => `
      <tr>
        <td style="padding:12px 16px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:${mutedText};width:120px;vertical-align:top">${label}</td>
        <td style="padding:12px 16px;font-size:15px;color:${lightText}">${value}</td>
      </tr>`;

    const htmlBody = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:${darkBg};font-family:'Segoe UI',Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${darkBg};padding:40px 20px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header -->
        <tr><td style="padding:32px 40px;text-align:center;border-bottom:2px solid ${accentColor}">
          <div style="font-size:24px;font-weight:700;letter-spacing:3px;color:${accentColor}">EA ELITE</div>
          <div style="font-size:11px;letter-spacing:2px;color:${mutedText};margin-top:4px;text-transform:uppercase">Trading Group</div>
        </td></tr>

        <!-- Badge -->
        <tr><td style="padding:30px 40px 0">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="background-color:${accentColor};color:${darkBg};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:6px 14px;border-radius:4px">
              ${isJapan ? 'Japan Expansion' : 'Contact Form'}
            </td>
          </tr></table>
        </td></tr>

        <!-- Title -->
        <tr><td style="padding:16px 40px 0">
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#FFFFFF">${heading}</h1>
          <p style="margin:6px 0 0;font-size:14px;color:${mutedText}">${tagline}</p>
        </td></tr>

        <!-- Details Card -->
        <tr><td style="padding:24px 40px 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${cardBg};border-radius:10px;border:1px solid rgba(197,165,90,0.15);overflow:hidden">
            <tr><td style="padding:16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${accentColor};border-bottom:1px solid rgba(197,165,90,0.1)">
              Enquiry Details
            </td></tr>
            <tr><td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${detailRow('Name', name)}
                ${detailRow('Email', `<a href="mailto:${email}" style="color:${accentColor};text-decoration:none">${email}</a>`)}
                ${phone ? detailRow('Phone', `<a href="tel:${phone}" style="color:${accentColor};text-decoration:none">${phone}</a>`) : ''}
                ${company ? detailRow('Company', company) : ''}
                ${subject ? detailRow('Subject', subject) : ''}
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- Message Card -->
        <tr><td style="padding:16px 40px 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${cardBg};border-radius:10px;border:1px solid rgba(197,165,90,0.15);overflow:hidden">
            <tr><td style="padding:16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${accentColor};border-bottom:1px solid rgba(197,165,90,0.1)">
              Message
            </td></tr>
            <tr><td style="padding:20px 16px;font-size:15px;line-height:1.7;color:${lightText}">
              ${message.replace(/\n/g, '<br>')}
            </td></tr>
          </table>
        </td></tr>

        <!-- Reply Button -->
        <tr><td style="padding:28px 40px 0" align="center">
          <a href="mailto:${email}" style="display:inline-block;background-color:${accentColor};color:${darkBg};font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 36px;border-radius:50px">
            Reply to ${name.split(' ')[0]}
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:36px 40px 32px;text-align:center;border-top:1px solid rgba(197,165,90,0.1);margin-top:32px">
          <div style="font-size:11px;color:${mutedText};letter-spacing:1px">
            E.A. Elite Trading Group &bull; Bangkok &bull; Tokyo &bull; Singapore &bull; Myanmar
          </div>
          <div style="font-size:10px;color:${mutedText};margin-top:8px;opacity:0.6">
            This email was sent from the EA Elite website enquiry form
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `EA Elite Website <${process.env.RESEND_FROM_EMAIL}>`,
        to: [process.env.NOTIFY_EMAIL],
        reply_to: email,
        subject: emailSubject,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      throw new Error('Email send failed');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 },
    );
  }
}
