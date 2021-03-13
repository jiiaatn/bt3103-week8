<template>
  <div>
    <div v-for="(doc, index) in datapacket" v-bind:key="index">
              <div v-for="(item, index) in doc" v-bind:key="index">
          <p>{{item.name}}: {{item.count}}</p>
          <!--{{index}}-->
          <input v-bind:id="index" name="fname"  placeholder=0 type="number" min="0">
        </div>
      </div>
      <br><br><button v-on:click="updateOrder()">Update Order</button>
  </div>
</template>

<script>
import db from '../firebase.js'

export default {
  data() {
      return {
          datapacket: []
      }
  },
  methods: {
    fetchItems: function() {
      var doc_id = this.$route.params.id;
        db.collection('orders').doc(doc_id).get().then(snapshot => {
          this.datapacket = snapshot.data();
        });
    },
    updateOrder: function() {
      //var doc_id = this.$route.params.id;
      var data_copy = JSON.parse(JSON.stringify(this.datapacket));
      //console.log("datacopy: " + data_copy.order[0].name)
      //console.log("id: " + document.getElementById(0).value);
      //for loop to update all count
      for (let i = 0; i < this.datapacket.order.length; i++) {
        var new_count = document.getElementById(i).value;
        if (new_count == "") {
          new_count = 0;
        }
        data_copy.order[i].count = new_count;
      } //end for
      //update db
      db.collection('orders').doc(this.$route.params.id).update(data_copy).then(this.$router.push({ path: '/orders' }));

    }
  },
  created() {
      this.fetchItems();
    }
}

</script>

<style scoped>
  button {
  
    height: 30px;
    background-color: #f7cac9;
    border-radius: 10px;
    border-width: 1px;
    font-weight: bold;
  }

</style>
