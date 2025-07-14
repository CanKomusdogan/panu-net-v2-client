export interface Company {
  id?: number;
  code: number;
  name: string;
  manager: string;
  phone?: string;
  licenseDate: string;
  status: boolean;
  webServiceSource: string;
  webServiceUsername: string;
  server: string;
  period: number;
  apiKey: string;
  apiSecret: string;
}
