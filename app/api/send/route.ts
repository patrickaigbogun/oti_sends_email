// app/api/sendEmail/route.ts
// import axios from 'axios';
// import { NextResponse } from 'next/server';
import EmailTemplate from '@/app/components/invoice_template';
import { config } from '@/config';
import { Resend } from 'resend';

const apiKey = config.apiKey
const resend = new Resend(apiKey);


interface FormData {
  name: string;
  email: string;
  message: string;
}

// export async function POST(req: Request) {
//   try {
//     const secret = 're_X4xZCs2q_LE8RUh4aMc8uNqz2vySs3RgE'
//     const { name, email, message }: FormData = await req.json();
//     const recipientEmail = 'rikkislayr@gmail.com'

//     const emailPromises = () =>
//       axios.post(
//         'https://api.brevo.com/v3/smtp/email',
//         {
//           to: [{ email: recipientEmail }],
//           sender: { email: 'main@patrickaigbogun.me', name: 'Patrick' },
//           subject: `New message from ${name}`,
//           htmlContent: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Message:</strong> ${message}</p>`,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'api-key': secret,
//           },
//         }
//       )


//     await Promise.all(recipientEmail);
//     return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('Brevo error:', error);
//     return NextResponse.json({ message: 'Email sending failed' }, { status: 500 });
//   }
// }


export async function POST(req: Request) {
  try {
    const { name, email, message }: FormData = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'main@patrickaigbogun.me',
      to: ['bigtechdomain@gmail.com'],
      subject: "Hello world",
      react: EmailTemplate({
        firstName: name,
        email: email,
        message: message
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}