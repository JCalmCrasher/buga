import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { setHeader } from "../../lib/header";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
    }

    if (!password) {
      res.status(400).json({ error: "Password is required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          time: Date.now()
        },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        { expiresIn: process.env.NEXT_PUBLIC_JWT_DURATION }
      );

      setHeader(res, token);

      res.json({ message: "Login Successful", user });
    } else {
      res.status(401).json({ error: "Email or Password is wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
