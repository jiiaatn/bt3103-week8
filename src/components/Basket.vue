<template>
  <div>
    <ul>
        Menu:
      <li v-for="quantity in selected" v-bind:key="quantity[0]">
          {{quantity[0] + " x " + quantity[1]}}
      </li>
    </ul>
    <button type="button" v-on:click="findTotal();sendOrder()">Add Order</button>
    <p v-show="this.subtotal != 0">Subtotal: ${{this.subtotal}}</p>
    <p v-show="this.subtotal != 0">Grand Total: ${{this.grandtotal}}</p>
  </div>
</template>

<script>
import db from '../firebase.js'

export default {
  props: ['selected'],
  data() {
    return {
      subtotal: 0,
      grandtotal : 0
    }
  },
  methods: {
    findTotal: function() {
      this.subtotal = 0;
      for (let i = 0; i < this.selected.length; i++) {
        const curr = this.selected[i];
        this.subtotal += curr[2]*curr[1];
      }
      
    },
    sendOrder: function() {
      var order = [{name: "Prawn omelette", count: 0}, {name: "Dry Beef Hor Fun", count: 0}, {name: "Sambal KangKung", count: 0},
                    {name: "Pork Fried Rice", count: 0}, {name: "Mapo Tofu", count: 0}, {name: "Cereal Prawn", count: 0}]

      for (let i = 0; i < this.selected.length; i++) {
        var curr = this.selected[i];
        /*order.push({
          name: curr[0],
          count: curr[1]
        })
        //console.log(order) */
        for (let j = 0; j < order.length; j++) { //compare name
          var item = order[j];
          //console.log(item.name);
          if (curr[0] == item.name) {
            var update = {};
            update["name"] = curr[0];
            update["count"] = curr[1];
            order[j] = update;//update count
            console.log(order);
          }
        }
      }

      db.collection("orders").add({
        order: order //order is an array of food dicts
      }).then(() => location.reload()); 

    }
  },
  watch: {
      subtotal: function() {
        this.grandtotal = 0;
        this.grandtotal = (this.subtotal*1.07).toFixed(2);
      }
  }
}
</script>

<style scoped>
    button{
        font-family: 'Avenir', Helvetica, Arial, sans-serif;  
        text-align: center;
        background-color: #FFA07A;
        margin-left: 40px;
    }
    p {
      margin-left: 40px;
    }

</style>
