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
      Curpoint: "SW",
      // 세부 지역 선택 
      regions: ['녹산동', '용원동', '신호동', '하단동', '괴정동'],

      // // 지역별 마커 추가
      // markerList: [
      //   { top: 460,  left: 360,   label: '가덕도'  , point: 'SE' },
      //   { top: 490,  left: 355,   label: '거제도'  , point: 'SE' },
      //   { top: 340,  left: 135,   label: '군산'    , point: 'WS' },
      //   { top: 145,  left: 405,   label: '동해항'  , point: 'EN' },
      //   { top: 440,  left: 340,   label: '마산'    , point: 'SE' },
      //   { top: 500,  left: 115,   label: '목포항'  , point: 'SW' },
      //   { top: 450,  left: 390,   label: '부산'    , point: 'SE' },
      //   { top: 615,  left: 215,   label: '서귀포'  , point: 'Jeju' },
      //   { top: 585,  left: 205,   label: '제주'    , point: 'Jeju' },
      //   { top: 55,   left: 350,   label: '속초'    , point: 'EN' },
      //   { top: 500,  left: 255,   label: '여수'    , point: 'SW' },
      //   { top: 145,  left: 485,   label: '울릉도'  , point: 'Ulleungdo' },
      //   { top: 400,  left: 430,   label: '울산'    , point: 'ES' },
      //   { top: 155,  left: 145,   label: '인천송도', point: 'WN' },
      //   { top: 220,  left: 100,   label: '태안'    , point: 'WN' },
      //   { top: 485,  left: 330,   label: '통영'    , point: 'SE' },
      //   { top: 205,  left: 160,   label: '평택'    , point: 'WN' },
      //   { top: 325,  left: 430,   label: '포항'    , point: 'ES' },
      // ],
      // 지역별 마커 추가
      markerList: [
        { top: 73.01,  left: 65.08,   label: '가덕도'  , point: 'SE' },
        { top: 77.78,  left: 64.28,   label: '거제도'  , point: 'SE' },
        { top: 53.97,  left: 29.36,   label: '군산'    , point: 'WS' },
        { top: 23.01,  left: 72.22,   label: '동해항'  , point: 'EN' },
        { top: 69.84,  left: 61.90,   label: '마산'    , point: 'SE' },
        { top: 79.36,  left: 26.19,   label: '목포항'  , point: 'SW' },
        { top: 71.43,  left: 69.84,   label: '부산'    , point: 'SE' },
        { top: 97.62,  left: 42.06,   label: '서귀포'  , point: 'Jeju' },
        { top: 92.86,  left: 40.48,   label: '제주'    , point: 'Jeju' },
        { top:  8.73,  left: 63.49,   label: '속초'    , point: 'EN' },
        { top: 79.36,  left: 48.41,   label: '여수'    , point: 'SW' },
        { top: 23.01,  left: 84.92,   label: '울릉도'  , point: 'Ulleungdo' },
        { top: 63.49,  left: 76.19,   label: '울산'    , point: 'ES' },
        { top: 24.60,  left: 30.95,   label: '인천송도', point: 'WN' },
        { top: 34.92,  left: 23.81,   label: '태안'    , point: 'WN' },
        { top: 76.98,  left: 60.32,   label: '통영'    , point: 'SE' },
        { top: 32.54,  left: 33.33,   label: '평택'    , point: 'WN' },
        { top: 51.59,  left: 76.19,   label: '포항'    , point: 'ES' },
      ],

      //물고기 리스트 추가 
        fishList: [],
        selectedFish: null,
        loading: false,
        error: null
    };
  },

  async mounted() {
    await this.fetchFishData();
  },
  // 지역 버튼 클릭 함수 추가 
  methods: {

    async fetchFishData() {
      try {
        this.loading = true;
        // api/fishinform에서 fishmap으로 변경
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/fishmap`);
        this.fishinform = response.data;
        // 초기 데이터로 현재 지역의 물고기 목록 생성
        this.updateFishList(this.Curpoint);
      } catch (error) {
        console.error('물고기 데이터 로딩 실패:', error);
        this.error = '데이터를 불러오는데 실패했습니다.';
      } finally {
        this.loading = false;
      }
    },

    async handleMarkerClick(label, point) {
      this.Curpoint = point;
      await this.updateFishList(point);
    },

    async RegionClick(region) {
      this.Curpoint = region;
      await this.updateFishList(region);
    },

    async ProtectedFishClick() {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/fishmap/protected`, {
          params: { date: today }
        });
        this.updateFishListFromData(response.data);
      } catch (error) {
        console.error('보호 어종 데이터 로딩 실패:', error);
      }
    },

    async SeasonFishClick() {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/fishmap/date`, {
          params: { date: today }
        });
        this.updateFishListFromData(response.data);
      } catch (error) {
        console.error('시즌 어종 데이터 로딩 실패:', error);
      }
    },

    async updateFishList(region) {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/fishmap/region/${region}`);
        this.updateFishListFromData(response.data);
      } catch (error) {
        console.error('지역별 물고기 데이터 로딩 실패:', error);
      }
    },

    updateFishListFromData(fishData) {
      const basePath = require.context('@/assets/Fish', false, /\.(png|jpg|jpeg)$/);
      
      this.fishList = fishData.map(fish => {
        const imageFile = basePath
          .keys()
          .find(file => file.includes(fish.FishName));

        return {
          name: fish.FishName,
          address: '부산광역시 녹산산단232로',
          size: fish.ProtectLength ? `${fish.ProtectLength}cm` : '-',
          banPeriod: fish.ProtectStartDate && fish.ProtectEndDate
            ? `${fish.ProtectStartDate} ~ ${fish.ProtectEndDate}`
            : '-',
          image: imageFile ? basePath(imageFile) : null
        };
      });
    },

    ShowFishDetail(name, image) {
      this.selectedFish = {
        name,
        src: image,
        size: 10,
        season: '6월~8월',
        description: `${name}는 대표적인 연안 어종이며, 여름철 산란기로 인해 금어기에 해당합니다.`
      };
    },

    closeDetail() {
      this.selectedFish = null;
    }
  }
};
</script>
<!-- 
<script>
import FishModal from './FishInform.vue';

export default {
  components: { FishModal },
  data() {
    return {
      isModalVisible: false,
      images: []
    };
  },
  mounted() {
    const context = require.context('@/assets/Fish', false, /\.(png|jpe?g|webp)$/);
    this.images = context.keys().map(key => {
      const fileName = key.replace('./', '').replace(/\.[^/.]+$/, '');
      return {
        src: context(key),
        name: fileName
      };
    });
  },
  methods: {
    SeasonFish() {
      console.log('시즌별 어종');
    },
    openModal() {
      this.isModalVisible = true;
    }
  }
};
</script> -->


<!-- <style scoped>
.top-left-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 2001; /* 모달보다 위에 있어야 함 */
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.bottom-left-button {
  position: fixed;
  top: 110px;
  left: 20px;
  z-index: 2001;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.button-image {
  width: 80px;
  height: 80px;
}
</style> -->