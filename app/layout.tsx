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
const quincyBlack = localFont({
  src: "../public/fonts/Quincy-Black.ttf",
  display: "swap",
  variable: "--font-quincyBlack",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = localFont({
  src: "../public/fonts/Lora-Regular.ttf",
  display: "swap",
  variable: "--font-lora",
});

const tinos = Tinos({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-tinos",
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
      className={`${inter.className} ${quincyBlackItalic.variable} ${quincyBlack.variable} ${lora.variable} ${tinos.variable}`}
    >
      <body>
        <Providers session={params.session}>{children}</Providers>
      </body>
    </html>
  );
}
