export interface Order {
  id: number;
  title: string;
  stockName: string;
  amount: number;
  date: Date;
  confirmed?: boolean | null;
}
