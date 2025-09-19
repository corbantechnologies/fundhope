import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>FundHope</title>
        <meta
          name="description"
          content="FundHope is a crowdfunding platform that allows users to raise funds for their projects and help them reach their goals."
        />
      </head>
      <body>
        <Toaster position="top-center" />
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
}
