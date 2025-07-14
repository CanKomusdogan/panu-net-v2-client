export interface AccountCard {
  code: string;
  name: string;
  currency: string;
  balance: number;
  debtorOrCreditor: '(B)' | '(A)'; // (B) = debtor, (A) = creditor
}
