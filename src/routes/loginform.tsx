import { Link, useNavigate } from "react-router-dom";
import { Input, Container, Text, Button, Flex } from "@chakra-ui/react";
import useAuthStore from "../hooks/newAuthStore";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z.object({
  
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
import { loginUser } from "@/features/authentication/loginapi";
type FormData = z.infer<typeof schema>;
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const result = await loginUser(data.email, data.password);

      if (result.token) {
        login(result.token);
        alert("Login successful!");

        navigate("/home");
      } else {
        setError(result.message || "Login failed");
        console.log(error);
        alert(result.message);
      }
    } catch (err) {
      setError("An error occurred while logging in.");
      console.error(err);
    } finally {
      // setLoading(false);
    }
  };

  const { login } = useAuthStore();

  const navigate = useNavigate();

  return (
    <>
      <Container pt={20} width="450px">
        <h1 style={{ color: "green" }}>circle</h1>
        <h2 style={{ color: "white" }}>Login to Circle</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gap="3">
            <Input
              {...register("email")}
              color={"white"}
              placeholder="Email"
            />
            {errors.email && (
              <p style={{ color: "white" }}>{errors.email.message}</p>
            )}
            <Input
              {...register("password")}
              type="password"
              color={"white"}
              placeholder="Password"
            />
            {errors.password && (
              <p style={{ color: "white" }}>{errors.password.message}</p>
            )}
            <Link
              to="/forgotpassword"
              style={{ color: "white", textDecoration: "none", width: "35%" }}
            >
              Forgot password?
            </Link>
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              type="submit"
              borderRadius="2xl"
            >
              Login
            </Button>
            <Text style={{ color: "white" }}>
              Don't have account yet?{" "}
              <Link
                to="/register"
                style={{ color: "green", textDecoration: "none" }}
              >
                Create account
              </Link>
            </Text>
          </Flex>
        </form>
      </Container>
    </>
  );
}
export default Login;
