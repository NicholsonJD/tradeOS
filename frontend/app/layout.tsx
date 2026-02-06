import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeOS - Progressive Exposure Dashboard",
  description: "Progressive exposure trading dashboard for risk-managed position sizing."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
