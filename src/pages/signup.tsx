import AuthForm from "../components/auth-form";

export const Signup = () => {
  return <AuthForm mode="signup" />;
};

Signup.authPage = true;

export default Signup;
