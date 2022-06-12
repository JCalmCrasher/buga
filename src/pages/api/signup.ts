import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { setHeader } from "../../lib/header";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const salt = bcrypt.genSaltSync();
    const { firstname, lastname, email, password } = req.body;

    if (!firstname) {
      res.status(400).json({ error: "Firstname is required" });
    }

    if (!lastname) {
      res.status(400).json({ error: "Lastname is required" });
    }

    if (!email) {
      res.status(400).json({ error: "Email is required" });
    }

    if (!password) {
      res.status(400).json({ error: "Password is required" });
    }

    let user;

    try {
      user = await prisma.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, salt),
          firstName: firstname,
          lastName: lastname
        }
      });
    } catch (error) {
      return res.status(401).json({ error: "User already exists" });
    }

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

    res.json({ message: "Welcome to buga!", user });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
