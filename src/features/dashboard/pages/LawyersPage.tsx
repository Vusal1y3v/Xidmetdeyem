import DashboardLayout from "../components/layout/DashboardLayout.tsx";
import { SessionData } from "../models/dashboard.model.ts";
import Lawyers from "../components/pages/Lawyers/Lawyers.tsx";

const LawyersPage = () => {
  const sessionData: SessionData = {
    role: "client",
    session_key: null,
    detail: {
      balance: 100,
      birth_day: "",
      company_name: "",
      contract: "",
      contract_end_date: "",
      contract_language: "",
      contract_start_date: "",
      created: "",
      email: "",
      first_name: "",
      id: 1,
      identity_number: "",
      last_login: "",
      last_name: "",
      phone: "",
      role: "",
      verified: true,
    },
  };

  return (
    <DashboardLayout sessionData={sessionData}>
      <Lawyers />
    </DashboardLayout>
  );
};

export default LawyersPage;
