import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexariq.vercel.app"),
  title: {
    default: "NEXARIQ - AI Chatbot powered by xAI Grok",
    template: "%s | NEXARIQ",
  },
  description: "NEXARIQ is a powerful AI chatbot application built with Next.js and powered by xAI's Grok models. Experience intelligent conversations with cutting-edge AI technology.",
  keywords: ["AI", "chatbot", "xAI", "Grok", "NEXARIQ", "artificial intelligence", "conversational AI"],
  authors: [{ name: "NEXARIQ" }],
  creator: "NEXARIQ",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexariq.vercel.app",
    title: "NEXARIQ - AI Chatbot powered by xAI Grok",
    description: "Experience intelligent conversations with NEXARIQ, powered by xAI's advanced Grok models.",
    siteName: "NEXARIQ",
    images: [
      {
        url: "https://z-cdn-media.chatglm.cn/files/c04d33fc-5e5a-4ab6-bea6-a11b88918ae7_TOMO.jpg?auth_key=1791089382-ea973e46df5748e0a8ff4ceedd8f2e49-0-a03e0352f92afb6e9ca5f4a2382dea5c",
        width: 1200,
        height: 630,
        alt: "NEXARIQ Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXARIQ - AI Chatbot powered by xAI Grok",
    description: "Experience intelligent conversations with NEXARIQ, powered by xAI's advanced Grok models.",
    creator: "@nexariq",
    images: [
      "https://z-cdn-media.chatglm.cn/files/c04d33fc-5e5a-4ab6-bea6-a11b88918ae7_TOMO.jpg?auth_key=1791089382-ea973e46df5748e0a8ff4ceedd8f2e49-0-a03e0352f92afb6e9ca5f4a2382dea5c",
    ],
  },
  icons: {
    icon: [
      {
        url: "https://z-cdn-media.chatglm.cn/files/c04d33fc-5e5a-4ab6-bea6-a11b88918ae7_TOMO.jpg?auth_key=1791089382-ea973e46df5748e0a8ff4ceedd8f2e49-0-a03e0352f92afb6e9ca5f4a2382dea5c",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
    apple: [
      {
        url: "https://z-cdn-media.chatglm.cn/files/c04d33fc-5e5a-4ab6-bea6-a11b88918ae7_TOMO.jpg?auth_key=1791089382-ea973e46df5748e0a8ff4ceedd8f2e49-0-a03e0352f92afb6e9ca5f4a2382dea5c",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
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
          href="https://z-cdn-media.chatglm.cn/files/c04d33fc-5e5a-4ab6-bea6-a11b88918ae7_TOMO.jpg?auth_key=1791089382-ea973e46df5748e0a8ff4ceedd8f2e49-0-a03e0352f92afb6e9ca5f4a2382dea5c"
          type="image/jpeg"
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
