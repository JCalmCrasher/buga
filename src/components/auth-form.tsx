import { Box, Button, Flex, Input } from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../lib/mutations";
import Logo from "./logo";

interface AuthFormProps {
  mode: "signin" | "signup";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password }).then((res) => {
      if (res.error) {
        setError(res.error);
      }
    });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <Logo />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            {error && (
              <small style={{ fontWeight: "bold" }}>
                {error}
              </small>
            )}
            <Input
              placeholder="johndoe@mail.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              marginTop={3}
            />
            <Input
              placeholder="********"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              marginTop={3}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              isFullWidth
              marginTop={8}
              sx={{
                "&:hover": {
                  bg: "green.300"
                }
              }}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
