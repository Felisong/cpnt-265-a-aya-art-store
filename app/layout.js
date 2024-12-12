import localFont from "next/font/local";
import "./globals.css";
import Navigation from "./components/navigation/Navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Reika's Art Shop",
  description:
    "An online store for all your merchandise needs! Phone accessories, stickers, charms galore.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
