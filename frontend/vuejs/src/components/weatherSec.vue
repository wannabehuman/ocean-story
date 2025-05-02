<!--  
  * @Overview 날씨 section
  * @History  2025-05-01 / 윤정서 / 최초작성
-->
<template>
  <div class="wrap weather-wrap">


    <!-- WEATHER CONTAINER -->
    <div class="wthr-cont">


      <!-- WEATHER ICON BOX -->
      <div class="wthr-icon-box">


        <!-- WEATHER ICON -->
        <div class="wthr-icon">
          <dotlottie-player
            :key="weatherIconSrc"
            :src='weatherIconSrc'
            class="loti-icon"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>


        </div>
        <!-- WEATHER ICON // -->


        <!-- WAVE ICON -->
        <div class="wave-icon"></div>
        <!-- WAVE ICON // -->


      </div>
      <!-- WEATHER ICON BOX // -->


      <!-- WEATHER INFO BOX -->
      <div class="wthr-info-box">


        <!-- INFO TOP -->
        <div class="wthr-info-top">


          <!-- WEATHER INFO -->
          <div class="wthr-info">

            <div class="wthr">{{ getSimpleWeatherCategory(wthr_code) }}</div>
            <div class="temp">{{ curnt_wthr.temperature_2m }}{{ curnt_wthr_unit.temperature_2m }}</div>
            <div class="loca">{{ this_region }}</div>

          </div>
          <!-- WEATHER INFO // -->


          <!-- TODAY INFO -->
          <div class="today-info">

            <div class="this-time">{{ timeString }}</div>
            <div class="this-date">{{ dateString }}</div>

          </div>
          <!-- TODAY INFO // -->


        </div>
        <!-- INFO TOP // -->


        <!-- INFO BOTTOM -->
        <div class="wthr-info-bttm">


          <!-- OTHER INFO -->
          <ul class="othr-info">

            <li class="othr-tit">풍향(m/s)</li>
            <li class="othr-con wind-dirt">{{ curnt_wthr.wind_direction_10m }}</li>
            <li class="othr-tit">풍속(m/s)</li>
            <li class="othr-con wind-speed">{{ curnt_wthr.wind_speed_10m }}</li>
            <li class="othr-tit">강수량(%)</li>
            <li class="othr-con wave-height">{{ curnt_wthr.precipitation }}</li>

          </ul>
          <!-- OTHER INFO // -->
          

        </div>
        <!-- INFO BOTTOM // -->


      </div>
      <!-- WEATHER INFO BOX // -->


    </div>
    <!-- WATHER CONTAINER // -->


  </div>
</template>


<script>
import '@/assets/css/weatherSec.css'
export default {
  name: 'WeatherComponent',
  data() {
    return {
      curnt_wthr: '',       // 오늘 날씨 정보
      curnt_wthr_unit: '',  // 날씨 정보에 해당하는 단위
      timeString: '',       // 현재 시간
      dateString: '',       // 오늘 날짜
      wthr_code: '',        // 날씨 코드
      this_region: '',      // 현재 지역
      weatherIconSrc: '',   // lottie 아이콘 src
    }
  }, // data end
  methods: {
    // 지리 정보 가져오는 메소드
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.callOepnMetheo(position.coords.latitude, position.coords.longitude);
          this.getLocationName(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("위치 정보 오류:", error);
        }
      );
    }, //
    

    // openMeeo 호출해보기
    callOepnMetheo(latitude, longitude) {
      let loca = latitude  || 35.1796;  // param 없을 시 부산 경도
      let long = longitude || 129.0756; // param 없을 시 부산 위도
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${loca}&longitude=${long}&current=temperature_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,&timezone=Asia%2FSeoul`;
      
      fetch(url)
        .then(res => res.json())
        .then(data => {
          // data return
          this.curnt_wthr = data.current;            // 
          this.curnt_wthr_unit = data.current_units; //
          this.wthr_code = data.current.weather_code;
          this.formatWeatherTime(data.current.time); // 여기에서 시간 포맷 호출
          this.setWeatherIcon(this.wthr_code);
        })
        .catch(err => {
          console.error("날씨 데이터 불러오기 실패:", err)
        });
    }, //


    // 날씨 코드에 맞는 아이콘을 설정하는 메서드
    setWeatherIcon(code) {
      // 날씨 코드에 따른 애니메이션 아이콘 URL을 지정
      console.log(code)
      switch(code) {
        // SUNNY
        case 0: 
          this.weatherIconSrc = "https://lottie.host/993e642c-c6f5-4cff-a25f-11f50b5eddc1/BhGxSqL2bY.lottie"; 
          break;
        // CLOUDY
        case 1:
        case 2:
        case 3:
          this.weatherIconSrc = 'https://lottie.host/2e801757-9b51-4d04-b421-3754992f5654/IQBh2ejW8M.lottie'; 
          break;
        // FOGGY
        case 45:
        case 48:
          this.weatherIconSrc = 'https://lottie.host/da12ca2c-d463-46f5-a64d-a180d61b9658/BasV12D50J.lottie'; 
          break;
        // RAINY 
        case 51:
        case 53:
        case 55:
          this.weatherIconSrc = 'https://lottie.host/5fff8212-d78c-4a15-8579-592a48b23638/hMYCRNGaJp.lottie'; 
          break;
        // SNOWY
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          this.weatherIconSrc = 'https://lottie.host/470698ac-aa51-4352-9d77-1e2b2a3a0761/VANWuWqSyp.lottie';
          break;
        // THUNDERSTORM
        case 95:
        case 96:
        case 99:
          this.weatherIconSrc = 'https://lottie.host/75ec1860-7160-4b52-b7b1-89f46608d64b/Kh53WFPTAW.lottie';
          break;
        default:
          this.weatherIconSrc = ''; // 기본 아이콘
      }
    }, //



    // 날짜 시간 가공하기
    formatWeatherTime(timeString) {
      const date = new Date(timeString);

      // 시간 (00:30 형식)
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      this.timeString = `${hours}:${minutes}`;

      // 요일 + MM/DD
      const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const day = days[date.getDay()];
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const dayOfMonth = date.getDate().toString().padStart(2, '0');
      this.dateString = `${day} ${month}/${dayOfMonth}`;
    }, //


    // weathercode text 바인딩
    getSimpleWeatherCategory(code) {
      if (code === 0) return 'SUNNY';
      if ([1, 2, 3].includes(code)) return 'CLOUDY';
      if ([45, 48].includes(code)) return 'FOGGY';
      if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'RAINY';
      if ([71, 73, 75, 77, 85, 86].includes(code)) return 'SNOWY';
      if ([95, 96, 99].includes(code)) return 'THUNDERSTORM';
      return '-';
    }, //


    getLocationName(lat, lon) {
      let loca = lat  || 35.1796;  // param 없을 시 부산 경도
      let long = lon || 129.0756; // param 없을 시 부산 위도
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${loca}&lon=${long}&format=json`;

      fetch(url, {
        headers: {
          'User-Agent': 'YourAppName (your@email.com)'  // 필수!
        }
      })
        .then(response => response.json())
        .then(data => {
          const address = data.address;
          // 시/도 단위 예: Seoul, Busan
          const region = address.state || address.city || address.county;
          this.this_region = region;
        })
        .catch(error => {
          console.error('역지오코딩 오류:', error);
        });
      },


  },
  mounted() {
    // 컴포넌트가 마운트 되면 위치 정보를 가져오는 메소드 실행
    this.getCurrentLocation();
    this.getLocationName(35.1796, 129.0756);
  }
}; // export end
</script>