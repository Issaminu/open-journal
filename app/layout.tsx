import "../styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { Session } from "next-auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    session: Session;
  };
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={params.session}>{children}</Providers>
      </body>
    </html>
  );
}
