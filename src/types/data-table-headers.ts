import type { ToggleItem } from '@/types/toggle-item.ts';

export interface DataTableHeaders extends ToggleItem {
  sortable?: boolean;
}
