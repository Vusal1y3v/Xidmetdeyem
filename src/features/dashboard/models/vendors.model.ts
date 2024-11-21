export type VendorsModalType = {
  verified: number | null;
  unverified: number | null;
  deleted: number | null;
  created: boolean;
};

export type VendorsFilterType = {
  name: string;
  contract_start_date: string;
  contract_end_date: string;
};
