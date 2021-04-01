const state = () => ({
  cases: '',
  recovered: '',
  deaths: '',
  allDataTable: [],
})

const getters = {
  getCases(state) {
    return state.cases
  },
  getRecovered(state) {
    return state.recovered
  },
  getDeaths(state) {
    return state.deaths
  },
  getAllDataTable(state) {
    return state.allDataTable
  },
}
const mutations = {
  SET_ALL(state, data) {
    state.cases = data.cases
    state.recovered = data.recovered
    state.deaths = data.deaths
  },
  SET_ALL_FIRST(state, data) {
    state.cases = data.cases
    state.recovered = data.recovered
    state.deaths = data.deaths
  },
  SET_ALL_Table_FIRST(state, data) {
    let newData = []
    for (const key in data) {
      newData.push({
        country: data[key].country,
        cases: data[key].cases,
        recovered: data[key].recovered,
        deaths: data[key].deaths,
      })
    }
    state.allDataTable = newData
  },
  SET_ALL_TABLE(state, { data, date }) {
    let newData = []
    for (const arr in data) {
      for (const key in data[arr].timeline.cases) {
        if (key == date) {
          newData.push({
            country: data[arr].country,
            cases: data[arr].timeline.cases[key],
            recovered: data[arr].timeline.recovered[key],
            deaths: data[arr].timeline.deaths[key],
          })
        }
      }
    }
    state.allDataTable = newData
  },
}
const actions = {
  async setAll({ commit }, date) {
    const allData = { cases: '', recovered: '', deaths: '' }
    const data = await fetch(
      'https://disease.sh/v3/covid-19/historical/all'
    ).then((res) => res.json())

    for (const key in data.cases) {
      if (key == date) {
        ;(allData.cases = data.cases[key]),
          (allData.recovered = data.recovered[key]),
          (allData.deaths = data.deaths[key])
      }
    }
    commit('SET_ALL', allData)
  },
  async setAllFirst({ commit }) {
    const data = await fetch('https://disease.sh/v3/covid-19/all').then((res) =>
      res.json()
    )

    commit('SET_ALL_FIRST', data)
  },
  async setAllTableFirst({ commit }) {
    const data = await fetch(
      'https://disease.sh/v3/covid-19/countries'
    ).then((res) => res.json())

    commit('SET_ALL_Table_FIRST', data)
  },
  async setAllTable({ commit }, date) {
    const data = await fetch(
      'https://disease.sh/v3/covid-19/historical'
    ).then((res) => res.json())

    commit('SET_ALL_TABLE', { data, date })
  },
}
export default {
  state,
  getters,
  actions,
  mutations,
}
