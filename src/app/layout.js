import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stephens Books",
  description: "Generated by create next app",
};

export default function RootLayout({ children, test }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {test}
        {children}
      </body>
    </html>
  );
}
