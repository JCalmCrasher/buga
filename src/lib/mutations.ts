import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: { firstname; lastname; email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};
