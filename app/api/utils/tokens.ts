import { signToken } from './jwt'

export async function genAccessToken(payload: any, secret: string) {
  return await new Promise(async (resolve, reject) => {
    !secret && reject({ message: 'NO_SECRET' })

    const expiresIn = Math.floor(Date.now() / 1000) + 60 * 15

    await signToken({ data: payload, createdOn: Date.now(), expiresIn }, secret)
      .then((token) => resolve(token))
      .catch((error) => reject(error))
  })
}

export async function genSessionToken(payload: any, secret: string) {
  return await new Promise(async (resolve, reject) => {
    !secret && reject({ message: 'NO_SECRET' })

    await signToken({ data: payload, createdOn: Date.now() }, secret)
      .then((token) => resolve(token))
      .catch((error) => reject(error))
  })
}
