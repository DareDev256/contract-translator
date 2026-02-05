import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contract Translator — Plain English Legal Analysis",
  description:
    "Upload any legal contract and get a plain-English breakdown with risk assessment, clause-by-clause translation, and a glossary of legal terms.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
