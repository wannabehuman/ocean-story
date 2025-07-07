<template>
  <OceanTitle />
  <FishingCalendar @locationChange="updateTitle" />
  <WeatherSec :location="currentLocation"/>
  <WeatherDetailSec :location="currentLocation"/>
  <!-- <Ranking /> -->
  <!-- <NickNameReg /> -->
  <!-- <FishMission /> -->
  <CrewInfo />
</template>

<script>
import CrewInfo from './CrewInfo.vue';
import OceanTitle from './OceanTitle.vue';
// import Ranking from './Ranking.vue';
import FishingCalendar from './FishingCalendar.vue';
import WeatherSec from './WeatherSec.vue';
import WeatherDetailSec from './WeatherDetailSec.vue';
// import NickNameReg from './NicknameReg.vue';
// import { ref } from 'vue';
export default {
  name: 'MainPage',
  components: {
    OceanTitle,
    CrewInfo,
    WeatherSec,
    WeatherDetailSec,
    // Ranking,
    FishingCalendar,
    // NickNameReg
  },
  data() {
    return {
      currentLocation: {},
    };
  },
  methods: {
    updateTitle(selectedLocation) {
      this.currentLocation = selectedLocation;
      // console.log('Selected location:', this.currentLocation);
      // this.$refs.weatherSec.updateTitle();
      // this.$refs.weatherDetailSec.updateTitle();
    }
  }
}
</script>
