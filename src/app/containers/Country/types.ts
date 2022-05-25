export interface CountryDetails {
  code: string;
  currency_code: string;
  id: string;
  name: string;
}

export interface CountryState {
  isLoading: boolean;
  error?: string;
  country?: CountryDetails;
}
