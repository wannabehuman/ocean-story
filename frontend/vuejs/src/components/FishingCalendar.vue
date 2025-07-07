<template>
  <div class="background-color">
    <div class="calendar-container">
      <div class="fc-toolbar">
        <div>
          <!-- <button class="fc-button fc-button-primary" @click="today">오늘</button> -->
          <select v-model="selectedLocation" @change="handleLocationChange" class="location-select">
            <option v-for="location in locations" 
            :key="location.value" 
            :value="location">
            {{ location.label }}
            </option>
          </select>
        </div>
        <div class="fc-center">
          <button class="fc-button fc-button-primary" @click="prevMonth">◄</button>
          <h2 class="fc-toolbar-title">{{ currentTitle }}</h2>
          <button class="fc-button fc-button-primary" @click="nextMonth">►</button>
        </div>
        <!-- <div class="fc-right">
          <button class="fc-button fc-button-primary" @click="changeView('dayGridMonth')">월</button>
          <button class="fc-button fc-button-primary" @click="changeView('dayGridWeek')">주</button>
        </div> -->
      </div>
      <FullCalendar 
        ref="calendar"
        :options="calendarOptions"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../assets/css/calendar.css'


export default defineComponent({
  name: 'FishingCalendar',
  components: {
    FullCalendar
  },
  emits: ['locationChange'],
  data() {
    return {
      selectedLocation: {},
      monthData: {},
      year: null,
      month: null,
      isMonthDataLoaded: false,
      locations: [{value: 'DT_0063', label: '가덕도'}],
      currentTitle: '',
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        locale: 'ko',
        height: '720px',
        headerToolbar: false,
        dayHeaderFormat: { weekday: 'short' },
        showNonCurrentDates: false,  // 이전/다음 달의 날짜를 숨김
        fixedWeekCount: false,      // 'SUN', 'MON' 등의 형식으로 표시

        // 요일 헤더 커스텀 (선택적)
        dayHeaderContent: (arg) => {
          const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
          return days[arg.date.getDay()];
        },
        events: [
          { title: '낚시 일정', date: '2024-03-20' }
        ],
        eventClick: (info) => {
          const el = info.el;
          el.style.animation = 'pulse 0.5s ease';
        },
        dateClick: (info) => {
          const el = info.dayEl;
          this.addRippleEffect(el);
        },
        dayCellContent: (arg) => {
          const date = arg.date;
          const day = date.getDate();
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const dayStr = String(day).padStart(2, '0');
          const formattedDate = `${year}-${month}-${dayStr}`;
          
          const tideData = this.tideData?.find(tide => tide.tideDate === formattedDate);

          return {
            html: `
              <div class="day-cell">
                <div class="date-header">
                  <span class="solar-date">${day}</span>
                  <span class="lunar-date"></span>
                </div>
                <div class="tide-container">
                  <div class="high-tide-section">
                    <div class="tide-label">고</div>
                    <div class="tide-times">
                      ${tideData ? `
                        <div class="tide-time">${tideData.first_high_tide_time?.slice(0, 5)??''} ${tideData.first_high_tide ? '(' + tideData.first_high_tide + ')' : '-'}</div>
                        <div class="tide-time">${tideData.second_high_tide_time?.slice(0, 5)??''} ${tideData.second_high_tide ? '(' + tideData.second_high_tide + ')' : '-'}</div>
                      ` : '<div class="no-data">-</div>'}
                    </div>
                  </div>
                  <div class="tide-divider"></div>
                  <div class="low-tide-section">
                    <div class="tide-label">저</div>
                    <div class="tide-times">
                      ${tideData ? `
                        <div class="tide-time">${tideData.first_low_tide_time?.slice(0, 5)??''} ${tideData.first_low_tide ? '('+ tideData.first_low_tide + ')' : '-'}</div>
                        <div class="tide-time">${tideData.second_low_tide_time?.slice(0, 5)??''} ${tideData.second_low_tide ? '(' + tideData.second_low_tide + ')' : '-'}</div>
                      ` : '<div class="no-data">-</div>'}
                    </div>
                  </div>
                </div>
              </div>
            `
          };
        }
      },
      tideData: [] // 조위 데이터 배열
    }
  },
  computed: {
    selectedLocationLabel() {
      const location = this.locations.find(loc => loc.value === this.selectedLocation);
      return location ? location.label : '부산항신항';
    }
  },
  mounted() {
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = String(today.getMonth() + 1).padStart(2, '0');
    // const day = String(today.getDate()).padStart(2, '0');
    // const formattedDate = `${year}${month}${day}`;
    // this.findAll();
    this.fetchLocations();  
    this.selectedLocation = this.locations[0];
    this.updateTitle();
    // this.getMonthData();
  },
  methods: {
    // 위치 데이터 가져오기
    async fetchLocations() {
      try {
          const response = await fetch(`${process.env.VUE_APP_API_URL}/api/location`, {
            credentials: 'include', // 이 옵션 추가
          });
          const data = await response.json();
          this.locations = data.map(location => ({
            value: location.code,
            label: location.name,
            longitude: location.longitude,
            latitude: location.latitude
          }));
          this.selectedLocation = this.locations[0];
          this.handleLocationChange();
      } catch (error) {
          console.error('데이터 조회 실패:', error);
      }
    },
    async findAll(){
      // try {
      //     const response = await fetch(`${process.env.VUE_APP_API_URL}/api/sea-tides`, {
      //       credentials: 'include', // 이 옵션 추가
      //     });
      //     // const data = await response.json();
      //     // console.log('전체 데이터:', data);
      // } catch (error) {
      //     console.error('데이터 조회 실패:', error);
      // }
    },
    async fetchTideData(year, month, location) {
      // console.log(process.env.VUE_APP_API_URL);
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/sea-tides/${year}/${month}/${location}`);
        const data = await response.json();
        this.tideData = data; // 받아온 데이터 저장
        // console.log(this.tideData)
        // 달력 다시 렌더링
        this.$refs.calendar.getApi().render();
      } catch (error) {
        console.error('Error fetching tide data:', error);
      }
    },

    findTideExtremePoints(tideReadings) {
      if (!tideReadings || tideReadings.length < 3) return { highTides: [], lowTides: [] };
      const highTides = [];
      const lowTides = [];
      // console.log(tideReadings);
      tideReadings.forEach(reading => {
        if(reading.hl_code === '고조'){
          highTides.push(reading);
        }
        if(reading.hl_code === '저조'){
          lowTides.push(reading);
        }
      });

      // highTides.sort((a, b) => a.record_time.localeCompare(b.record_time));
      // highTides.sort((a, b) => a.record_time.localeCompare(b.record_time));
      // lowTides.sort((a, b) => a.record_time.localeCompare(b.record_time));

      return {
        highTides: highTides,
        lowTides: lowTides
      };
      
      
    },
    


    // 만조/간조 추출 알고리즘
    findTideExtremePointsTemp(tideReadings) {
      if (!tideReadings || tideReadings.length < 3) return { highTides: [], lowTides: [] };
      // console.log(tideReadings);
      // AM/PM으로 나누기
      const amReadings = tideReadings.filter(reading => {
        const hour = parseInt(reading.record_time.split(' ')[1].split(':')[0]);
        return hour >= 0 && hour < 12;
      });

      const pmReadings = tideReadings.filter(reading => {
        const hour = parseInt(reading.record_time.split(' ')[1].split(':')[0]);
        return hour >= 12 && hour < 24; 
      });
      
      const highTides = [];
      const lowTides = [];
      
      // AM 데이터에서 만조/간조 찾기
      if (amReadings.length > 0) {
        const amMax = amReadings.reduce((max, reading) => {
          return parseFloat(reading.tide_level) > parseFloat(max.tide_level) ? reading : max;
        }, amReadings[0]);
        
        const amMin = amReadings.reduce((min, reading) => {
          return parseFloat(reading.tide_level) < parseFloat(min.tide_level) ? reading : min;
        }, amReadings[0]);
        
        highTides.push({
          time: amMax.record_time,
          height: parseFloat(amMax.tide_level)
        });
        
        lowTides.push({
          time: amMin.record_time,
          height: parseFloat(amMin.tide_level)
        });
      }
      
      // PM 데이터에서 만조/간조 찾기
      if (pmReadings.length > 0) {
        const pmMax = pmReadings.reduce((max, reading) => {
          return parseFloat(reading.tide_level) > parseFloat(max.tide_level) ? reading : max;
        }, pmReadings[0]);
        
        const pmMin = pmReadings.reduce((min, reading) => {
          return parseFloat(reading.tide_level) < parseFloat(min.tide_level) ? reading : min;
        }, pmReadings[0]);
        
        highTides.push({
          time: pmMax.record_time,
          height: parseFloat(pmMax.tide_level)
        });
        
        lowTides.push({
          time: pmMin.record_time,
          height: parseFloat(pmMin.tide_level)
        });
      }
      
      // 시간순으로 정렬
      highTides.sort((a, b) => {
        return a.time.localeCompare(b.time);
      });
      
      lowTides.sort((a, b) => {
        return a.time.localeCompare(b.time);
      });
      
      return {
        highTides,
        lowTides
      };
    },
    addRippleEffect(element) {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      element.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    },
    handleLocationChange() {

      this.updateTitle();
    },
    prevMonth() {
      const calendarApi = this.$refs.calendar.getApi();
      // console.log(calendarApi);
      calendarApi.prev();
      this.updateTitle();

    },
    nextMonth() {
      const calendarApi = this.$refs.calendar.getApi();
  
      calendarApi.next();
      this.updateTitle();
    },
    today() {
      const calendarApi = this.$refs.calendar.getApi();

      calendarApi.today();
      this.updateTitle();
    },
    changeView(view) {
      const calendarApi = this.$refs.calendar.getApi();
      calendarApi.changeView(view);
    },
    updateTitle() {
      const calendarApi = this.$refs.calendar.getApi();
      const currentDate = calendarApi.getDate(); // Date 객체 반환
      
      // 현재 타이틀 (예: "2024년 3월")
      this.currentTitle = calendarApi.view.title;
      
      // 년도와 월 설정
      this.year = currentDate.getFullYear();
      this.month = currentDate.getMonth() + 1; // 0-11이므로 +1 필요
      
      // 해당 년월의 데이터 조회
      this.fetchTideData(this.year, this.month, this.selectedLocation.value);

      this.$emit('locationChange', this.selectedLocation);
    },
    async getMonthData(){
      const calendarApi = this.$refs.calendar.getApi();
      const currentDate = calendarApi.getDate();
    
    // 해당 월의 첫날
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    // 해당 월의 마지막날
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // YYYYMMDD 형식으로 변환
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    };

    let startDate = formatDate(firstDay);
    let endDate   = formatDate(lastDay);
    // Promise 배열 생성
    const promises = [];
    for(let i = startDate; i <= endDate; i++) {
      promises.push(this.fetchTideData(this.selectedLocation, i));
    }
    // for(let i = startDate; i < endDate; i++){
    //   this.fetchTideData(this.selectedLocation,i);
    //   // console.log(this.selectedLocation,i);
    // }
      // fetchTideData();
      try{
        await Promise.all(promises);
        this.isMonthDataLoaded = true;
        this.$nextTick(() => {
            const calendarApi = this.$refs.calendar.getApi();
            calendarApi.render();
          });
      } catch (error) {
        console.error('Error fetching tide data:', error);
      }
    }
  }
})
</script>

<style>
/* Regular 버전 폰트 */
@font-face {
    font-family: 'HakgyoansimDunggeunmiso';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2408@1.0/HakgyoansimDunggeunmiso.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

/* Bold 버전 폰트 */
@font-face {
    font-family: 'HakgyoansimDunggeunmisoTTF-B';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

/* 날짜와 요일 헤더는 Bold 버전 사용 */
.solar-date,
.fc-col-header-cell-cushion {
    font-family: 'HakgyoansimDunggeunmisoTTF-B', sans-serif !important;
    font-size: 24px;
}

/* 조석 정보는 Regular 버전 사용 */
.lunar-date,
.tide-label,
.tide-time,
.tide-level {
    font-family: 'HakgyoansimDunggeunmiso', sans-serif !important;
    font-weight: 400 !important;
}

/* 전체 캘린더에 폰트 적용 */
.fc {
    font-family: 'HakgyoansimDunggeunmiso', sans-serif !important;
    font-weight: 400 !important;
}

/* 요일 헤더에 폰트 적용 */
.fc-col-header-cell-cushion {
    font-weight: normal !important;
}

/* 캘린더 전체에 폰트 적용 */
.fc {
    font-family: 'HakgyoansimDunggeunmiso', sans-serif !important;
}

/* 전체 캘린더 컨테이너 */
.fc {
  background-color: #9de5fb;
  /* padding: 20px; */
  padding: 0px;
  border-radius: 10px;
  width: 100% !important;  /* 또는 특정 픽셀값 예: 1200px */
  max-width: 1400px !important;  /* 최대 너비 설정 */
  margin: 0 auto !important;
}

/* 날짜 그리드 테이블 구조 수정 */
.fc-theme-standard .fc-scrollgrid {
  border: none !important;
  border-collapse: separate !important;  /* 중요: 셀 간격을 위해 필요 */
  border-spacing: 8px !important;        /* 그리드 간격 조절 */
}

/* 날짜 셀 스타일 */
.fc .fc-daygrid-day {
  background-color: white !important;
  border-radius: 8px !important;
  border: 1px solid #a8e0ff !important;
  padding: 0 !important;
  overflow: hidden !important;
}

/* 날짜 셀 높이와 패딩 설정 */
.fc .fc-daygrid-day-frame {
    padding: 14px !important;  /* 패딩을 14px로 설정 */

    min-height: 88px !important;
    max-height: 88px !important;
    box-sizing: border-box !important;
}

/* 셀 내부 컨텐츠가 높이를 넘어가지 않도록 설정 */
.fc .fc-daygrid-day-events {
    margin: 0 !important;
    padding: 0 !important;
    min-height: 0 !important;
}

/* 스크롤 방지 */
.fc-scroller {
    overflow: hidden !important;
}

/* 행 높이 설정 */
.fc-dayGridMonth-view .fc-daygrid-body tr {
    height: 88px !important;
}

/* 테이블 셀 설정 */
.fc-daygrid-day-frame td {
    height: 88px !important;
}

/* 테이블 셀 테두리 제거 */
.fc-theme-standard td, 
.fc-theme-standard th {
  border: none !important;
}

/* 스크롤 그리드 섹션 테두리 제거 */
.fc-theme-standard .fc-scrollgrid-section > * {
  border: none !important;
}

/* 날짜 헤더 스타일 */
.date-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0 !important;  /* 구분선 추가 */
  padding-bottom: 4px !important;  /* 구분선과 텍스트 사이 간격 */
  margin-bottom: 4px !important;   /* 구분선과 아래 내용 사이 간격 */
}

/* 음력 텍스트 크기 */
.lunar-date {
    font-size: 18px !important;
}

/* 조석 정보 컨테이너 */
.tide-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    position: relative;
}

/* 구분선 추가 */
.tide-divider {
    width: 1px !important;
    background-color: #e0e0e0 !important;
    position: absolute !important;
    left: 50% !important;
    top: 0 !important;
    bottom: 0 !important;
    transform: translateX(-50%) !important;
}

/* 고조/저조 섹션 */
.high-tide-section,
.low-tide-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 조석 레이블 스타일 */
.tide-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9em;
}

.high-tide-section .tide-label::before {
  content: "▲";
  color: #ff4444;
}

.low-tide-section .tide-label::before {
  content: "▼";
  color: #4444ff;
}

/* 조석 시간 스타일 */
.tide-times {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.85em;
}

.tide-time {
  color: #333;
}

.tide-level {
  color: #666;
  font-size: 0.9em;
}

/* FullCalendar 기본 스타일 오버라이드 */
.fc .fc-daygrid-day-frame {
  padding: 4px !important;
  min-height: 100px !important;
}

.fc .fc-daygrid-day-top {
  display: block !important;
}

.fc .fc-daygrid-day-number {
  float: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events {
  margin: 0 !important;
  padding: 0 !important;
}

/* 전체 그리드 컨테이너에 패딩 추가 */
.fc-view-harness {
  padding: 4px !important;
}

/* 토요일 스타일 */
.fc th.fc-day-sat {
  color: #0066cc !important;  /* 파란색 */
}

/* 일요일 스타일 */
.fc th.fc-day-sun {
  color: #ff4444 !important;  /* 빨간색 */
}

/* 날짜 숫자에도 같은 색상 적용 */
.fc-day-sat .fc-daygrid-day-number {
  color: #0066cc !important;
}

.fc-day-sun .fc-daygrid-day-number {
  color: #ff4444 !important;
}

/* 토요일 solar-date */
.fc-day-sat .solar-date {
  color: #0066cc !important;
}

/* 일요일 solar-date */
.fc-day-sun .solar-date {
  color: #ff4444 !important;
}

/* 요일 헤더 높이 조절 */
.fc-col-header-cell {
    padding: 4px !important;  /* 헤더 높이 줄임 */
}

/* 툴바 배경색 설정 */
.fc-toolbar {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 10px !important;
    background-color: #9de5fb !important;
}

/* 왼쪽 영역 (select box) */
.fc-left {
    flex: 1 !important;
}

/* 중앙 영역 (날짜 네비게이션) */
.fc-center {
    flex: 2 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 10px !important;
}

/* select box 스타일 */
.location-select {
    padding: 8px !important;
    border-radius: 4px !important;
    border: 1px solid #ccc !important;
    font-family: 'HakgyoansimDunggeunmiso', sans-serif !important;
}

/* 네비게이션 버튼 스타일 */
.fc-button-primary {
    background-color: #01138A !important;
    border: none !important;
    color: #fff !important;
    padding: 8px 16px !important;
    cursor: pointer !important;
    font-family: 'HakgyoansimDunggeunmisoTTF-B', sans-serif !important;
}

/* 툴바 제목 스타일 */
.fc-toolbar-title {
    font-family: 'HakgyoansimDunggeunmisoTTF-B', sans-serif !important;
    font-size: 1.5em;
    margin: 0 20px ;
    letter-spacing: -1px;
}
.background-color {
  background-color: #0bbff5
}


@media (max-width: 768px) {

  .calendar-container {
    padding: 20px 10px;
  }

  .fc-toolbar-title {
   font-size: 1.4em !important;
   white-space: nowrap;
   margin: 0;
  }


  .solar-date,
  .fc .fc-col-header-cell-cushion {
    font-size: 1rem;
  }

  .tide-container {
    flex-wrap: wrap;
    font-size: .9rem;
  }



  .tide-divider {
    display: none;
  }


}


</style>