<template>
  <OceanTitle />
  <FishingCalendar />
  <WeatherSec />
  <Ranking />
  <!-- <NickNameReg /> -->
  <FishMission />
  <CrewInfo />
</template>

<script>
import CrewInfo from './CrewInfo.vue';
import OceanTitle from './OceanTitle.vue';
import Ranking from './Ranking.vue';
import FishingCalendar from './FishingCalendar.vue';
import WeatherSec from './WeatherSec.vue';
// import NickNameReg from './NicknameReg.vue';

export default {
  name: 'MainPage',
  components: {
    OceanTitle,
    CrewInfo,
    WeatherSec,
    Ranking,
    FishingCalendar,
    // NickNameReg
  }
}
</script>
