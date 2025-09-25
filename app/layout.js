import "./globals.css";
import connectToDatabase from "@/utils/mongodb";
import User from "@/app/models/User";

export const metadata = {
  title: "LMS Project",
  description: "Learning Management System",
};

export default function RootLayout({ children }) {
  connectToDatabase()
    .then(() => console.log("✅ MongoDB connection established"))
    .catch((err) => console.error("❌ MongoDB connection failed:", err));

    console.log("✅ User model loaded successfully:", !!User);
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
