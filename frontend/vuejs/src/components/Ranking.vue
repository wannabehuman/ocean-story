<template>
  <div class="ocean-container">
    <img src="@/../public/images/낚시_일러스트.png" class="fishing-image" alt="낚시 일러스트" />
    <div class="wave-container">
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
    </div>
    <div class="title-section">
      <div class="title-content">
        <div class="ocean-title">
          <span class="text-wrapper">
            <span class="letters letters-left">오늘의</span>
            <span class="letters ampersand"></span>
            <span class="letters letters-right">낚시왕</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 랭킹 테이블 영역 -->
    <div class="ranking-section">
      <div id="grid"></div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import axios from 'axios';

export default {
  name: 'RankingView',
  data() {
    return {
      grid: null,
      rankings: [],
      refreshInterval: null
    };
  },
  mounted() {
    this.initAnimation();
    this.loadGridLibrary();
    // 5초마다 랭킹 데이터 새로고침
    // this.refreshInterval = setInterval(() => {
    //   this.fetchRankingData();
    // }, 30000);
  },
  beforeUnmount() {
    // 컴포넌트 제거 시 인터벌 정리
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  },
  methods: {
    initAnimation() {
      // 초기 상태 설정
      gsap.set(['.letters', '.line', '.description'], { 
        opacity: 0 
      });
      
      // 낚시 이미지 초기 상태 (오프스크린으로 배치)
      gsap.set('.fishing-image', {
        opacity: 0,
        x: -10,
        y: 10,
        scale: 0.98
      });

      // 메인 타임라인
      const tl = gsap.timeline({
        defaults: { 
          ease: 'power2.out',
          duration: 0.5
        }
      });

      // Jello 효과를 위한 회전 각도 설정
      const rotations = [
        { rotation: -32, duration: 0.08 },
        { rotation: 24, duration: 0.08 },
        { rotation: -16, duration: 0.08 },
        { rotation: 8, duration: 0.08 },
        { rotation: 0, duration: 0.08 }
      ];

      // 파도 효과를 위한 설정
      const waveEffect = {
        keyframes: [
          { y: 0, rotation: 0 },
          { y: -24, rotation: 2, ease: "sine.inOut" },
          { y: 0, rotation: 0, ease: "sine.inOut" },
          { y: 5, rotation: -1, ease: "sine.inOut" },
          { y: 0, rotation: 0, ease: "sine.inOut" }
        ],
        duration: 0.8,
        ease: "none"
      };
      
      // 낚시 이미지를 부드럽게 등장시키기
      tl.to('.fishing-image', {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power1.inOut"
      })
      .to('.letters-left', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out"
      }, '-=0.7')
      .to('.letters-left', rotations)
      .to('.ampersand', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.4)"
      }, '-=0.2')
      .to('.letters-right', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out"
      }, '-=0.2')
      .to('.letters-right', rotations, '-=0.2')
      .to('.description', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out"
      }, '-=0.2')
      .to('.ranking-section', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, '-=0.1');
      
      // 부드러운 물결 애니메이션 - 부유 효과
      setTimeout(() => {
        gsap.to('.fishing-image', {
          y: -15,
          x: 6,
          duration: 2.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
        
        // 미세한 회전 애니메이션 별도 적용
        gsap.to('.fishing-image', {
          rotation: 2.5,
          duration: 2.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.3
        });
      }, 1500); // 초기 페이드인 후에 시작
      
      // 텍스트 애니메이션
      const letters = this.$el.querySelectorAll('.letters');
      letters.forEach(letter => {
        gsap.to(letter, waveEffect);
      });
      
      letters.forEach(letter => {
        letter.addEventListener('mouseenter', () => {
          gsap.to(letter, waveEffect);
        });
      });
    },
    
    loadGridLibrary() {
      // Toast UI Grid 라이브러리 로드하기
      const linkCSS = document.createElement('link');
      linkCSS.rel = 'stylesheet';
      linkCSS.href = 'https://uicdn.toast.com/grid/latest/tui-grid.css';
      document.head.appendChild(linkCSS);

      const linkThemeCSS = document.createElement('link');
      linkThemeCSS.rel = 'stylesheet';
      linkThemeCSS.href = 'https://uicdn.toast.com/tui.pagination/latest/tui-pagination.css';
      document.head.appendChild(linkThemeCSS);

      const script = document.createElement('script');
      script.src = 'https://uicdn.toast.com/grid/latest/tui-grid.js';
      script.onload = () => {
        this.fetchRankingData();
      };
      document.head.appendChild(script);
    },
    
    fetchRankingData() {
      // 서버에서 랭킹 데이터 가져오기
      axios.get(`${process.env.VUE_APP_API_URL}/api/ranking`)
        .then(response => {
          // 상위 15명만 필터링
          this.rankings = response.data
            .filter(item => item.complete_flg === 'Y') // 완료된 기록만 필터링
            .sort((a, b) => {
              const timeA = a.time_calc || Infinity;
              const timeB = b.time_calc || Infinity;
              return timeA - timeB;
            })
            .slice(0, 15); // 상위 15명만 선택

          if (this.grid) {
            // 이미 그리드가 초기화된 경우 데이터만 업데이트
            this.grid.resetData(this.rankings);
          } else {
            // 첫 로드 시 그리드 초기화
            this.initGrid();
          }
        })
        .catch(error => {
          console.error('랭킹 데이터를 불러오는데 실패했습니다:', error);
          // 에러 발생 시 샘플 데이터로 그리드 초기화 (상위 15명만)
          this.rankings = [
            { user_nm: '홍길동', start_dt: '2023-06-01 09:00:00', end_dt: '2023-06-01 09:15:30', time_calc: 930, complete_flg: 'Y' },
            { user_nm: '김영희', start_dt: '2023-06-01 10:30:00', end_dt: '2023-06-01 10:42:15', time_calc: 735, complete_flg: 'Y' },
            { user_nm: '박철수', start_dt: '2023-06-02 11:20:00', end_dt: '2023-06-02 11:35:45', time_calc: 945, complete_flg: 'Y' },
            { user_nm: '이영수', start_dt: '2023-06-03 13:10:00', end_dt: '2023-06-03 13:22:20', time_calc: 740, complete_flg: 'Y' },
            { user_nm: '최지민', start_dt: '2023-06-04 15:00:00', end_dt: '2023-06-04 15:18:40', time_calc: 1120, complete_flg: 'Y' }
          ].slice(0, 15);
          if (this.grid) {
            this.grid.resetData(this.rankings);
          } else {
            this.initGrid();
          }
        });
    },
    
    initGrid() {
      if (window.tui && window.tui.Grid) {
        const Grid = window.tui.Grid;
        
        // 날짜 포맷팅 함수
        const formatDate = (dateString) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toLocaleString('ko-KR');
        };
        
        // 그리드 설정
        this.grid = new Grid({
          el: document.getElementById('grid'),
          data: this.rankings,
          scrollX: false,
          scrollY: true,
          rowHeaders: ['rowNum'],
          columns: [
            {
              header: '사용자',
              name: 'user_nm',
              align: 'center',
              width: 120
            },
            {
              header: '시작 시간',
              name: 'start_dt',
              align: 'center',
              formatter: ({ value }) => formatDate(value)
            },
            {
              header: '종료 시간',
              name: 'end_dt',
              align: 'center',
              formatter: ({ value }) => formatDate(value)
            },
            {
              header: '소요 시간',
              name: 'time_calc',
              align: 'center',
              width: 120,
              sortable: true,
              sortingType: 'number',
              formatter: ({ row }) => {
                const start = row.start_dt ? new Date(row.start_dt) : null;
                const end = row.end_dt ? new Date(row.end_dt) : null;
                if (start && end && !isNaN(start) && !isNaN(end) && end > start) {
                  const diffMs = end - start;
                  const hours = Math.floor(diffMs / 3600000);
                  const minutes = Math.floor((diffMs % 3600000) / 60000);
                  const seconds = Math.floor((diffMs % 60000) / 1000);
                  if (hours > 0) {
                    return `${hours}시간 ${minutes}분 ${seconds}초`;
                  } else if (minutes > 0) {
                    return `${minutes}분 ${seconds}초`;
                  } else {
                    return `${seconds}초`;
                  }
                }
                return '-';
              },
              comparator: (valueA, valueB, rowA, rowB) => {
                const startA = rowA.start_dt ? new Date(rowA.start_dt) : null;
                const endA = rowA.end_dt ? new Date(rowA.end_dt) : null;
                const startB = rowB.start_dt ? new Date(rowB.start_dt) : null;
                const endB = rowB.end_dt ? new Date(rowB.end_dt) : null;
                
                const diffA = startA && endA ? endA - startA : Infinity;
                const diffB = startB && endB ? endB - startB : Infinity;
                
                // 소요시간이 없는 항목(Infinity)은 아래로
                if (diffA === Infinity && diffB === Infinity) return 0;
                if (diffA === Infinity) return 1;
                if (diffB === Infinity) return -1;
                
                return diffA - diffB;
              }
            }
          ]
        });
        
        // 그리드 테마 설정
        Grid.applyTheme('striped');
        
        // 소요시간 기준으로 정렬 (오름차순)
        this.grid.sort('time_calc', true);
      }
    }
  }
};
</script>
<style scoped>
.ocean-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgba(205, 236, 250, 0.7) 0%, rgba(225, 245, 254, 0.7) 100%);
  overflow: hidden;
  position: relative;
}

