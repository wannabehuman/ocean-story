<template>
  <div class="crew-container">
    <div class="title-section">
      <div class="title-wrapper">
        <h1 class="main-title-top">우리의 크루를</h1>
        <h1 class="main-title-bottom">소개합니다</h1>
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
      // 타이틀 애니메이션
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.from('.main-title-top', {
        y: 100,
        opacity: 0,
        duration: 1
      })
      .from('.main-title-bottom', {
        y: 100,
        opacity: 0,
        duration: 1
      }, "-=0.5")
      .from('.scroll-guide', {
        y: 50,
        opacity: 0,
        duration: 1
      }, "-=0.5");

      // 스크롤 가이드 무한 애니메이션
      gsap.to('.scroll-guide i', {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
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
      axios.get('http://localhost/api/crews')
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
  gap: 1rem;
}

.main-title-top,
.main-title-bottom {
  font-size: 4.5rem;
  font-weight: 700;
  color: #000000;
  text-align: center;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
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
  .main-title-top,
  .main-title-bottom {
    font-size: 2.8rem;
    padding: 0 1rem;
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