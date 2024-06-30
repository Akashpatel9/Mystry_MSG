import { ApiResponse } from "@/types/ApiResponse";

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ): Promise<ApiResponse> {
//   try {
//     await resend.emails.send({
//       from: "akashpatelsingh9893693091@gmail.com",
//       to: email,
//       subject: 'Mystery Message Verification Code',
//       react: VerificationEmail({ username, otp: verifyCode }),
//     });
//     return { success: true, message: 'Verification email sent successfully.' };
//   } catch (emailError) {
//     console.error('Error sending verification email:', emailError);
//     return { success: false, message: 'Failed to send verification email.' };
//   }
// }

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Mystery Message Verification Code',
      html:`<Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: ${verifyCode}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello ${username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
        </Row>
        <Row>
          <Text style="font:bold;">${verifyCode}</Text> 
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>`,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, message: "Verification email sent successfully." };

  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
