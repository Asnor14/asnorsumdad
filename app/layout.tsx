import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asnor Sumdad | Full-Stack & Mobile Developer",
  description:
    "Full-stack and mobile developer specializing in modern web platforms, mobile apps, and AI-powered systems. Building production-ready solutions with Next.js, Flutter, FastAPI, and more.",
  keywords: [
    "Full-Stack Developer",
    "Mobile Developer",
    "React",
    "Next.js",
    "Flutter",
    "TypeScript",
    "Python",
    "FastAPI",
    "Firebase",
    "IoT",
    "AI",
    "Philippines",
  ],
  authors: [{ name: "Asnor Sumdad" }],
  creator: "Asnor Sumdad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio.vercel.app",
    siteName: "Asnor Sumdad Portfolio",
    title: "Asnor Sumdad | Full-Stack & Mobile Developer",
    description:
      "Full-stack and mobile developer specializing in modern web platforms, mobile apps, and AI-powered systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asnor Sumdad Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asnor Sumdad | Full-Stack & Mobile Developer",
    description:
      "Full-stack and mobile developer specializing in modern web platforms, mobile apps, and AI-powered systems.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="antialiased font-sans" style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
