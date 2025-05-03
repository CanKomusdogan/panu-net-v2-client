<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';
import { useDebtorsStore } from '@/stores/debtors.ts';
import { useCreditorsStore } from '@/stores/creditors.ts';
import { storeToRefs } from 'pinia';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

provide(THEME_KEY, 'dark');

const debtorsStore = useDebtorsStore();
const creditorsStore = useCreditorsStore();

const { debtors } = storeToRefs(debtorsStore);
const { creditors } = storeToRefs(creditorsStore);

const totalDebtorBalance = debtors.value.reduce((sum, debtor) => sum + debtor.balance, 0);
const totalCreditorBalance = creditors.value.reduce((sum, creditor) => sum + creditor.balance, 0);

const option = ref({
  title: {
    text: 'B/A Analiz Grafiği',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Borçlu', 'Alacaklı']
  },
  series: [
    {
      name: 'B/A',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: totalDebtorBalance, name: 'Borçlu' },
        { value: totalCreditorBalance, name: 'Alacaklı' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});
</script>

<template>
  <v-chart class="chart" :option="option"></v-chart>
</template>

<style scoped>
.chart {
  height: 70vh;
}

canvas {
  padding: 30px !important;
}
</style>
