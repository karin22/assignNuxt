<template>
  <div class="chart">
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Chart from 'chart.js'
export default {
  name: 'Chart',

  data: () => ({
    allData: [],
  }),
  computed: {
    ...mapGetters('assign', ['getCases', 'getRecovered', 'getDeaths']),
  },
  mounted() {
    ///// find date ,cases ,recovered, deaths

    this.allData = [
      this.getCases / 1000000,
      this.getRecovered / 1000000,
      this.getDeaths / 100000,
    ]

    ///// chart
    const ctx = document.getElementById('myChart')
    new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['ติดเชื้อ / ล้าน ', 'หายแล้ว /ล้าน ', 'เสียชีวิต / แสน'],
        datasets: [
          {
            data: this.allData,
            backgroundColor: [
              'rgba(139, 0, 0,0.6)',
              'rgba(0, 100, 0,0.6)',
              'rgba(112, 128, 144,0.6)',
            ],

            borderColor: [
              'rgba(255, 255, 255)',
              'rgba(255, 255, 255)',
              'rgba(255, 255, 255)',
            ],
            borderWidth: 5,
            hoverBorderColor: [
              'rgba(255, 255, 255)',
              'rgba(255, 255, 255)',
              'rgba(255, 255, 255)',
            ],
            hoverBackgroundColor: [
              'rgba(139, 0, 0,0.8)',
              'rgba(0, 100, 0,0.8)',
              'rgba(112, 128, 144,0.8)',
            ],
          },
        ],
      },

      options: {
        legend: {
          display: true,
          labels: {
            fontSize: 15,
            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
          position: 'top',
        },
        layout: {
          padding: {
            top: 50,
          },
        },
      },
    })
  },
}
</script>

<style scoped>
.chart {
  max-width: 600px !important;
  max-height: 600px !important;
  margin: 0px auto;
}
</style>
