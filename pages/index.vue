<template>
  <section>
    <div class="head-text">ยอดผู้ติดเชื้อ Covid19 สะสม {{ date }}</div>
    <article id="chart">
      <chart v-if="load" />
    </article>
    <article class="box-input">
      <span class="box"
        >{{ getCases / 1000000 }} / ล้าน
        <div class="tip">ผู้ติดเชื้อ</div>
      </span>
      <span class="box"
        >{{ getRecovered / 1000000 }} / ล้าน
        <div class="tip">หายแล้ว</div>
      </span>
      <span class="box"
        >{{ getDeaths / 100000 }} / แสน
        <div class="tip">เสียชีวิต</div>
      </span>
    </article>
    <hr />
    <article id="table">
      <table-data />
    </article>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    load: false,
    date: 'วันนี้',
  }),
  created() {
    this.$store.dispatch('assign/setAllFirst')
    this.$store.dispatch('assign/setAllTableFirst')
  },
  computed: {
    ...mapGetters('assign', ['getCases', 'getRecovered', 'getDeaths']),
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish((this.load = true)), 500)
    })
    this.$nuxt.$on('selected', (select) => {
      if (select) {
        this.date = 'วันที่ ' + select
      } else {
        this.date = 'วันนี้'
      }

      this.$nextTick(() => {
        this.$nuxt.$loading.start((this.load = false))
        setTimeout(() => this.$nuxt.$loading.finish((this.load = true)), 500)
      })
    })
  },
}
</script>
<style scoped>
.theme--dark.v-application {
  background-color: rgb(255, 255, 255) !important;
}
#chart {
  min-height: 200px;
}
#table {
  margin: 30px 0px;
}
.head-text {
  text-align: center;
  font-size: 30px;
  color: #6e686a;
  font-weight: bold;
  margin-top: 10px;
}
.box-input {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(245px, 1fr));
  justify-content: center;
  width: 100%;
  margin: 80px auto 40px auto;
}
.box {
  margin: 10px 10px;
  padding: 21px 52px;
  background-color: #ac3e2a;
  font-size: 28px;
  border-radius: 10px;
  position: relative;
  color: white;
  text-align: center;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.tip {
  position: absolute;
  top: -18px;
  background-color: cadetblue;
  padding: 2px 8px;
  font-size: 22px;
  left: 29px;
  border-radius: 8px;
}
</style>
