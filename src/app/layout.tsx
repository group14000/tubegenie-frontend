import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";
import { StructuredData } from "@/components/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tubegenie-frontend.vercel.app"),
  title: {
    default: "TubeGenie - AI-Powered YouTube Content Generator | Create Viral Videos",
    template: "%s | TubeGenie",
  },
  description:
    "Generate engaging YouTube titles, descriptions, tags, scripts, and thumbnail ideas with AI. Boost your channel growth with SEO-optimized content using DeepSeek, Gemini, GLM, and more AI models.",
  keywords: [
    "YouTube content generator",
    "AI video content",
    "YouTube SEO",
    "video script generator",
    "YouTube titles",
    "content creation AI",
    "YouTube automation",
    "video marketing",
    "content strategy",
    "DeepSeek AI",
    "Gemini AI",
    "GLM AI",
    "viral content",
    "YouTube growth",
  ],
  authors: [{ name: "TubeGenie Team" }],
  creator: "TubeGenie",
  publisher: "TubeGenie",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tubegenie-frontend.vercel.app",
    title: "TubeGenie - AI-Powered YouTube Content Generator | Create Viral Videos",
    description:
      "Generate engaging YouTube titles, descriptions, tags, scripts, and thumbnail ideas with AI. Boost your channel growth with SEO-optimized content.",
    siteName: "TubeGenie",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TubeGenie - AI-Powered YouTube Content Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TubeGenie - AI-Powered YouTube Content Generator",
    description:
      "Generate engaging YouTube titles, descriptions, tags, scripts, and thumbnail ideas with AI. Boost your channel growth with SEO-optimized content.",
    images: ["/og-image.jpg"],
    creator: "@tubegenie",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <head>
            <StructuredData />
          </head>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
