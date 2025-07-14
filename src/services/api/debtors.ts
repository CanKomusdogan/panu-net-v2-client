import { trpc } from '@/services/trpc.ts';

export const getDebtors = async (params: {
  companyCode: string;
  periodCode: string | number;
}) => await trpc.debtor.getDebtors.query(params);
