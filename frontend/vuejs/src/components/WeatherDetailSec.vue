<!-- 
  * @Overview 날씨(상세보기) section
  * @History  2025-05-31 / 윤정서 / 최초작성
-->
<template>
  <div class="wrap weather-detail-wrap">

    
    <!-- WEATHER DETAIL CONTAINER -->
    <div class="dwthr-cont">


      <!-- DEATIL TITLE -->
      <div class="dwthr-tit">
        <p class="tit-loca">{{ location.label }}</p>
        <!-- <p class="tit-addr">{{ location.address }}</p> -->
      </div>
      <!-- DEATIL TITLE // -->


      <!-- DETAIL BOX -->
      <div class="dwther-box">


        <!-- DETAIL WEATHER INFO BOX -->
        <div class="dwthr-info-box">


          <!-- INFO HEADER -->
          <div class="dwthr-info-header">
            <div class="date-controls">
              <button @click="prevDate" class="date-btn prev">◀</button>
              <p class="day">{{ selectedDate ? selectedDate.split('-').join('.') : '' }}</p>
              <button @click="nextDate" class="date-btn next">▶</button>
            </div>
            <!-- <p class="date">{{ selectedDate ? selectedDate.split('-').join('.') : '' }}</p> -->
          </div>
          <!-- INFO HEADER // -->


          <!-- INFO BODY -->
          <div class="dwthr-info-body">
            <!-- <img src="" alt="/dddd"> -->
             <p>위에 똑같은 데이터 들어가야하나? 그러면 헷갈리지 않을까?</p>
          </div>
          <!-- INFO BODY // -->


          <!-- INFO FOOTER -->
          <div class="dwthr-info-footer">

            <p class="wthr">알아서 해주세용</p>
            <p class="temp">ㅋㅋㅋㅋ</p>

          </div>
          <!-- INFO FOOTER // -->



        </div>
        <!-- DETAIL WEATHER INFO BOX // -->


        <!-- WEATHER FIELD -->
        <div class="dwthr-field">


          <!-- FIELD TITLE -->
          <ul class="dwthr-field-tit">

            <li class="f-tit">시간</li>
            <li class="f-tit">날씨</li>
            <li class="f-tit">기온</li>
            <li class="f-tit">풍향</li>
            <li class="f-tit">수온</li>
            <li class="f-tit">강수</li>
            <li class="f-tit">풍속</li>
            <li class="f-tit">돌풍</li>
            <li class="f-tit">파고</li>

          </ul>
          <!-- FIELD TITLE // -->


          <!-- FIELD BOX -->
          <div class="dwthr-field-box">


            <!-- INNER -->
            <div class="field-box-inner">

              <!--  -->
              <ul v-for="(item, index) in weatherData[selectedDate]" :key="index" class="wthr-line" :class="{ 'wthr-color': index === currentHour }">

                <li class="wthr-line-item">{{ item.time }}</li>
                <li class="wthr-line-item"><img src="" alt=""></li>
                <li class="wthr-line-item">{{ item.temperature }}</li>
                <li class="wthr-line-item">{{ item.winddirection_10m}}</li>
                <li class="wthr-line-item">{{ item.sea_surface_temperature }}</li>
                <li class="wthr-line-item">{{ item.weathercode }}</li>
                <li class="wthr-line-item">{{ item.windspeed }}</li>
                <li class="wthr-line-item">{{ item.windgusts_10m }}</li>
                <li class="wthr-line-item">{{ item.wave_height }}</li>

              </ul>
              <!-- // -->
            </div>
            <!-- INNER // -->


          </div>
          <!-- FIELD BOX // -->


        </div>
        <!-- WEATHER FIELD // -->


      </div>
      <!-- DETAIL BOX // -->


    </div>
    <!-- WEATHER DETAIL CONTAINER // -->


  </div>
</template>



