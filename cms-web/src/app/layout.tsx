import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";

export const metadata: Metadata = {
  title: "Esthète CMS",
  description: "내 손 안의 작은 전시회, Esthète",
  openGraph: {
    description: "내 손 안의 작은 전시회, Esthète",
  },
  category: "Art",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body id="root">
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
