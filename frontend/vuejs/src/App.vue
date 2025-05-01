<template>
  <!-- <OceanTitle /> -->
  <OceanTitle />
  <Ranking />
  <CrewInfo />

  <div id="app">
    <FishingCalendar />
    <!-- <ExampleComponent /> -->
  </div>
</template>

<script>
import CrewInfo from './components/CrewInfo.vue';
import OceanTitle from './components/OceanTitle.vue';
import Ranking from './components/Ranking.vue';
import { defineComponent } from 'vue'
import FishingCalendar from './components/FishingCalendar.vue'


// import ExampleComponent from './components/ExampleComponent.vue'
export default defineComponent({
  name: 'App',
  components: {
    // OceanTitle,
    OceanTitle,
    CrewInfo,
    Ranking,
    FishingCalendar
    // ExampleComponent
  }
})
</script>

<style>
#app {
  font-family: 'HakgyoansimDunggeunmisoTTF-B';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

/* 전역 스타일 */
body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}
</style>
