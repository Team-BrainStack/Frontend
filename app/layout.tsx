import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "SecondBrain",
};

const RootLayout = ({ children }: PropsWithChildren) => {
=======
  title: "MemoryVault",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
>>>>>>> 912293569f050667b3eebaeed63b3404fe683fd9
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
