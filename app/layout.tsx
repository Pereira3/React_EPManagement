import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// ---------- CSS FILE ----------
import "./shared/page.css";
// ---------- CONTEXT ----------
import { ProjectContextProvider } from "./context/ProjectContext";
import { EmployeeContextProvider } from "./context/EmployeeContext";
import { WebContextProvider } from "./context/WebContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E&P Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebContextProvider>
          <ProjectContextProvider>
            <EmployeeContextProvider>{children}</EmployeeContextProvider>
          </ProjectContextProvider>
        </WebContextProvider>
      </body>
    </html>
  );
}
