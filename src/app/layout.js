import { JetBrains_Mono} from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
});

export const metadata = {
  title: "Portfolio-oumhdi REDOUANE",
  description: "portfolio",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jetbrains.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
