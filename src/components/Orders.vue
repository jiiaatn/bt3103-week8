<template>
  <div>
    <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <ul>
      <li v-for="order in orders" v-bind:key="order[0].name">
        <div v-for="itemlist in order[1]" v-bind:key="itemlist[0]">
          <div v-for="item in itemlist" v-bind:key="item[0]">
            {{item.name}}:{{item.count}}
          </div>
        </div>
        <button v-bind:id="order[0]" v-on:click="deleteItem($event)">Delete</button><button v-bind:id="order[0]" v-on:click="route($event)">Modify</button>
      </li>
    </ul>
  </div>
</template>

<script>
import db from "../firebase.js"

export default {
  data() {
      return {
          orders: []
      }
  },
  methods: {
      fetchItems: function() {
        db.collection('orders').get().then(snapshot => {
          let order = [];
          snapshot.forEach(doc => {
            order = [doc.id, doc.data()];
            this.orders.push(order);
          });
        });
    },
    deleteItem: function(event) {
      let doc_id = event.target.getAttribute("id");
      db.collection('orders').doc(doc_id).delete().then(() => location.reload());
    },
    route: function(event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({ path: `/modify/${doc_id}`})
      //this.$router.push({ name: '/modify', params: { docId: doc_id } })
    }
  },
  created() {
      this.fetchItems();
    }
}
</script>

<style scoped>

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}

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


</style>
