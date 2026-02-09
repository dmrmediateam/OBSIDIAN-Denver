import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface FormData {
  [key: string]: any;
}

export async function sendFormEmail(
  formType: string,
  formData: FormData
): Promise<void> {
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'team@dmrmedia.org';
  const fromName = process.env.SENDGRID_FROM_NAME || 'DMR Media';
  const toEmail = process.env.SENDGRID_TO_EMAIL || 'arohm@dmrmedia.org';

  // Format form data for email
  const formFields = Object.entries(formData)
    .map(([key, value]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      return `${formattedKey}: ${value || 'N/A'}`;
    })
    .join('\n');

  const subject = `New ${formType} Form Submission - Obsidian Denver`;
  
  const htmlContent = `
    <h2>New ${formType} Form Submission</h2>
    <p>A new form submission has been received from the Obsidian Denver website.</p>
    <h3>Form Details:</h3>
    <pre style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; font-family: monospace; white-space: pre-wrap;">${formFields}</pre>
    <p><strong>Form Type:</strong> ${formType}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  `;

  const textContent = `
New ${formType} Form Submission

A new form submission has been received from the Obsidian Denver website.

Form Details:
${formFields}

Form Type: ${formType}
Submitted: ${new Date().toLocaleString()}
  `;

  const msg = {
    to: toEmail,
    from: {
      email: fromEmail,
      name: fromName,
    },
    subject: subject,
    text: textContent,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent successfully for ${formType} form`);
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error - we don't want email failures to break form submission
  }
}
