import "../src/styles/globals.css";
import { AuthProvider } from "../src/context/AuthContext";
import { CartProvider } from "../src/context/CartContext";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

export const metadata = {
  title: "PowerTech - Transformers E-commerce",
  description:
    "Your trusted partner for transformers, UPS systems, and power solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
