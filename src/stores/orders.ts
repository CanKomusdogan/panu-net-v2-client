import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Order } from '@/types/Order.ts';
import type { ShippedOrder } from '@/types/ShippedOrder.ts';

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([]);
  const shippedOrders = ref<ShippedOrder[]>([]);

  return { orders, shippedOrders };
});
