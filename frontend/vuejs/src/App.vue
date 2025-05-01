<template>
  <div id="app">
    <FishingCalendar />
    <!-- <ExampleComponent /> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import FishingCalendar from './components/FishingCalendar.vue'
// import ExampleComponent from './components/ExampleComponent.vue'
export default defineComponent({
  name: 'App',
  components: {
    FishingCalendar
    // ExampleComponent
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* 전역 스타일 */
body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}
</style>
