<template>
  <div>
    <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <header>
        <h1>Bar Chart</h1>
    </header>
    <bar-chart></bar-chart>
    <header>
        <h1>Line Chart</h1>
    </header>
    <line-chart></line-chart>
  </div>
</template>

<script>
import BarChart from './charts/BarChart.vue'
import LineChart from './charts/CallAPI.vue'

export default {
  components: {
    BarChart,
    LineChart
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
header{
    background: #DDA0DD;
    border-width: 2px;
    padding: 2px;
    height: 60px;
    text-align: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
h1{
    color:black;
}
</style>