.fishing-image {
  position: absolute;
  top: 50px;
  left: 20px;
  width: 85%;
  height: 85%;
  object-fit: contain;
  object-position: left center;
  z-index: 1;
  will-change: transform;
  transform-origin: center center;
  cursor: default;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(0, 60, 120, 0.1));
}

.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  overflow: hidden;
  z-index: 0;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
}

.wave1 {
  z-index: 3;
  height: 60%;  
  background: #0cbff5;
}

.wave2 {
  z-index: 2;
  height: 80%;
  background: #6ddcf8;
}

.wave3 {
  z-index: 1;
  height: 100%;
  background: #a9f6fd;
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.title-section {
  text-align: right;
  padding: 1rem;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
}

.title-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.ocean-title {
  position: relative;
  display: inline-block;
}

.text-wrapper {
  position: relative;
  display: inline-block;
  padding: 0.5em 0;
  white-space: nowrap;
}

.letters {
  display: inline-block;
  font-size: 5.5rem;
  font-weight: bold;
  color: #0455BF;
  opacity: 0;
}

.letters-left {
  transform: translateX(-100px);
}

.letters-right {
  transform: translateX(100px);
}

.ampersand {
  margin: 0 1rem;
  font-family: serif;
  font-style: italic;
  transform: scale(0.5);
  color: #0455BF;
}

.description {
  font-size: 1.5rem;
  color: #666;
  margin: 0;
  transform: translateY(30px);
  opacity: 0;
  font-weight: 300;
  letter-spacing: 0.1em;
}

/* 랭킹 테이블 스타일 */
.ranking-section {
  position: absolute;
  top: 30%;
  left: 45%;
  transform: translate(-50%, -40%);
  width: 50%;
  min-height: 400px;
  max-width: 900px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 20px;
  opacity: 0;
  transform: translateY(20px);
  z-index: 10;
}

#grid {
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .letters {
    font-size: 3.5rem;
  }

  .ampersand {
    margin: 0 0.5rem;
  }

  .description {
    font-size: 1.2rem;
  }

  .title-section {
    padding: 0.8rem;
    top: 15px;
    right: 15px;
  }
  
  .ranking-section {
    width: 90%;
    height: 70%;
    padding: 15px;
    position: unset;
  }

  #grid .tui-grid-table { border: 2px solid red}
  /* #grid .tui-grid-table th:nth-child(3) {display: none;}  */

}

@media (max-width: 480px) {
  .letters {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1rem;
  }

  .title-section {
    padding: 0.5rem;
    top: 10px;
    right: 10px;
  }
  
  .ranking-section {
    /* width: 95%; */
    padding: 10px;
  }
}
</style> 