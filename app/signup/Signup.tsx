"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import logo from "../../public/enset-logo.webp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/icons/github-icon";
import GoogleIcon from "@/components/icons/google-icon";
import AlertIcon from "@/components/icons/alert-icon";
import axios from "axios";
import { userSchemaCreate } from "@/lib/zod";

export default function Singup() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setIsValid(true);
      if (loadingBarRef.current) {
        loadingBarRef.current.continuousStart();
      }
      if (emailRef.current && passwordRef.current && nameRef.current) {
        const validatedForm = userSchemaCreate.parse({
          email: emailRef.current.value,
          name: nameRef.current.value,
          password: passwordRef.current.value,
        });
        const email = validatedForm.email;
        const name = validatedForm.name;
        const password = validatedForm.password;
        axios
          .post("/api/auth/signup", {
            email: email,
            name: name,
            password: password,
          })
          .then(
            async (_success) => {
              if (loadingBarRef.current) {
                loadingBarRef.current.complete();
              }
              setIsLoading(false);
              await signIn("credentials", {
                email: email,
                password: password,
                callbackUrl: `${window.location.origin}/home`,
              });
            },
            async (error) => {
              if (loadingBarRef.current) {
                loadingBarRef.current.complete();
              }
              setIsLoading(false);
              setIsValid(false);
              console.error(error.response);
            }
          );
      }
      setIsLoading(false);
      setIsValid(true);
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (status == "loading") return null;
  if (!session) {
    return (
      <>
        <div
          className="flex h-full w-full flex-col justify-center sm:px-6 lg:px-8"
          style={{
            background: "url('/login-bg.webp') no-repeat center center fixed",
            backgroundSize: "cover",
            minHeight: "100vh",
          }}
        >
          <div className="mx-auto flex h-screen w-screen min-w-max flex-col justify-center bg-white px-12 shadow md:h-fit md:w-[27rem] md:rounded-2xl md:py-12">
            <LoadingBar height={3} color="#06b6d4" ref={loadingBarRef} />
            <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="flex justify-center">
                <Image
                  className="mx-auto mb-6 h-8 w-auto"
                  src={logo}
                  alt="ENSET logo"
                  loading="eager"
                />
              </div>
              <h2
                className="mt-6 text-center text-3xl font-bold"
                style={{ color: "#1e212a" }}
              >
                Welcome!
              </h2>
              <p className="mt-2 text-center text-sm text-gray-900">
                Please sign up to continue
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
                      : "border-2 border-red-600 focus:outline-red-600"
                  }
                />
              </div>
              {!isValid && (
                <div className="flex items-center">
                  <AlertIcon />
                  <span className="text-sm font-semibold text-red-600">
                    This email is already in use
                  </span>
                </div>
              )}
              <div>
                <Input
                  type="text"
                  id="name"
                  placeholder="Full name"
                  ref={nameRef}
                  minLength={8}
                  maxLength={100}
                  required
                  className="focus:outline-cyan-600"
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
                  className="focus:outline-cyan-600"
                />
              </div>

              <div className="flex w-full justify-between gap-16">
                <div className="flex w-full flex-col gap-3">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-cyan-600 accent-cyan-700 focus:ring-cyan-500"
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
                    className="h-12 w-full rounded-lg bg-cyan-700 hover:bg-cyan-800"
                  >
                    <span className="w-full text-lg text-white">Continue</span>
                  </Button>
                  <div className="mt-3 text-sm">
                    Already have an account? &nbsp;
                    <Link href="/login">
                      <span className="cursor-pointer font-medium text-cyan-600 hover:text-cyan-800">
                        Sign in
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
                    className="h-12 w-full rounded-lg border-gray-400 bg-white hover:bg-gray-200"
                  >
                    <span className="flex w-full items-center justify-evenly">
                      <GoogleIcon />
                      <span className="h-full text-black">
                        Continue with Google
                      </span>
                      <span>{"  "}</span>
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-lg border-gray-400 bg-white hover:bg-gray-200"
                  >
                    <span className="flex w-full items-center justify-evenly">
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
