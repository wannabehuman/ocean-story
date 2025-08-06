<template>
  <OceanTitle />
  <FishingCalendar @locationChange="updateTitle" />
  <WeatherSec :location="currentLocation"/>
  <WeatherDetailSec :location="currentLocation"/>
  <FishMap/>
  <!-- <Ranking /> -->
  <!-- <NickNameReg /> -->
  <!-- <FishMission /> -->
  <CrewInfo />
  <ChatBot />
</template>

<script>
import CrewInfo         from './CrewInfo.vue';
import OceanTitle       from './OceanTitle.vue';
// import Ranking         from './Ranking.vue';
import FishingCalendar  from './FishingCalendar.vue';
import WeatherSec       from './WeatherSec.vue';
import WeatherDetailSec from './WeatherDetailSec.vue';
import FishMap          from './FishMap.vue';
import ChatBot          from './ChatBot.vue';

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
    FishMap,
    ChatBot,
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
