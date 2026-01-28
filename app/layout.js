import "./globals.css";

export const metadata = {
  title: "MiniDesk",
  description: "A calm personal dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
