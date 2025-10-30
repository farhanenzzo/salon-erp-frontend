import { Lato, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthContext";
import { NextUIProvider } from "@nextui-org/react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ReduxProvider from "../components/reduxProvider/ReduxProvider";

export const metadata = {
  title: "LuxeLooks",
  description: "Saloon admin panel",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.className} ${lato.className}`}>
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <NextUIProvider>
          <PrimeReactProvider>
            <Toaster position="top-center" />
            <AuthProvider>
              <ReduxProvider>{children}</ReduxProvider>
            </AuthProvider>
          </PrimeReactProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
