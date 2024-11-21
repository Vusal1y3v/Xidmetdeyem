import {
  InvoicesModel,
  ServiceModel,
  UserModel,
  VendorModel,
} from "./dashboard.model.ts";

export interface PageTabsModel {
  name: string;
  tab: number;
  onClick?: () => void;
}

export interface PageHelperModel {
  page: number;
  activeTabs?: number;
  reFetch: boolean;
  response: TableResponseType | null;
  tabs?: PageTabsModel[];
}

export interface TableResponseType {
  fields: string[];
  page_count: number;
  users?: UserModel[];
  vendors?: VendorModel[];
  service?: ServiceModel[];
  invoices?: InvoicesModel[];
}

export type ModalType = {
  balance?: number | null;
  verified?: number | null;
  unverified?: number | null;
};

export type UsersFilterType = {
  full_name: string;
  email: string;
  phone: string;
  identity_number: string;
  company_name: string;
  contract_start_date: string;
  contract_end_date: string;
};
