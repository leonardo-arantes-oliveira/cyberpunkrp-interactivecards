import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./mural.css";

const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: ".Gov de Night City · AFTERLIFE//RP",
  description:
    "Cada ficha é um dossiê fechado. O mural de personagens do servidor Afterlife Roleplay (Ainda não oficial) é um espaço para exibir perfis de personagens, suas habilidades e atributos, permitindo que os jogadores explorem o universo da cidade e conheçam melhor os personagens que habitam na cidade.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
