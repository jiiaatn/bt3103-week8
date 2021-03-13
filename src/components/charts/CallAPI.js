import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                data: [],
                label: "West",
                borderColor: "blue",
                fill: false
              },
              { 
                data: [],
                label: "National",
                borderColor: "green",
                fill: false
              },
              { 
                data: [],
                label: "East",
                borderColor: "yellow",
                fill: false
              },
              { 
                data: [],
                label: "Central",
                borderColor: "pink",
                fill: false
              },
              { 
                data: [],
                label: "South",
                borderColor: "red",
                fill: false
              },
              { 
                data: [],
                label: "North",
                borderColor: "purple",
                fill: false
              },
          ]
        },
        options: {
            legend: { 
              display: true
             },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23&type=json`).then(response => {
          //console.log(response.data.items)
          response.data.items.forEach(data => { 
            //console.log(data)
            this.datacollection.labels.push(data.timestamp)
            //console.log(data.readings.psi_twenty_four_hourly)
            //console.log(data.readings.psi_twenty_four_hourly.west)
            this.datacollection.datasets[0].data.push(data.readings.psi_twenty_four_hourly.west)
            this.datacollection.datasets[1].data.push(data.readings.psi_twenty_four_hourly.national)
            this.datacollection.datasets[2].data.push(data.readings.psi_twenty_four_hourly.east)
            this.datacollection.datasets[3].data.push(data.readings.psi_twenty_four_hourly.central)
            this.datacollection.datasets[4].data.push(data.readings.psi_twenty_four_hourly.south)
            this.datacollection.datasets[5].data.push(data.readings.psi_twenty_four_hourly.north)
          })
          this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}