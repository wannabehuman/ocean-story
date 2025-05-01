<template>
  <!-- <OceanTitle /> -->
  <OceanTitle />
  <Ranking />
  <CrewInfo />

</template>

<script>
import CrewInfo from './components/CrewInfo.vue';
import OceanTitle from './components/OceanTitle.vue';
import Ranking from './components/Ranking.vue';

export default {
  name: 'App',
  components: {
    // OceanTitle,
    OceanTitle,
    CrewInfo,
    Ranking
  }
}
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
</style>
