import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhishek Choudhary | Creative Coder & Developer",
  description:
    "Portfolio of Abhishek Choudhary — B.Tech CSE student at Chitkara University, passionate about building innovative solutions with modern tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
