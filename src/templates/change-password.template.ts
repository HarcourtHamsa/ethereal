export const changePasswordEmailTemplate = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Login Activity</title>
          <script src="https://kit.fontawesome.com/05a6f2a2fb.js" crossorigin="anonymous"></script>
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
        <h1>Password Changed</h1>
    </div>
          <main>
              <p>Hello ${firstName} ${lastName},</p>
              <p>
    
             You have successfully changed your password on Ethereal.
              </p>
    
  
              <p>If you did not initiate this request, please send us an email at <b>support@Ethereal.com</b>
    
                  <p>
                      Best Regards,<br>Team Ethereal
                  </p>
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
          </main>
      </body>
      </html>`;
};
