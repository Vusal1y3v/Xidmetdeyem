export type LawyersModalType = {
  verified: number | null;
  unverified: number | null;
};

export type LawyersFilterType = {
  full_name: string;
  email: string;
  phone: string;
  identity_number: string;
  company_name: string;
  contract_start_date: string;
  contract_end_date: string;
};
