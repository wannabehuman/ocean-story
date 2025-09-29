<template>
  <div class="wrap fishmap-wrap">
    <div class="sub-Container">
      <div class="map-page">
        <!-- 지도 영역 -->
        <div class="map-section">
          <img src="@/assets/map.png" alt="지도" class="map-image" />

          <!-- 포인트 버튼 배치  -->
          <div
            v-for="(marker, index) in markerList"
            :key="index"
            class="tooltip-wrapper"
            :style="{ top: marker.top + '%', left: marker.left + '%' }"
          >
            <button class="marker" @click="handleMarkerClick(marker.label, marker.point)"></button>
            <span class="tooltip-text">{{ marker.label}}</span>
          </div>

        </div>


        <!-- 정보 영역 -->
        <div class="info-section">
          <!-- 지역 선택 버튼 -->
          <!-- <div class="region-buttons">
            <button v-for="(region, index) in regions" :key="index" @click ="RegionClick(region)" class="region-button">
              {{ region }}
            </button>
          </div> -->
        
        <div class="Fish-section">
          <!-- 낚시 가능/불가능 아이콘 -->
          <div class="status-icons">
            <img src="@/assets/Button/Season Fish_icon.svg"    alt="낚시 가능" @click="SeasonFishClick()" class="status-icon" />
            <img src="@/assets/Button/Protected Fish_icon.svg" alt="낚시 불가" @click="ProtectedFishClick()" class="status-icon" />
          </div>
        
          <!-- 물고기 카드 리스트 -->
          <div class="fish-list">
            <div v-for="(fish, index) in fishList" :key="index" class="fish-card">
              <img :src="fish.image" alt="물고기" class="fish-image" />


              <div class="fish-info">
                <!-- 상단: 이름 + +버튼 -->
                <div class="fish-header">
                  <p class="fish-name">{{ fish.name }}</p>
                  <button class="add-button" @click="ShowFishDetail(fish.name, fish.image )">+</button>
                </div>
              
                <!-- 하단: 상세 정보 -->
                <div class="fish-details">
                  <p><strong>주소</strong> {{ fish.address }}</p>
                  <p><strong>체장</strong> {{ fish.size }}</p>
                  <p><strong>금어기</strong> {{ fish.banPeriod }}</p>
                </div>
              </div>
              
            </div>
          </div>

          
        </div>
          
        </div>
      </div> 
    </div>
  </div>

<FishDetailInform
  v-if="selectedFish"
  :fish="selectedFish"
  @close="selectedFish = null"
/>
</template>

<script>
import '@/assets/css/fishmap.css'
import FishDetailInform from './FishDetailInform.vue';
import axios from 'axios';
// import Papa from 'papaparse';

