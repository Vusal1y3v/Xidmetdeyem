export type SessionData = {
  role: Roles;
  detail: {
    balance: number;
    birth_day: string;
    company_name: null | string;
    contract: null | string;
    contract_end_date: string;
    contract_language: string;
    contract_start_date: string;
    created: string;
    email: string;
    first_name: string;
    id: number;
    identity_number: string;
    last_login: string;
    last_name: string;
    phone: string;
    role: string;
    verified: boolean;
  };
  session_key: null;
};

export type Roles = "client" | "";

export interface UserModel {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  birth_day: string;
  role: Roles;
  balance: number;
  contract: null | string;
  contract_start_date: null | string;
  contract_end_date: null | string;
  company_name: null | string;
  identity_number: string;
  commercial_manager: string;
}

export interface VendorModel {
  id: number;
  name: string;
  contract: string;
  contract_start_date: string;
  contract_end_date: string;
  contract_language: string;
}

export interface ServiceModel {
  name: string;
  raw_cost: number;
  selling_price: number;
  contract: string;
  contract_start_date: string;
  contract_end_date: string;
  contract_language: string;
  city: {
    Country: {
      ID: number;
      name: string;
      updated: string;
      created: string;
    };
    ID: number;
    country_id: number;
    name: string;
    updated: string;
    created: string;
  };
}

export interface InvoicesModel {
  id: number;
  user: string;
  accountant: string;
  type: string;
  amount: number;
  created: string;
  document: string;
  not: string;
}
