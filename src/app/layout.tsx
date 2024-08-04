import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ExamProvider } from "@/context/ExamContext";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuizCraft",
  description: "QuizCraft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-neutral-900 flex flex-col min-h-dvh bg-diagonal-gradient">
          <Header></Header>
          <ExamProvider>{children}</ExamProvider>
        </div>
      </body>
    </html>
  );
}
