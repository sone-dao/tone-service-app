import jwt from 'jsonwebtoken'

export async function verifyToken(token: string, secret: string) {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      error && reject(error)
      resolve(decoded)
    })
  })
}

export async function signToken(payload: object, secret: string) {
  return await new Promise((resolve, reject) => {
    jwt.sign(payload, secret, (error, token) => {
      error && reject(error)
      resolve(token)
    })
  })
}
