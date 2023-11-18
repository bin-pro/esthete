import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Esthète CMS",
  description: "내 손 안의 작은 전시회, Esthète",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
