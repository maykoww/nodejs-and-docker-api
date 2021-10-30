import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import env from "../config/env";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Jwt  token is missing');
  }

  const [, token] = authHeader.split(' ');


  try {
    const { sub } = verify(token, env.jwtSecret) as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Jwt is invalid');
  }
}
