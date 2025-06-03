<template>
  <OceanTitle />
  <FishingCalendar />
  <WeatherSec />
  <WeatherDetailSec />
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
import WeatherDetailSec from './WeatherDetailSec.vue';
// import NickNameReg from './NicknameReg.vue';

export default {
  name: 'MainPage',
  components: {
    OceanTitle,
    CrewInfo,
    WeatherSec,
    WeatherDetailSec,
    Ranking,
    FishingCalendar,
    // NickNameReg
  }
}
</script>
