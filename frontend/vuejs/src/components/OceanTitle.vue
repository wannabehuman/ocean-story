<template>
  <div class="ocean-container">
    <img 
      :src="backgroundImage" 
      class="background-image-full"
      alt="배경 이미지"
      loading="lazy"
    />
    <div class="background-image"></div>
    <div class="wave-container">
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
    </div>
    <div class="title-section">
      <div class="title-content">
        <div class="ocean-title">
          <span class="text-wrapper">
            <span class="letters letters-left">OCEAN</span>
            <span class="letters ampersand"></span>
            <span class="letters letters-right">STORY</span>
          </span>
          <!-- <div class="line"></div> -->
        </div>
        <p class="description">당신의 낚시 파트너</p>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  name: 'OceanTitle',
  data() {
    return {
      backgroundImage: '',
      textColor: '#0455BF',
      currentHour: new Date().getHours()
    };
  },
  computed: {
    descriptionColor() {
      return this.currentHour >= 19 || this.currentHour < 5 ? '#F2D16C' : '#666';
    }
  },
  mounted() {
    this.initAnimation();
    this.setBackgroundByTime();
  },
  methods: {
    async setBackgroundByTime() {
      this.currentHour = new Date().getHours();
      
      // 이미지 프리로드
      const preloadImage = (src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        });
      };

      // 현재 시간에 맞는 이미지 설정
      let imagePath = '';
      if (this.currentHour >= 19 || this.currentHour < 5) {
        // Evening/Night (7PM to 5AM)
        imagePath = '/images/night_bg.png';
        this.textColor = '#F2D16C';
      } else if (this.currentHour >= 17 && this.currentHour < 19) {
        // Afternoon (5PM to 7PM)
        imagePath = '/images/afternoon_bg.png';
        this.textColor = '#0455BF';
      } else {
        // Morning/Day (5AM to 5PM)
        imagePath = '/images/sunny_bg.png';
        this.textColor = '#0455BF';
      }

      // 이미지 로드 후에만 배경 전환
      await preloadImage(imagePath);
      this.backgroundImage = imagePath;
    },
    initAnimation() {
      // 초기 상태 설정
      gsap.set(['.letters', '.line', '.description'], { 
        opacity: 0 
      });
      gsap.set('.line', { 
        scaleX: 0 
      });

      // 메인 타임라인
      const tl = gsap.timeline({
        defaults: { 
          ease: 'elastic.out(0.5, 0.3)',
          duration: 0.6
        }
      });

      // Jello 효과를 위한 회전 각도 설정
      const rotations = [
        { rotation: -32, duration: 0.12 },
        { rotation: 24, duration: 0.12 },
        { rotation: -16, duration: 0.12 },
        { rotation: 8, duration: 0.12 },
        { rotation: 0, duration: 0.12 }
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
        duration: 1.2,
        ease: "none"
      };

      // 애니메이션 시퀀스
      tl.to('.letters-left', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      })
      .to('.letters-left', rotations)
      .to('.ampersand', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, '-=0.4')
      .to('.letters-right', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      }, '-=0.4')
      .to('.letters-right', rotations, '-=0.3')
      .to('.line', {
        opacity: 1,
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out"
      }, '-=0.5')
      .to('.description', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, '-=0.3');
      const letters = this.$el.querySelectorAll('.letters');
      letters.forEach(letter => {
        gsap.to(letter, waveEffect);
      });
      // 호버 효과 추가
      letters.forEach(letter => {
        letter.addEventListener('mouseenter', () => {
          gsap.to(letter, waveEffect);
        });
      });
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
  overflow: hidden;
  position: relative;
}

.background-image-full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  will-change: transform;
  /* 이미지 스케일을 살짝 크게 하여 스크롤 시 여백이 보이지 않도록 함 */
  transform: scale(1.02);
  /* 이미지 로딩 중 깜빡임 방지 */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
}

.background-image {
  position: absolute;
  top: 230px;
  left: 20px;
  width: 45%;
  height: 45%;
  background-image: url('@/../public/images/낚시_일러스트.png');
  background-size: contain;
  background-position: left center;
  background-repeat: no-repeat;
  z-index: 1;
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
  /* opacity: 0.7; */
  height: 60%;  
  background: #0cbff5;

}

.wave2 {
  z-index: 2;
  /* opacity: 0.5; */
  height: 60%;
  background: #6ddcf8;

}

.wave3 {
  width: 101%;
  z-index: 1;
  /* opacity: 0.3; */
  /* height: 100%; */
  /* background: #a9f6fd; */
  background-repeat: round;
  background-position: top;
  background-size: contain;
  background-image: url('@/../public/images/wthr_wave.png');
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
  text-align: center;
  padding: 1rem;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.title-content {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: v-bind(textColor);
  opacity: 0;
  transition: color 0.5s ease;
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
  color: v-bind(textColor);
  transition: color 0.5s ease;
}

.line {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #000 0%, #666 100%);
  transform-origin: left;
}

.description {
  font-size: 1.5rem;
  color: v-bind(descriptionColor);
  margin: 0;
  transform: translateY(30px);
  opacity: 0;
  font-weight: 300;
  letter-spacing: 0.1em;
  transition: color 0.5s ease;
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
  }
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
  }
}
</style> 