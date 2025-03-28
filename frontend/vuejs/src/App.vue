<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">/ -->
  <!-- <ExampleComponent msg="Welcome to Your Vue.js App"/> -->

  <OceanTitle />
  <CrewInfo />

</template>

<script>
// import ExampleComponent from './components/ExampleComponent.vue';
import CrewInfo from './components/CrewInfo.vue';
import OceanTitle from './components/OceanTitle.vue';


export default {
  name: 'App',
  components: {
    // ExampleComponent,
    OceanTitle,
    CrewInfo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
