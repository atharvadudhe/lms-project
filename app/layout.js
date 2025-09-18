import "./globals.css";

export const metadata = {
  title: "LMS Project",
  description: "Learning Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
