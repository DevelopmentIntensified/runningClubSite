/** 
 * @param {Request} request
 * @returns {Promise<Response>}
 */
import { Resend } from 'resend';
import type { Actions } from './$types';
import { RESENDAPIKEY, CLUBEMAIL } from "$env/static/private"
const resend = new Resend(RESENDAPIKEY);

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    console.log(Object.keys(request));
    console.log(formData.get("email"));
    const res = await resend.emails.send({
      from: `${formData.get("name")} via LRC Contact form <lrc@resend.dev>`,
      to: [CLUBEMAIL],
      subject: 'LRC Contact Form from ' + formData.get("name"),
      html: '<p>Name: ' + formData.get("name") + '</p><p>Email: ' + formData.get("email") + '</p><p>Message: ' + formData.get("message") + '</p>',
    })
    console.log(res.error)

    if (!res.error) {
      return { success: true }
    } else {
      return { success: false }
    }
  }
} satisfies Actions;
