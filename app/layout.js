import "./globals.css";
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata = {
  title: "MiniDesk",
  description: "A calm personal dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>  <ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
