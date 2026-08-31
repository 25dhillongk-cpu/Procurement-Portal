import "./globals.css";

export const metadata = {
  title: "KisanSetu | Smart Agricultural Procurement",
  description:
    "A smart and transparent agricultural procurement management platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}