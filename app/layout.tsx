import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SecondBrain",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
