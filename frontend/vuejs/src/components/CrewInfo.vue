<template>
  <div class="crew-container">
    <div class="title-section">
      <div class="title-wrapper">
        <div class="ocean-title">
          <span class="text-wrapper">
            <span class="letters letters-left">바다</span>
            <span class="letters letters-right">이야기</span>
          </span>
          <div class="line"></div>
        </div>
        <div class="subtitle-wrapper">
          <h2 class="subtitle">우리의 크루를 소개합니다</h2>
        </div>
      </div>
      <div class="scroll-guide">
        <span>스크롤을 내려서 더 보기</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>

    <div class="crews-section">
      <div v-for="(crew, index) in crews" 
           :key="crew.crew_id" 
           class="crew-card"
           :class="'crew-card-' + index">
        <div class="card-content">
          <div class="card-background"></div>
          <span class="crew-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <h2 class="crew-name">{{ crew.crew_nm }}</h2>
          <div class="crew-info">
            <p class="crew-role">{{ crew.crew_role }}</p>
            <p class="crew-type">{{ crew.crew_type }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  data() {
    return {
      crews: []
    };
  },
  mounted() {
    this.fetchCrewData();
    this.initTitleAnimation();
  },
  methods: {
    initTitleAnimation() {
      // 라인 애니메이션
      gsap.from('.line', {
        scaleX: 0,
        duration: 1,
        ease: "power4.out"
      });

      // 왼쪽 텍스트 애니메이션
      gsap.from('.letters-left', {
        x: -100,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power4.out"
      });

      // 오른쪽 텍스트 애니메이션
      gsap.from('.letters-right', {
        x: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power4.out"
      });

      // 서브타이틀 애니메이션
      gsap.from('.subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.3,
        ease: "power3.out"
      });

      // 스크롤 가이드 애니메이션
      gsap.from('.scroll-guide', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.8,
        ease: "power2.out"
      });

      // 스크롤 가이드 아이콘 무한 애니메이션
      gsap.to('.scroll-guide i', {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2
      });
    },
    initCardAnimations() {
      // 각 카드의 애니메이션
      this.crews.forEach((_, index) => {
        gsap.from('.crew-card-' + index + ' .card-content', {
          scrollTrigger: {
            trigger: '.crew-card-' + index,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse"
          },
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power3.out"
        });

        // 배경 효과 애니메이션
        gsap.from('.crew-card-' + index + ' .card-background', {
          scrollTrigger: {
            trigger: '.crew-card-' + index,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse"
          },
          scaleY: 0,
          duration: 0.8,
          ease: "power2.inOut"
        });
      });
    },
    fetchCrewData() {
      axios.get('http://localhost:3000/crews')
        .then(response => {
          this.crews = response.data;
          this.$nextTick(() => {
            this.initCardAnimations();
          });
        })
        .catch(error => {
          console.error('상세 에러 정보:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
          });
        });
    }
  }
};
</script>

<style scoped>
.crew-container {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
}

.title-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.ocean-title {
  position: relative;
  text-align: center;
}

.text-wrapper {
  position: relative;
  display: inline-block;
  padding-top: 0.1em;
  padding-right: 0.05em;
  padding-bottom: 0.15em;
}

.line {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #000;
  transform-origin: left;
}

.letters {
  display: inline-block;
  font-size: 6rem;
  font-weight: 800;
  color: #000;
  letter-spacing: -0.05em;
}

.letters-left {
  margin-right: 0.5rem;
}

.subtitle-wrapper {
  overflow: hidden;
}

.subtitle {
  font-size: 2rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
  text-align: center;
}

.scroll-guide {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;
}

.crews-section {
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 8rem;
  max-width: 1200px;
  margin: 0 auto;
}

.crew-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
}

.card-content {
  position: relative;
  padding: 3rem 4rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  z-index: 1;
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%);
  transform-origin: bottom;
  z-index: 0;
}

.crew-card:hover .card-content {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.crew-number {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 600;
}

.crew-name {
  font-size: 3.5rem;
  color: #000000;
  margin: 0 0 1.5rem 0;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.crew-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.crew-role {
  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.8);
  margin: 0;
  font-weight: 500;
}

.crew-type {
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  font-weight: 400;
}

@media (max-width: 768px) {
  .letters {
    font-size: 4rem;
  }
  
  .subtitle {
    font-size: 1.5rem;
  }
  
  .card-content {
    padding: 2rem;
  }
  
  .crew-name {
    font-size: 2.5rem;
  }
  
  .crew-role {
    font-size: 1.4rem;
  }
  
  .crew-type {
    font-size: 1.1rem;
  }
}
</style>