import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PrivateRoute from "./PrivateRoute";

// Pages
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForgetPage from "../features/auth/pages/ForgetPage.tsx";
import SuccessPage from "../features/auth/pages/SuccessPage.tsx";
import LawyersPage from "../features/dashboard/pages/LawyersPage.tsx";
import VendorsPage from "../features/dashboard/pages/VendorsPage.tsx";
import ServicePage from "../features/dashboard/pages/ServicePage.tsx";
import NotFoundPage from "../features/not-found/page/NotFoundPage.tsx";
import FinancialPage from "../features/dashboard/pages/FinancialPage.tsx";
import BalanceActivitiesPage from "../features/dashboard/pages/BalanceActivitiesPage.tsx";
import SettingsPage from "../features/dashboard/pages/SettingsPage.tsx";
import CommercialPage from "../features/dashboard/pages/CommercialPage.tsx";

const AppRoutes = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const allowedLang = ["az", "en", "ru"];
  const currentLang = location.pathname.split("/")[1]; // Path'den dili alıyoruz

  useEffect(() => {
    if (!allowedLang.includes(currentLang)) {
      const defaultLang = i18n.language || "en";
      navigate(`/${defaultLang}${location.pathname.replace(/^\/[^/]+/, "")}`, {
        replace: true,
      });
    } else if (currentLang !== i18n.language) {
      i18n.changeLanguage(currentLang);
    }
  }, [i18n.language]);

  return (
    <Routes>
      <Route path="/:lang">
        <Route index element={<NotFoundPage />} />

        <Route path="auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forget" element={<ForgetPage />} />
          <Route path="success" element={<SuccessPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="home" element={<LawyersPage />} />
          <Route path="lawyers" element={<LawyersPage />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="service" element={<ServicePage />} />
          <Route path="financial" element={<FinancialPage />} />
          <Route path="balance" element={<BalanceActivitiesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="commercial" element={<CommercialPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
