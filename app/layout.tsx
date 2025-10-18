import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexariq.vercel.app"),
  title: {
    default: "TOMO CHAT - AI Chatbot powered by xAI Grok",
    template: "%s | TOMO CHAT",
  },
  description: "TOMO CHAT is a powerful AI chatbot application built with Next.js and powered by xAI's Grok models. Experience intelligent conversations with cutting-edge AI technology.",
  keywords: ["AI", "chatbot", "xAI", "Grok", "TOMO CHAT", "artificial intelligence", "conversational AI"],
  authors: [{ name: "TOMO CHAT" }],
  creator: "TOMO CHAT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexariq.vercel.app",
    title: "TOMO CHAT - AI Chatbot powered by xAI Grok",
    description: "Experience intelligent conversations with TOMO CHAT, powered by xAI's advanced Grok models.",
    siteName: "TOMO CHAT",
    images: [
      {
        url: "/images/TOMO.jpg",
        width: 1200,
        height: 630,
        alt: "TOMO CHAT Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOMO CHAT - AI Chatbot powered by xAI Grok",
    description: "Experience intelligent conversations with TOMO CHAT, powered by xAI's advanced Grok models.",
    creator: "@tomochat",
    images: [
      "/images/TOMO.jpg",
    ],
  },
  icons: {
    icon: "/images/TOMO.jpg",
    apple: "/images/TOMO.jpg",
  },
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const LIGHT_THEME_COLOR = "hsl(0 0% 100%)";
const DARK_THEME_COLOR = "hsl(240deg 10% 3.92%)";
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geist.variable} ${geistMono.variable}`}
      // `next-themes` injects an extra classname to the body element to avoid
      // visual flicker before hydration. Hence the `suppressHydrationWarning`
      // prop is necessary to avoid the React hydration mismatch warning.
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="/images/TOMO.jpg"
          type="image/jpeg"
        />
        <link
          rel="apple-touch-icon"
          href="/images/TOMO.jpg"
        />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: "Required"
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Toaster position="top-center" />
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
