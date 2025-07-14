import type { Company } from '@/types/company.ts';

import { cleanPayload, trpc } from '../trpc.ts';
import type { ServerDataTableOptions } from '@/types/server-data-table-options.ts';

export type CompanyServerDataTableOptions = ServerDataTableOptions<"code" | "status" | "creationDate" | "updatedOn" | "name" | "licenseDate" | "period">;

export const getCompanies = async (params?: CompanyServerDataTableOptions) => {
  return await trpc.company.getCompanies.query(params ?? {});
};

export const createCompany = async (data: Company) => {
  return await trpc.company.createCompany.mutate(data);
};

export const patchCompany = async (id: number, data: Partial<Company>) => {
  const cleanedData = cleanPayload(data);
  return await trpc.company.updateCompany.mutate({
    id,
    data: cleanedData,
  });
};

export const deleteCompany = async (id: number) => {
  return await trpc.company.deleteCompany.mutate({ id });
};

export const deleteCompanies = async (ids: number[]) => {
  return await trpc.company.deleteCompanies.mutate({ ids: ids });
};

export const setSelectedCompany = async (id: number) => {
  return await trpc.company.selectCompany.mutate({ id });
};

export const getSelectedCompany = async () => {
  return await trpc.company.getSelectedCompany.query();
};
