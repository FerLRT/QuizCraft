import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ExamProvider } from '@/context/ExamContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuizApp",
  description: "QuizApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-neutral-900 flex flex-col min-h-dvh">
          <Header></Header>
          <ExamProvider>
            {children}
          </ExamProvider>
        </div>
      </body>
    </html>
  );
}
