import "../styles/globals.css";
import { Inter, Tinos } from "next/font/google";
import Providers from "./providers";
import { Session } from "next-auth";
import localFont from "next/font/local";

const quincyBlackItalic = localFont({
  src: "../public/fonts/Quincy-BlackItalic.ttf",
  display: "swap",
  variable: "--font-quincyBlackItalic",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const hubot = localFont({
  src: "../public/fonts/Hubot-Sans.woff2",
  display: "swap",
  variable: "--font-hubot",
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
    <html
      lang="en"
      className={`${inter.className} ${quincyBlackItalic.variable} ${hubot.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Projet Web | ENSET Mohammedia</title>
      </head>
      <body>
        <Providers session={params.session}>{children}</Providers>
      </body>
    </html>
  );
}
