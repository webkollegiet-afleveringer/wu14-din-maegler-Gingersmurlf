import { Outlet } from "react-router";
import Header from "./html/header.jsx";
import Footer from "./html/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <div className="wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </AuthProvider>
  )
}