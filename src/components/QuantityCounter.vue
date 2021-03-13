<template>
  <div>
      <button v-on:click="decrement">-</button> {{counter}} <button v-on:click="increment">+</button>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data(){
    return {
      counter: 0
    }
  },
  
  methods: {
      increment:function() {
          if (this.counter == 10){
             alert("You cannot buy more than 10 items.");
             //this.$emit('counter', this.item, this.counter);
          }
          else {
            this.counter++;
            this.$emit('counter', this.item, this.counter);
          }
          
      },
      decrement:function() {
          if (this.counter != 0){
              this.counter--;
              this.$emit('counter', this.item, this.counter);
          }
      }
  }
}
</script>

<style scoped>
    button{
        font-family: 'Avenir', Helvetica, Arial, sans-serif;  
        text-align: center;
        background-color: #FFA07A;
    }
    #counter {
        text-align: center;
    }
</style>
