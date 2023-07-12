interface ISendMailConfig {
  from: string
  to: string
  subject: string
  body: {
    html: string
    text: string
  }
  messageStream?: string
  debug?: boolean
}

export async function sendMail(config: ISendMailConfig) {
  return new Promise(async (resolve, reject) => {
    // prettier-ignore
    const body = {
    "From": config.from,
    "To": config.debug ? 'test@blackhole.postmarkapp.com' : config.to,
    "Subject": config.subject,
    "HtmlBody": config.body.html,
    "TextBody": config.body.text,
    "MessageStream": config.messageStream || 'outbound',
}

    await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': process.env.POSTMARK_SECRET as string,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error))
  })
}
