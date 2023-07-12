import { v4 as uuidv4 } from 'uuid'
import { sendMail } from '../../utils/email'
import { sb } from '../../utils/sb'

export default async function genAttempt(email: string = '') {
  return await new Promise(async (resolve, reject) => {
    const { data: user, error: usersSqlError } = await sb
      .from('tone_users')
      .select('*')
      .eq('email', email)
      .single()

    if (usersSqlError)
      reject({ ok: false, message: 'DATABASE_ERROR', error: usersSqlError })

    let otp = ''

    for (let x = 0; x < 6; x++) otp += Math.floor(Math.random() * 10)

    const nonce = uuidv4() || ''

    const attempt = {
      createdOn: Date.now(),
      nonce,
      otp,
    }

    const loginAttempts = user.loginAttempts || []

    const updatedAttempts = [...loginAttempts, attempt]

    const { error: nonceSqlError } = await sb
      .from('tone_users')
      .update({ loginAttempts: updatedAttempts })
      .eq('email', email)

    if (nonceSqlError)
      reject({
        ok: false,
        message: 'ERROR_UPDATING_NONCE',
        error: nonceSqlError,
      })

    await sendMail({
      from: 'auth@tone.audio',
      to: email,
      subject: `Login code for ${email}`,
      body: {
        html: otp,
        text: otp,
      },
    })
      .then((response) => resolve({ status: 200, ok: true, response }))
      .catch((error) => reject({ status: 500, ok: false, error }))
  })
}
