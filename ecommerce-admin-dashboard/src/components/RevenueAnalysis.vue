<template>
  <div class="revenue">
    <h2>Revenue Analysis</h2>

    <label>Filter by Category:</label>
    <select v-model="selectedCategory">
      <option value="">All</option>
      <option v-for="cat in uniqueCategories" :key="cat">{{ cat }}</option>
    </select>

    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="chartSeries"
      :key="chartKey"
    />
  </div>
</template>

<script>
import { inject, ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: { apexchart: VueApexCharts },
  setup() {
    const products = inject('products');
    const selectedCategory = ref('');

    const uniqueCategories = computed(() => {
      const set = new Set(products.map(p => p.category));
      return Array.from(set);
    });

    const filteredProducts = computed(() => {
      return selectedCategory.value
        ? products.filter(p => p.category === selectedCategory.value)
        : products;
    });

    const chartSeries = computed(() => [
      {
        name: 'Stock Level',
        data: filteredProducts.value.map(p => p.stock)
      }
    ]);

    const chartOptions = computed(() => ({
    chart: {
      id: 'filtered-stock',
      type: 'bar',
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        columnWidth: '55%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff']
      }
    },
    xaxis: {
      categories: filteredProducts.value.map(p => p.name),
      labels: {
        style: {
          fontSize: '14px',
          colors: '#2c3e50'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Stock Units'
      },
      labels: {
        style: {
          fontSize: '12px',
          colors: '#333'
        }
      }
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: val => `${val} Units`
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        gradientToColors: ['#2ecc71'],
        stops: [0, 100]
      }
    },
    colors: ['#3498db'],
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 4
    }
  }));


    // This forces ApexCharts to fully rerender when filter changes
    const chartKey = computed(() => selectedCategory.value || 'all');

    return {
      selectedCategory,
      uniqueCategories,
      chartOptions,
      chartSeries,
      chartKey
    };
  }
};
</script>

<style scoped>
.revenue {
  padding: 20px;
  background: #f9fbfd;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
}

select {
  margin-top: 10px;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 5px;
}
</style>
