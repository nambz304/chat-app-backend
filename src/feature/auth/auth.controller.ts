import type { Request, Response, NextFunction } from "express";
import logger from '../../common/middlewares/logger/logger.js';
import crypto from "crypto";
import db from "../../config/db.js";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  JWT_SECRET,
  FRONTEND_URL,
} = process.env;

export const authGoogle = (_req: Request, res: Response) => {
  logger.info('--->authGoogle');
  if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
    logger.info('Missing Google OAuth env');
    return res.status(500).json({ message: "Missing Google OAuth env" });
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};

export const authGoogleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('--->authGoogleCallback');
  try {
    const code = String(req.query.code || "");
    if (!code) {
      logger.info('Missing code');
      return res.status(400).json({ message: "Missing code" });
    }

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
      logger.info('Missing Google OAuth env');
      return res.status(500).json({ message: "Missing Google OAuth env" });
    }

    if (!JWT_SECRET) {
      return res.status(500).json({ message: "Missing JWT_SECRET" });
    }

    //1: get user infor from google
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      logger.info('Token exchange failed');
      return res.status(400).json({ message: "Token exchange failed", text });
    }

    const tokens = await tokenRes.json();
    logger.info("Token exchange success");

    // lấy userinfo từ Google
    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userInfoRes.ok) {
      const text = await userInfoRes.text();
      logger.info("Userinfo fetch failed");
      return res.status(400).json({ message: "Userinfo fetch failed", text });
    }
    logger.info("----userInfoRes ok");
    const userInfo = await userInfoRes.json();
    const email = String(userInfo.email || "").trim();

    if (!email) {
      logger.info("Missing email from Google");
      return res.status(400).json({ message: "Missing email from Google" });
    }
    logger.info("----email ok");
    // kiểm tra user trong DB
    const userRepo = db.getRepository("User");
    let user = await userRepo.findOne({ where: { email } });
    
    if (!user) {
      const pass = crypto.randomBytes(16).toString("hex");
      user = await userRepo.save({
        email,
        password: pass,
      });
      logger.info("User created from Google");
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const feBase = FRONTEND_URL || "http://localhost:5173";
    return res.redirect(`${feBase}/?token=${encodeURIComponent(token)}`);
  } catch (err) {
    logger.error("authGoogleCallback error", err);
    next(err);
  }
};

export const authMe = async (req: Request, res: Response) => {
  const auth = String(req.headers.authorization || "");
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) return res.status(401).json({ message: "Missing token" });
  if (!JWT_SECRET) return res.status(500).json({ message: "Missing JWT_SECRET" });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
    const userRepo = db.getRepository("User");
    const user = await userRepo.findOne({ where: { id: payload.sub } });

    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ data: user });
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};