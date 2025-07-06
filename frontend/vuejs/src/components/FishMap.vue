<template>
  <div class="background-color">
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
            :style="{ top: marker.top + 'px', left: marker.left + 'px' }"
          >
            <button class="marker" @click="handleMarkerClick(marker.label, marker.point)"></button>
            <span class="tooltip-text">{{ marker.label}}</span>
          </div>

        </div>


        <!-- 정보 영역 -->
        <div class="info-section">
          <!-- 지역 선택 버튼 -->
          <div class="region-buttons">
            <button v-for="(region, index) in regions" :key="index" @click ="RegionClick(region)" class="region-button">
              {{ region }}
            </button>
          </div>
        
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

      // 지역별 마커 추가
      markerList: [
        { top: 460,  left: 360,   label: '가덕도'  , point: 'SE' },
        { top: 490,  left: 355,   label: '거제도'  , point: 'SE' },
        { top: 340,  left: 135,   label: '군산'    , point: 'WS' },
        { top: 145,  left: 405,   label: '동해항'  , point: 'EN' },
        { top: 440,  left: 340,   label: '마산'    , point: 'SE' },
        { top: 500,  left: 115,   label: '목포항'  , point: 'SW' },
        { top: 450,  left: 390,   label: '부산'    , point: 'SE' },
        { top: 615,  left: 215,   label: '서귀포'  , point: 'Jeju' },
        { top: 585,  left: 205,   label: '제주'    , point: 'Jeju' },
        { top: 55,   left: 350,   label: '속초'    , point: 'EN' },
        { top: 500,  left: 255,   label: '여수'    , point: 'SW' },
        { top: 145,  left: 485,   label: '울릉도'  , point: 'Ulleungdo' },
        { top: 400,  left: 430,   label: '울산'    , point: 'ES' },
        { top: 155,  left: 145,   label: '인천송도', point: 'WN' },
        { top: 220,  left: 100,   label: '태안'    , point: 'WN' },
        { top: 485,  left: 330,   label: '통영'    , point: 'SE' },
        { top: 205,  left: 160,   label: '평택'    , point: 'WN' },
        { top: 325,  left: 430,   label: '포항'    , point: 'ES' },
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

<style scoped>
.content-wrapper {
  width: 1200px;
  margin: 0 auto; /* 가운데 정렬 */
}

.map-page {

  width:  1100px;
  height: 620px;
  margin: 0 auto;  /* 가운데 정렬 */
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 40px 50px 60px 50px; /* 위 오른 아래 왼 */
  background-color: #9de5fb; /* 원하는 배경색 */
  border-radius: 10px;

}

.map-section {

  position: relative; /* ✅ 반드시 필요! */

  flex: 0.9;
}

.marker {
  position: absolute;

  width: 20px;
  height: 20px;
  border-radius: 50%;        /* ✅ 동그랗게 */
  
  background-color: red;
  color: white;
  border: 3px solid white;   /* ✅ 흰색 테두리 */
  text-align: center;
  line-height: 24px;         /* 글자 중앙 정렬용 */
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
}

.tooltip-text {
  visibility: hidden;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 20px;
  white-space: nowrap;
  z-index: 11;
  opacity: 0;
  transition: opacity 0.2s;
}

.tooltip-wrapper {
  position: absolute;
}

.tooltip-wrapper:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}


.map-image {
/* 
  background-image: url('@/assets/Fishing_Point.png');
  background-size: cover;        
  background-size: cover;        
  background-repeat: no-repeat;  
  background-position: center;   
  background-size: 620px 730px;
  background-position: 60px -10px;   */


  width: 630px;
  height: 630px;
  margin-left: -50px;  /* ✅ 줄어든 만큼 땡겨오기 */
  margin-right: -110px;  /* ✅ 줄어든 만큼 땡겨오기 */

}

.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 50px 5px 50px; /* 위 오른 아래 왼 */

}

.region-buttons {
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  margin-bottom: 20px;
  align-items: center;  /* ✅ 세로 정렬 */


  position: relative;   /* 또는 absolute/fixed, 필요 시 */
  z-index: 100;         /* 충분히 높은 값으로 설정 */
  cursor: pointer;
}

.region-button {
  width: 69px;
  margin-left: 3px;
  padding: 7px 7px;
  color: #555;
  background-color: #fff;
  border: 1.5px solid #ccc;


  border-radius: 2px;
}

.status-icons {
  width: 72px;
  margin-top: 4px;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;      /* 세로 정렬 */
  justify-content: flex-start; /* 위에서부터 */
  align-items: center;         /* 아이콘을 가운데 정렬 */
  gap: 4px;

  position: relative;   /* 또는 absolute/fixed, 필요 시 */
  z-index: 100;         /* 충분히 높은 값으로 설정 */
  cursor: pointer;
}

.status-icon {
  width: 70px;
  height: 70px;
}


.fish-list {
  margin-top: 4px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  max-height: calc(200px * 4 + 8px * 3);  /* 카드 4개 높이 + 간격 3칸 */
  overflow-y: auto;                      /* 세로 스크롤 가능하게 */
  padding-right: 4px;                    /* 스크롤 안 가려지도록 */
}

.fish-card {
  width:  436px;
  height: 120px;
  display: flex;
  align-items: center;
  background-color: #e0f7fa;
  border-radius: 8px;
  /* padding: 10px; */
  overflow: hidden;            /* ✅ 가장 중요! */
  flex-shrink: 0; /* ✅ 스크롤 안에서 사이즈 줄어들지 않도록 */


}


.fish-image {
  width: 186px;
  height: 120px;
  object-fit: Cover;
  background-color: white;

  
}

.fish-info {
  width: auto;
  display: flex;
  flex: 1;                  /* 남은 공간 자동으로 채움 */

  flex-direction: column;
  height: 100%;     /* ✅ 이미지와 높이 맞춤 */

}


.fish-header {
  background-color: #009944;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px;
  font-weight: bold;
  align-items: center;
  font-size: 12px;
}

.fish-name {
  
}


.add-button {
  font-size: 10px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}



.fish-details {
  background-color: #39b26c;
  color: white;
  
  padding: 4px;
  padding-left: 16px;
  font-size: 10px;
  text-align: left;
  flex: 1;                  /* 남은 공간 자동으로 채움 */

}

.fish-details p {
  margin: 6px 0;
}

.fish-details strong {
  text-align: left;
  display: inline-block;
  width: 60px;
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


.add-button {
  font-size: 20px;
  background-color: green;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.Fish-section {
  display: flex;            /* ✅ 가로 배치 */
  flex-direction: row;      /* 기본값이 row지만 명시 가능 */
  gap: 5px;                /* div 사이 간격 */
  height: 508px;

}


</style>
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