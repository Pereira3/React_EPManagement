import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// ---------- GENERIC CSS FILE ----------
import "./shared/page.css";
// ---------- CONTEXTS ----------
import { ProjectContextProvider } from "./context/ProjectContext";
import { EmployeeContextProvider } from "./context/EmployeeContext";
import { DialogContextProvider } from "./context/DialogContext";
import { FormsContextProvider } from "./context/FormsContext";
import { ErrorContextProvider } from "./context/ErrorContext";

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
        <ProjectContextProvider>
          <EmployeeContextProvider>
            <DialogContextProvider>
              <FormsContextProvider>
                <ErrorContextProvider>{children}</ErrorContextProvider>
              </FormsContextProvider>
            </DialogContextProvider>
          </EmployeeContextProvider>
        </ProjectContextProvider>
      </body>
    </html>
  );
}
