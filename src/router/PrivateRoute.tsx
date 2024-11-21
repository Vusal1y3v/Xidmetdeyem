import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.tsx";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

// Context

export default function PrivateRoute() {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  const { i18n } = useTranslation();

  const normalizedPath = location.pathname.replace(`/${i18n.language}`, ""); // Dil kısmını kaldırıyoruz.

  if (!auth.isAuth) {
    return <Navigate to={`/${i18n.language}/auth/login`} />;
  }

  if (auth.role === "commercial_directory") {
    const accessiblePages = ["/commercial", "/settings"];
    if (!accessiblePages.includes(normalizedPath)) {
      return <Navigate to={`/${i18n.language}/commercial`} />;
    }
  }

  if (auth.role === "lawyer") {
    const accessiblePages = ["/vendors", "/service", "/lawyers", "/settings"];
    if (!accessiblePages.includes(normalizedPath)) {
      return <Navigate to={`/${i18n.language}/lawyers`} />;
    }
  }

  if (auth.role === "buyer_manager") {
    const accessiblePages = ["/vendors", "/service", "/settings"];
    if (!accessiblePages.includes(normalizedPath)) {
      return <Navigate to={`/${i18n.language}/vendors`} />;
    }
  }

  if (auth.role === "accountant") {
    const accessiblePages = ["/balance", "/financial", "/settings"];
    if (!accessiblePages.includes(normalizedPath)) {
      return <Navigate to={`/${i18n.language}/financial`} />;
    }
  }

  return <Outlet />;
}
