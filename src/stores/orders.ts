import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Order } from '@/types/order.ts';
import type { ShippedOrder } from '@/types/shipped-order.ts';

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([]);
  const shippedOrders = ref<ShippedOrder[]>([]);

  return { orders, shippedOrders };
});
