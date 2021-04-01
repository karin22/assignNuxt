<template>
  <article class="tap-table">
    <h4 class="text-head">ยอดผู้ติดเชื้อแต่ละประเทศ</h4>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      class="search"
    ></v-text-field>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="desserts"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TableData',

  data: () => ({
    search: '',

    headers: [
      {
        text: 'ประเทศ',
        sortable: true,
        value: 'country',
      },
      { text: 'ติดเชื้อ', value: 'cases' },
      { text: 'หายแล้ว', value: 'recovered' },
      { text: 'เสียชีวิต', value: 'deaths' },
    ],
  }),
  computed: {
    ...mapGetters('assign', ['getAllDataTable']),
    desserts() {
      return this.getAllDataTable
    },
  },
}
</script>

<style scoped>
::v-deep .v-data-footer__select {
  display: none !important;
}
::v-deep .text-start {
  text-align: center !important;
}
::v-deep .v-data-table-header {
  background-color: silver !important;
}
::v-deep .v-data-table-header-mobile__wrapper .v-select{
  display: none;
}
.tap-table {
  height: 700px;
  overflow-x: hidden;
}
.search {
  width: 150px;
  margin-bottom: 10px;
}
.text-head {
  text-align: center;
  font-size: 25px;
  color: #6e6868;
}
</style>
