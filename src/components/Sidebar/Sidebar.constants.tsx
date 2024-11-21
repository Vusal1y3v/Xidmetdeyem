import {
  BalanceIcon,
  FinancialIcon,
  ServiceIcon,
  VendorIcon,
} from "../../assets/images/layout/layout.vector.tsx";

export const navigation = [
  {
    name: "İstifadəçilər",
    path: "commercial",
    icon: FinancialIcon,
    roles: ["admin", "commercial_directory"],
  },
  {
    name: "Maliyyə",
    path: "financial",
    icon: FinancialIcon,
    roles: ["admin", "accountant"],
  },
  {
    name: "Balans Fəaliyyətləri",
    path: "balance",
    icon: BalanceIcon,
    roles: ["admin", "accountant"],
  },
  {
    name: "Vendorlar",
    path: "vendors",
    icon: VendorIcon,
    roles: ["admin", "lawyer", "buyer_manager"],
  },
  {
    name: "Xidmətlər",
    path: "service",
    icon: ServiceIcon,
    roles: ["admin", "lawyer", "buyer_manager"],
  },
  {
    name: "Hüquqşünas",
    path: "lawyers",
    icon: ServiceIcon,
    roles: ["admin", "lawyer"],
  },
];
