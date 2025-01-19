import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import "./globals.css";
import ClientLayout from '../ClientLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Toaster />
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}