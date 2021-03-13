import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: ["Pork Fried Rice", "Mapo Tofu", "Sambal KangKung", "Cereal Prawn", "Dry Beef Hor Fun", "Prawn omelette"],
            datasets: [{
                label: [],
                backgroundColor: ["blue", "purple", "green", "pink", "red", "orange"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
          var pfr_count = 0
          var mt_count = 0
          var sk_count = 0
          var cp_count = 0
          var dbhf_count = 0
          var po_count = 0
        querySnapShot.forEach(doc => { 
            for (let i = 0; i < doc.data().order.length; i++) {
                if (doc.data().order[i].name == "Pork Fried Rice") {
                    pfr_count += parseInt(doc.data().order[i].count) // Parse Int to account for 0 quantities
                }
                else if (doc.data().order[i].name == "Mapo Tofu") {
                    mt_count += parseInt(doc.data().order[i].count)
                }
                else if (doc.data().order[i].name == "Sambal KangKung") {
                    sk_count += parseInt(doc.data().order[i].count)
                }
                else if (doc.data().order[i].name == "Cereal Prawn") {
                    cp_count += parseInt(doc.data().order[i].count)
                }
                else if (doc.data().order[i].name == "Dry Beef Hor Fun") {
                    dbhf_count += parseInt(doc.data().order[i].count)
                }
                else if (doc.data().order[i].name == "Prawn omelette") {
                    po_count += parseInt(doc.data().order[i].count)
                }
            }
        })
        this.datacollection.datasets[0].data.push(pfr_count)
        this.datacollection.datasets[0].data.push(mt_count)
        this.datacollection.datasets[0].data.push(sk_count)
        this.datacollection.datasets[0].data.push(cp_count)
        this.datacollection.datasets[0].data.push(dbhf_count)
        this.datacollection.datasets[0].data.push(po_count)
        
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}