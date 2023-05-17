import Login from "@/app/login/Login";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  console.log(await parent);
  return {
    title: "Login",
    description: "Login to your account",
  };
}

export default function LoginPage() {
  return <Login />;
}
