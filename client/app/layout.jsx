import "./globals.css";

export const metadata = {
  title: "Moodify",
  description: "Music for your mood",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
