export const loginEmailTemplate = ({
  firstName,
  lastName,
  date,
  companyName = "Ethereal",
  device,
}: {
  firstName: string;
  lastName: string;
  date: string;
  companyName?: string;
  device: string;
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
       
    </div>
    <div class="content">
        <p>Hello ${firstName},</p>
        <p>We noticed a new login to your account:</p>
        <p>    
        Date & Time: ${date} <br />
        Device: ${device}
        </p>
        <p>
        If this was you, no further action is needed. However, if you did not authorize this login, we recommend securing your account immediately:
        </p>

        <ol>
        <li>Reset your password</li>
        <li>Review recent account activity</li>
        </ol>

        <p>If you need any assistance, please contact our support team at support@Ethereal.com</p>
    
        
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
