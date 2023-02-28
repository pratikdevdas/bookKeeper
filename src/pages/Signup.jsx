import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
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
import { SimpleFooter } from "@/components/layout";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name) alert("Please Enter Name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if(user){
      console.log(user,'user');
      navigate('/profile')
    }
  }, [user, loading]);

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
              Sign Up
            </Typography>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input
                variant="standard"
                value={name}
                onChange={handleName}
                label="Name"
                size="lg"
              />
              <Input
                variant="standard"
                type="email"
                value={email}
                onChange={handleEmail}
                label="Email"
                size="lg"
              />
              <Input
                value={password}
                onChange={handlePassword}
                variant="standard"
                type="password"
                label="Password"
                size="lg"
              />
              <div className="-ml-2.5">
                <Checkbox label="I agree the Terms and Conditions" />
              </div>
              <Button type="submit" variant="gradient" fullWidth >
              Sign Up
            </Button>OR
            </CardBody>
            
          </form>
          <CardFooter className="pt-0">
            <Button onClick={signInWithGoogle} variant="gradient" fullWidth>
              Sign in With Google
            </Button>
 
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/login">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
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

export default SignUp;
