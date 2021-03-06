import { Request, Response, NextFunction } from 'express'
import { verify, decode } from 'jsonwebtoken'

import authconfig from '../config/auth'

import AppError from '../errors/AppError'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  request: Request,
  reposnse: Response,
  next: NextFunction
): void {

  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')
  try {
    const decoded = verify(token, authconfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub
    }
    console.log(decoded)

    return next()

  } catch (error) {
    throw new AppError('Invalid JWT token',401)
  }
}