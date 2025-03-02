import type { Metadata } from "next";
import { Josefin_Sans, Roboto } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test Pike",
  description:
    "Escolha seu framework de automação preferido. Test Pike oferece uma plataforma simples para escolher frameworks de automação.",
  keywords:
    "Test Pike, framework de automação, testes automatizados, escolha de framework, Cypress, Selenium, Jest",
  authors: [{ name: "Cristiano Ferreira Mothe" }],
  openGraph: {
    title: "Test Pike",
    description: "Escolha seu framework de automação preferido.",
    url: "https://qa-test-pick.vercel.app/",
    siteName: "Test Pike",
    images: [
      {
        url: "/images/page.png",
        width: 1200,
        height: 630,
        alt: "Test Pike - Escolha seu framework de automação",
      },
    ],
  },
};

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "auto",
  variable: "--font-sans",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "auto",
  variable: "--font-title",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-lt-installed="true">
      <head>
        <link rel="icon" href="/icons/book-type.svg" type="image/svg+xml" />
        <meta
          name="description"
          content="Escolha seu framework de automação preferido"
        />
        <meta
          name="keywords"
          content="Test Pike, framework de automação, testes automatizados"
        />
        <meta name="author" content="Seu Nome ou Nome da Empresa" />

        <meta property="og:title" content="Test Pike" />
        <meta
          property="og:description"
          content="Escolha seu framework de automação preferido."
        />
        <meta property="og:image" content="/images/page.png" />
        <meta
          property="og:url"
          content="https://portfolio-qa-cristiano.vercel.app/"
        />
        <meta property="og:site_name" content="Test Pike" />
        <meta property="og:type" content="website" />

        <meta
          name="twitter:description"
          content="Escolha seu framework de automação preferido."
        />
        <meta name="twitter:image" content="/images/page.png" />
      </head>
      <body className={`${josefin.className} ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
