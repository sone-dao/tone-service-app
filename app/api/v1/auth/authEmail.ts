import { sb } from '../../utils/sb'
import { genAccessToken, genSessionToken } from '../../utils/tokens'

export default async function authEmail(
  email: string,
  nonce: string,
  otp: string
) {
  return await new Promise(async (resolve, reject) => {
    nonce && otp && reject({ status: 500, ok: false, message: 'NONCE_OR_OTP' })

    const { data: user, error: userSqlError } = await sb
      .from('tone_users')
      .select('*')
      .eq('email', email)
      .single()

    if (userSqlError)
      reject({ ok: false, message: 'DATABASE_ERROR', error: userSqlError })

    const nonces = user.loginAttempts.map((attempt: any) => attempt.nonce)

    !nonces.includes(nonce) &&
      reject({ status: 401, ok: false, message: 'INVALID_NONCE' })

    const tokenPayload = { userId: user.userId, roles: user.roles }

    const sessionToken = await genSessionToken(
      tokenPayload,
      process.env.SESSION_TOKEN_SECRET as string
    )

    const accessToken = await genAccessToken(
      tokenPayload,
      process.env.ACCESS_TOKEN_SECRET as string
    )

    const activeSessions = user.activeSessions || []

    const updatedSessions = [
      ...activeSessions,
      { sessionToken, createdOn: Date.now() },
    ]

    const loginAttempts = user.loginAttempts || []

    const updatedAttempts = loginAttempts
      .map((attempt: any) => (attempt.nonce == nonce ? null : attempt))
      .filter((x: any) => x)

    const { error: updateSessionsSqlError } = await sb
      .from('tone_users')
      .update({
        activeSessions: updatedSessions,
        loginAttempts: updatedAttempts,
      })
      .eq('userId', user.userId)

    if (updateSessionsSqlError)
      reject({
        status: 500,
        ok: false,
        message: 'DATABASE_ERROR',
        error: updateSessionsSqlError,
      })

    resolve({
      ok: true,
      message: 'USER_LOGGED_IN',
      tokens: {
        access: accessToken,
        session: sessionToken,
      },
    })
  })
}
