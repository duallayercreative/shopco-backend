import { Response } from "express";
import { cookieUtils } from "./cookie.js";
import ms, { StringValue } from "ms";
import { env } from "../config/env.js";

const setBetterAuthSessionCookie = (res: Response, token: string) => {
  cookieUtils.setCookie(res, "better-auth.session_token", token, {
    secure: true,
    sameSite: "none",
    httpOnly: true,
    path: "/",
    maxAge: Math.floor(ms(env.BETTER_AUTH_SESSION_EXPIRES_IN as StringValue)),
  });
};

export const tokenUtils = {
  setBetterAuthSessionCookie,
};
