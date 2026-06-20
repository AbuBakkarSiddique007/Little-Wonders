import { Poppins } from "next/font/google";
import localFont from 'next/font/local'

import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const fontBangla = localFont({
  src: './../fonts/mayaboti-Italic.ttf',
  variable: "--font-bangla",
})


export const metadata = {
  title: "Little Wonders",
  description: "Best products for your little ones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">

        <header className="py-2 md:w-11/12 mx-auto">
          <Navbar></Navbar>
        </header>

        {/* Home Page Size: min-h[calc(100vh - sum_of_navbar_and_footer_height_of_all_screen)] */}

        <main className="py-2 md:w-11/12 mx-auto flex-1">
          {children}
        </main>

        <footer className="py-2 md:w-11/12 mx-auto">
          <Footer></Footer>
        </footer>

      </body>
    </html>
  );
}