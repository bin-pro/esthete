import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import { Providers } from "./ThemeProvider";

export const metadata: Metadata = {
  title: "Esthète CMS",
  description: "내 손 안의 작은 전시회, Esthète",
  // openGraph: {
  //   images: [],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body id="root">
        <Providers>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
