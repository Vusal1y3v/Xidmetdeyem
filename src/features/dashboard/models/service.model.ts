export type ServiceModalType = {
  verified: number | null;
  unverified: number | null;
  deleted: number | null;
  created: boolean;
};

export type ServiceFilterType = {
  name: string;
  contract_start_date: string;
  contract_end_date: string;
};
