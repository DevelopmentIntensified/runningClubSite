/** 
 * @param {Request} request
 * @returns {Promise<Response>}
 */
import { Resend } from 'resend';
const resend = new Resend(process.env.RESENDAPIKEY);

export async function POST(request) {
  const formData = await request.formData()
  console.log(Object.keys(request));
  console.log(formData.get("email"));
  const res = await resend.emails.send({
      from: `${formData.get("name")} via LRC Contact form <lrc@resend.dev>`,
      to: [process.env.CLUBEMAIL],
      subject: 'LRC Contact Form',
      html: '<p>Name: ' + formData.get("name") + '</p><p>Email: ' + formData.get("email") + '</p><p>Message: ' + formData.get("message") + '</p>',
    })

  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data);
  } else {
    console.log(res)
  }
}
