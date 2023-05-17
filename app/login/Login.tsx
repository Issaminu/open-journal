"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import logo from "../../public/enset-logo.webp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/icons/github-icon";
import GoogleIcon from "@/components/icons/google-icon";
import AlertIcon from "@/components/icons/alert-icon";

export default function Login() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsValid(true);
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res && res.error) {
        console.log(res);
        setIsLoading(false);
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
        setIsValid(false);
      } else {
        router.push("/home");
      }
    }
  };
  if (status == "loading") return null;
  if (!session) {
    return (
      <>
        <div
          className="h-full flex flex-col justify-center w-full sm:px-6 lg:px-8"
          style={{
            background: "url('/login-bg.webp') no-repeat center center fixed",
            backgroundSize: "cover",
            minHeight: "100vh",
          }}
        >
          <div className="bg-white h-screen w-screen md:h-fit md:py-12 mx-auto min-w-max flex flex-col justify-center md:w-[27rem] shadow md:rounded-2xl px-12">
            <LoadingBar height={3} color="#06b6d4" ref={loadingBarRef} />
            <div className="sm:mx-auto mb-10 sm:w-full sm:max-w-md">
              <div className="flex justify-center">
                <Image
                  className="mx-auto h-8 mb-6 w-auto"
                  src={logo}
                  alt="ENSET logo"
                  loading="eager"
                />
              </div>
              <h2
                className="mt-6 text-center text-3xl font-semibold "
                style={{ color: "#1e212a" }}
              >
                Welcome!
              </h2>
              <p className="mt-2 text-center text-sm text-gray-900">
                Please sign in to your account
              </p>
            </div>
            <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  ref={emailRef}
                  required
                  className={
                    isValid
                      ? "focus:outline-cyan-600"
                      : "border-red-600 border-2 focus:outline-red-600"
                  }
                />
              </div>
              <div>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  ref={passwordRef}
                  minLength={8}
                  maxLength={100}
                  required
                  className={
                    isValid
                      ? "focus:outline-cyan-600"
                      : "border-red-600 border-2 focus:outline-red-600"
                  }
                />
              </div>
              {!isValid && (
                <div className="flex items-center">
                  <AlertIcon />
                  <span className="text-red-600 font-semibold text-sm">
                    Email or password is incorrect
                  </span>
                </div>
              )}
              <div className="flex justify-between gap-16 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-cyan-600 accent-cyan-700 hover:accent-cyan-700 focus:ring-cyan-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-cyan-700 hover:bg-cyan-800 h-12 rounded-lg"
                  >
                    <span className="w-full text-white text-lg">Continue</span>
                  </Button>
                  <div className="text-sm mt-3">
                    Don&apos;t have an account? &nbsp;
                    <Link href="/signup">
                      <span className="font-medium cursor-pointer text-cyan-600 hover:text-cyan-800">
                        Sign up
                      </span>
                    </Link>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <hr className="w-[40%]" />{" "}
                    <span className="text-sm">OR</span>
                    <hr className="w-[40%]" />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-white border-gray-400 h-12 hover:bg-gray-200 rounded-lg"
                  >
                    <span className="w-full flex items-center justify-evenly">
                      <GoogleIcon />
                      <span className="h-full text-black">
                        Continue with Google
                      </span>
                      <span>{"  "}</span>
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-white border-gray-400 h-12 hover:bg-gray-200 rounded-lg"
                  >
                    <span className="w-full flex items-center justify-evenly">
                      <GithubIcon />
                      <span className="h-full text-black">
                        Continue with Github
                      </span>
                      <span>{"  "}</span>
                    </span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
  return null; //To make this component either return an Element or null, otherwise, it would return Element or undefined
}
