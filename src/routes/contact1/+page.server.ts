/**
 * @param {Request} request
 * @returns {Promise<Response>}
 */
import { Resend } from 'resend';
import type { Actions } from '../contact/$types';
import { RESENDAPIKEY, CLUBEMAIL } from '$env/static/private';
const resend = new Resend(RESENDAPIKEY);

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const honeypot = formData.get('honeypot');
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (honeypot && honeypot !== '') {
      return { success: true };
    }

    if (!name || !email || !message || name.length > 100 || message.length > 2000) {
      return { success: false };
    }

    if (/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/i.test(message) && /http|www\./i.test(message)) {
      return { success: false };
    }

    const res = await resend.emails.send({
      from: 'Liberty Running Club Contact <libertyrunningclub@libertyrunningclub.com>',
      to: [CLUBEMAIL],
      subject: 'LRC Contact Form from ' + name,
      html:
        '<p><strong>Name:</strong> ' +
        name +
        '</p><p><strong>Email:</strong> ' +
        email +
        '</p><p><strong>Message:</strong></p><p>' +
        message.replace(/\n/g, '<br>') +
        '</p>'
    });
    console.log(res.error);

    if (!res.error) {
      return { success: true };
    } else {
      return { success: false };
    }
  }
} satisfies Actions;
