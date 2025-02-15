'use client'
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

// export const metadata = {
//   title: "Meeting Room",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <Head>
          <title>Meeting Room</title>
          <meta name="description" content="Generated by create next app" />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <QueryClientProvider client={queryClient}>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            <div className="flex flex-col h-screen">
              {/* Navbar tetap di atas */}
              <Navbar />

              <div className="flex flex-1">
                {/* Sidebar di samping kiri */}
                <Sidebar className="w-64 bg-gray-100 shadow-md" />

                {/* Konten utama di sebelah kanan */}
                <main className="flex-1 p-4 overflow-auto">{children}</main>
              </div>
            </div>
          </QueryClientProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}