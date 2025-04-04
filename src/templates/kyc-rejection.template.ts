export const kycRejectionTemplate = ({
  firstName,
  status,
  companyName = "Ethereal",
}: {
  firstName: string;
  status: string;
  companyName?: string;
}) => {
  return `<!DOCTYPE html>
    <html lang="en">
        <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #010102;
            color: white;
            padding: 10px;
            text-align: center;
        }

        .content {
            padding: 20px;
            background-color: #f9f9f9;
        }

        .footer {
            text-align: center;
            font-size: 0.8em;
            color: #777;
            margin-top: 20px;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #010102;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }

        .otp {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            padding: 10px;
            background-color: #e8f4fd;
            border: 1px dashed #010102;
            border-radius: 5px;
            margin: 20px 0;
        }
        #logo{
            transform: translateY(20px) !important
        }
    </style>
    </head>
    <body>
    <div class="header">
     <img id="logo" src="https://res.cloudinary.com/dgn6edv1k/image/upload/v1740314841/Artboard_2_ybpuuq.png" width="50" height="50"/>
        <h1>Action Required: KYC Verification Update </h1>
    </div>
    <div class="content">
        <p>Hello ${firstName},</p>
        <p>
        We've reviewed your KYC verification submission and require additional information to complete the process.
        </p>
    <p>Details: </p>
    <ul>
        <li>Review Date: ${new Date()}</li>
        <li>Required Actions: Reach out to support</li>
    </ul>

     <p>Common reasons for additional verification: </p>
    <ul>
        <li>Unclear or expired document images</li>
        <li>Missing required information</li>
        <li>Mismatched personal details</li>
    </ul>

    <p>Need help? Our support team is available 24/7 to assist you.</p>
       
        <p>We're looking forward to seeing you in action!</p>
        <p>Best regards,<br>The ${companyName} Team</p>
    </div>
  <div class="footer">
    <p>This is an automated message, please do not reply directly to this email.</p>

    <hr />

    <p>
      Ethereal Services are provided by Ethereal Group Inc.
      A Company dully incorporated under the laws of Kentucky, United States of America.

   
      <span style="color: white; font-weight: bold;">828 Lane Allen Rd Ste 219, Lexington, KY 40504, US.</span>

      <br />
      <br />
      Copyright ©Ethereal Inc. 2025
    </p>
  </div>
    </body>
    </html>`;
};
