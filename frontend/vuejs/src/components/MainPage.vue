<template>
  <OceanTitle />
  <FishingCalendar />
  <WeatherSec />
  <Ranking />
  <!-- <NickNameReg /> -->
  <!-- <FishMission /> -->
  <CrewInfo />
</template>

<script>
import CrewInfo from './CrewInfo.vue';
import OceanTitle from './OceanTitle.vue';
import Ranking from './Ranking.vue';
import FishingCalendar from './FishingCalendar.vue';
import WeatherSec from './WeatherSec.vue';
// import NickNameReg from './NicknameReg.vue'; // 미션용 닉네임 입력 
// import FishMission from './FishMission.vue'; // 미션용 미션 조회

export default {
  name: 'MainPage',
  components: {
    OceanTitle,
    CrewInfo,
    WeatherSec,
    Ranking,
    FishingCalendar,
    // NickNameReg,  // 미션용 닉네임 입력
    // FishMission,  // 미션용 미션 조회
  }
}
</script>
