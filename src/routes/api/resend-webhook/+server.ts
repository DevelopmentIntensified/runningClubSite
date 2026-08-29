import { json, error } from '@sveltejs/kit';
import { Resend, type ListAttachmentsResponseSuccess } from 'resend';
import {
  CLUB_INBOX_EMAIL,
  DOMAIN,
  RESEND_API_KEY,
  RESEND_WEBHOOK_SECRET
} from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export async function POST({ request }) {
  const payload = await request.text();

  let event;
  try {
    event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get('svix-id') ?? '',
        timestamp: request.headers.get('svix-timestamp') ?? '',
        signature: request.headers.get('svix-signature') ?? ''
      },
      webhookSecret: RESEND_WEBHOOK_SECRET
    });
  } catch {
    throw error(401, 'Invalid webhook signature');
  }

  if (event.type !== 'email.received') {
    return json({ message: 'OK' });
  }

  const { data: email } = await resend.emails.receiving.get(event.data.email_id);
  const { data: list } = await resend.emails.receiving.attachments.list({
    emailId: event.data.email_id
  });

  const attachments = await Promise.all(
    ((list?.data ?? []) as ListAttachmentsResponseSuccess['data']).map(async (att) => {
      const buf = Buffer.from(await (await fetch(att.download_url)).arrayBuffer());
      return { filename: att.filename, content: buf.toString('base64') };
    })
  );

  await resend.emails.send({
    from: `${event.data.from} via <forwarder@${DOMAIN}>`,
    to: [CLUB_INBOX_EMAIL],
    subject: email?.subject ?? '',
    html: email?.html ?? '',
    text: email?.text ?? '',
    attachments
  });

  return json({ message: 'OK' });
}
