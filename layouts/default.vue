<template>
  <div class="templ">
    <nav class="nav">
      <a href="#">กราฟ</a>
      <a href="#table">ตาราง</a>
      <v-select
        :options="options()"
        @input="selected"
        v-model="today"
        class="select-option"
      ></v-select>
    </nav>
    <div class="page">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.data = await fetch(
      'https://disease.sh/v3/covid-19/historical/all'
    ).then((res) => res.json())
    for (const key in this.data.cases) {
      this.date.push(key)
    }
  },
  data: () => ({
    data: {},
    date: ['วันนี้'],
    today: 'วันนี้',
  }),
  methods: {
    options() {
      return this.date
    },
    selected(select) {
      if (select && select != 'วันนี้') {
        this.$store.dispatch('assign/setAll', select)
        this.$store.dispatch('assign/setAllTable', select)
      } else {
        this.today = 'วันนี้'
        this.$store.dispatch('assign/setAllFirst')
        this.$store.dispatch('assign/setAllTableFirst')
      }
      this.$nuxt.$emit('selected', select)
    },
  },
}
</script>
<style scoped>
::v-deep .v-select {
  background-color: white;
  min-width: 120px;
}
::v-deep svg {
}
.templ {
  position: relative;
}
.select-option {
}
.page {
  max-width: 1040px;
  margin: 0 auto;
  border: 1px solid;
  padding: 10px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: auto;
  height: 90px;
  position: sticky;
  z-index: 10;
  top: 0;
  color: white;
}
a {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
  border-left: 1px solid;
  border-right: 1px solid;
}
</style>