<script>
  import '@/assets/css/weatherDetailSec.css'
  export default {
  name: 'WeatherDetailSec',

  props: {
    location: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    location: {
      immediate: true,
      handler(newLocation) {
        if (newLocation && newLocation.value) {
          this.callHourlyOpenMeteo(newLocation);
        }
      }
    }
  },
  data() {
    return {
      weatherData: [],
      selectedDate: null,
      currentHour: 0
    }
  },
  mounted() {
    this.callHourlyOpenMeteo(this.location);
    this.scrollToCurrentTime();
  },
  methods: {
    prevDate() {
      const currentIndex = this.dates.indexOf(this.selectedDate);
      if (currentIndex > 0) {
        this.selectedDate = this.dates[currentIndex - 1];
        this.updateWeatherData();
      }
    },
    nextDate() {
      const currentIndex = this.dates.indexOf(this.selectedDate);
      if (currentIndex < this.dates.length - 1) {
        this.selectedDate = this.dates[currentIndex + 1];
        this.updateWeatherData();
      }
    },
    updateWeatherData() {
      if (this.selectedDate && this.weatherData[this.selectedDate]) {
        this.scrollToCurrentTime();
      }
    },
    async scrollToCurrentTime() {
      // 현재 시간의 시간 부분을 가져옴
      const now = new Date();
      const currentHour = now.getHours();
      this.currentHour = currentHour;
      await this.$nextTick();
      // 해당 시간의 요소로 스크롤
      const container = this.$el.querySelector('.field-box-inner');
      const targetElement = this.$el.querySelector(`.wthr-line:nth-child(${currentHour + 1})`);
      
      if (container && targetElement) {
        container.scrollTo({
          left: targetElement.offsetLeft - 50, // 왼쪽 여백을 위해 50px 뺌
          behavior: 'smooth'
        });
      }
    },
    callHourlyOpenMeteo(locationCode) {
  // locationCode가 없거나 유효하지 않은 경우 기본값 설정
  if (!locationCode || !locationCode.latitude || !locationCode.longitude) {
    console.log("위치 정보가 유효하지 않습니다:", locationCode);
    this.weatherData = {};
    this.selectedDate = null;
    this.dates = [];
    return;
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  // 7일 뒤의 날짜 계산
  const endNow = new Date(now);
  endNow.setDate(now.getDate() + 7);
  const endYear = endNow.getFullYear();
  const endMonth = String(endNow.getMonth() + 1).padStart(2, '0');
  const endDay = String(endNow.getDate()).padStart(2, '0');
  
  // 일반 기상 데이터 API 호출
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${locationCode.latitude}&longitude=${locationCode.longitude}&hourly=temperature_2m,windspeed_10m,winddirection_10m,precipitation,weathercode,windgusts_10m&start_date=${year}-${month}-${day}&end_date=${endYear}-${endMonth}-${endDay}&timezone=Asia%2FSeoul`;
  
  // 해양 기상 데이터 API 호출
  const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${locationCode.latitude}&longitude=${locationCode.longitude}&hourly=sea_surface_temperature,wave_height&start_date=${year}-${month}-${day}&end_date=${endYear}-${endMonth}-${endDay}&timezone=Asia%2FSeoul`;
  
  Promise.all([
    fetch(weatherUrl).then(res => res.json()),
    fetch(marineUrl).then(res => res.json())
  ])
  .then(([weatherData, marineData]) => {
    // 데이터가 없을 경우 기본값 설정
    const hourlyData = {
      time: weatherData?.hourly?.time || [],
      windgusts_10m: weatherData?.hourly?.windgusts_10m || [],
      temperature_2m: weatherData?.hourly?.temperature_2m || [],
      windspeed_10m: weatherData?.hourly?.windspeed_10m || [],
      winddirection_10m: weatherData?.hourly?.winddirection_10m || [],
      precipitation: weatherData?.hourly?.precipitation || [],
      weathercode: weatherData?.hourly?.weathercode || [],
      sea_surface_temperature: marineData?.hourly?.sea_surface_temperature || [],
      wave_height: marineData?.hourly?.wave_height || []
    };
    
    // 날짜별로 그룹화
    const groupedData = {};
    hourlyData.time.forEach((time, index) => {
      const [date, hour] = time.split('T');
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push({
        time: hour,
        temperature: hourlyData.temperature_2m[index],
        windgusts_10m: hourlyData.windgusts_10m[index],
        windspeed: hourlyData.windspeed_10m[index],
        winddirection_10m: hourlyData.winddirection_10m[index],
        precipitation: hourlyData.precipitation[index],
        weathercode: hourlyData.weathercode[index],
        sea_surface_temperature: hourlyData.sea_surface_temperature[index],
        wave_height: hourlyData.wave_height[index]
      });
    });
    
    // 날짜 배열 생성
    this.dates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));
    this.weatherData = groupedData;
    this.selectedDate = this.dates[0] || null;
    this.scrollToCurrentTime();
  })
  .catch(err => {
    console.error("날씨 데이터 불러오기 실패:", err)
    this.weatherData = {};
    this.selectedDate = null;
    this.dates = [];
  });
}
  },
}; // export end
</script>