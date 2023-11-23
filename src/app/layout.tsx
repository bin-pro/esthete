import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import ContextProvider from "@/context/ContextProvider";
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
      <body>
        <ContextProvider>
          <Providers>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </Providers>
        </ContextProvider>
      </body>
    </html>
  );
}
