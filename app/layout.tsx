import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/header/navbar";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/header/footer";

export const metadata: Metadata = {
  title: "Rep Finds",
  // TODO
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              <div className=" min-h-screen">
                <Navbar />
                <div className="p-8 mt-10 md:p-10 lg:p-16">{children}</div>
              </div>
              <Footer />
              <Toaster />
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
