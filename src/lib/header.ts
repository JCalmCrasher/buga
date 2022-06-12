import cookie from "cookie";
import { NextApiResponse } from "next";

export const setHeader = (header: NextApiResponse, token: string) => {
  header.setHeader(
    "Set-Cookie",
    cookie.serialize("JOSHX_ACCESS_TOKEN", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    })
  );
};
