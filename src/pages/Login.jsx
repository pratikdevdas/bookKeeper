import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SimpleFooter } from "@/components/layout";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/profile");
  }, [user, loading]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginSubmit = (e)=>{
    e.preventDefault()
    logInWithEmailAndPassword(email, password)
  }

  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Log In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={loginSubmit}>
              <Input
                value={email}
                onChange={handleEmail}
                variant="standard"
                type="email"
                label="Email"
                size="lg"
              />
              <Input
                variant="standard"
                type="password"
                label="Password"
                size="lg"
                value={password}
                onChange={handlePassword}
              />
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            <Button type="submit" variant="gradient" fullWidth >
              Log In
            </Button>
            </form>
            OR
            <Button onClick={signInWithGoogle} variant="gradient" fullWidth >
              Sign in With Google
            </Button>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/signup">
                <Typography
                as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default Login;
