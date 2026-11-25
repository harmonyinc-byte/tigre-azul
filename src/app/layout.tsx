import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tres años · 02/12/2023",
  description:
    "Nuestra carta abierta por el tercer aniversario. Desde el 02/12/2023.",
  openGraph: {
    title: "Tres años · 02/12/2023",
    description: "Nuestra carta abierta por el tercer aniversario.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fdf2f8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body
        className={`${inter.className} min-h-full`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