export default {
    components: 
    {
      FishDetailInform  // ← 이거 있어야 <FishDetailInform /> 쓸 수 있어요!
    },

    
  data() {
    return {
      
      fishinform: [],  // 또는 null, {}, "" 등 원하는 초기값
      Curlabel:"",
      Curpoint: "SW",
      Curtemp:  18,
      ShowFishType : true, // true - 시즌어종, False - 금어종
      // 세부 지역 선택 
      regions: ['녹산동', '용원동', '신호동', '하단동', '괴정동'],

      // 지역별 마커 추가
      markerList: [
        { top: 73.01,  left: 65.08,   label: '가덕도'  , point: 'SE'        },
        { top: 77.78,  left: 64.28,   label: '거제도'  , point: 'SE'        },
        { top: 53.97,  left: 29.36,   label: '군산'    , point: 'WS'        },
        { top: 23.01,  left: 72.22,   label: '동해항'  , point: 'EN'        },
        { top: 69.84,  left: 61.90,   label: '마산'    , point: 'SE'        },
        { top: 79.36,  left: 26.19,   label: '목포항'  , point: 'SW'        },
        { top: 71.43,  left: 69.84,   label: '부산'    , point: 'SE'        },
        { top: 97.62,  left: 42.06,   label: '서귀포'  , point: 'Jeju'      },
        { top: 92.86,  left: 40.48,   label: '제주'    , point: 'Jeju'      },
        { top:  8.73,  left: 63.49,   label: '속초'    , point: 'EN'        },
        { top: 79.36,  left: 48.41,   label: '여수'    , point: 'SW'        },
        { top: 23.01,  left: 84.92,   label: '울릉도'  , point: 'Ulleungdo' },
        { top: 63.49,  left: 76.19,   label: '울산'    , point: 'ES'        },
        { top: 24.60,  left: 30.95,   label: '인천송도', point: 'WN'        },
        { top: 34.92,  left: 23.81,   label: '태안'    , point: 'WN'        },
        { top: 76.98,  left: 60.32,   label: '통영'    , point: 'SE'        },
        { top: 32.54,  left: 33.33,   label: '평택'    , point: 'WN'        },
        { top: 51.59,  left: 76.19,   label: '포항'    , point: 'ES'        },
      ],
      fishList: [],
      selectedFish: null,
      loading: false,
      error: null
    };
  },

  async mounted()
  {
    await this.fetchFishData();
  },
  // 지역 버튼 클릭 함수 추가 
  methods: 
  {    
    async fetchFishData() 
    {
      this.LoadFishInform();
      this.UpdateFishList();
    },

    async LoadFishInform()
    {
       try 
       {
        this.loading    = true;        
        const response  = await axios.get(`${process.env.VUE_APP_API_URL}/api/fishmap`);
        this.fishinform = response.data;                
      } catch (error) {
        console.error('물고기 데이터 로딩 실패:', error);
        this.error = '데이터를 불러오는데 실패했습니다.';
      } finally {
        this.loading = false;
      }
    },

    UpdateFishList()
    {
      let indices;
      const todaystr = new Date().toISOString().slice(0, 10);
      if(this.ShowFishType) indices = this.filterFish(this.Curpoint, this.Curtemp, todaystr);
      else                  indices = this.filterProtectFish(this.Curpoint, todaystr);
      this.generateFilteredFishList(indices);
    },


    handleMarkerClick(label, point) 
    { 
      this.Curlabel = label;
      this.Curpoint = point;
      this.UpdateFishList();
    },

    ProtectedFishClick() 
    { 
      this.ShowFishType = false;
      this.UpdateFishList();
    },

    SeasonFishClick() 
    { 
      this.ShowFishType = true;
      this.UpdateFishList();
    },    
    ShowFishDetail(name, image) 
    {
      this.selectedFish = {
        name,
        src:image,
        size: 10,
        season: '6월~8월',
        description: `${name}는 대표적인 연안 어종이며, 여름철 산란기로 인해 금어기에 해당합니다.`
      };
    },
    closeDetail() 
    {
        this.selectedFish = null;
    },

    filterFish(region, temperature, todayStr) 
    {
      const resultIndices = [];

      // 날짜 처리: "2025-07-03" → Date 객체
      const today = new Date(todayStr);

      this.fishinform.forEach((row, index) => {
        // 1. 지역 일치
        const matchesRegion = row.Region === region;

        // 2. 온도 범위 일치
        const tempL = parseFloat(row.ActiveTemp_L);
        const tempH = parseFloat(row.ActiveTemp_H);
        const matchesTemperature = temperature >= tempL && temperature <= tempH;

        // 3. 날짜 전처리
        const start = this.parseKoreanMonthDay(row.StartDate);
        const end = this.parseKoreanMonthDay(row.EndDate);
        const year = today.getFullYear();

        const startDate = new Date(`${year}-${start}`); // 예: 2025-01-01
        const endDate = new Date(`${year}-${end}`);

        // 오늘이 날짜 범위 내에 있는지
        const matchesDate = today >= startDate && today <= endDate;

        if (matchesRegion && matchesTemperature && matchesDate) {
          resultIndices.push(index);
        }
      });

      console.log('🎯 최종 필터 인덱스:', resultIndices);
      return resultIndices;
    },
    parseKoreanMonthDay(dateStr) {
    // "01월 15일" → "01-15"
    const match = dateStr.match(/(\d{2})월 (\d{2})일/);
    if (!match) return '01-01'; // 기본값
    const [, mm, dd] = match;
    return `${mm}-${dd}`;
    },
    generateFilteredFishList(indices) {
    const result = [];
    const basePath = require.context('@/assets/Fish', false, /\.(png|jpg|jpeg)$/);

    indices.forEach(i => {
      const row = this.fishinform[i];
      const name = row.FishName;
      const imageFile = basePath
        .keys()
        .find(file => file.includes(name)); // 이름 포함된 이미지 찾기

      result.push({
        name: name,
        address: '부산광역시 녹산산단232로',
        size: row.ProtectLength ? `${row.ProtectLength}cm` : '-',
        banPeriod: row.ProtectStartDate && row.ProtectEndDate
          ? `${row.ProtectStartDate} ~ ${row.ProtectEndDate}`
          : '-',
        image: imageFile ? basePath(imageFile) : null
      });
    });

    this.fishList = result;
    console.log('🎯 생성된 fishList:', this.fishList);
    },

    filterProtectFish(region, todayStr) {
    const today = new Date(todayStr);
    const resultIndices = [];

    this.fishinform.forEach((row, index) => {
      const matchesRegion = row.Region === region;
      const inProtectPeriod = this.isInProtectPeriod(row, today);

      if (matchesRegion && inProtectPeriod) {
        resultIndices.push(index);
      }
    });

    return resultIndices;
  },
  isInProtectPeriod(row, today) {
  const year = today.getFullYear();
  const startStr = this.parseKoreanMonthDay(row.ProtectStartDate);
  const endStr = this.parseKoreanMonthDay(row.ProtectEndDate);

  const startDate = new Date(`${year}-${startStr}`);
  const endDate = new Date(`${year}-${endStr}`);

  return today >= startDate && today <= endDate;
  },


  }
};
</script>