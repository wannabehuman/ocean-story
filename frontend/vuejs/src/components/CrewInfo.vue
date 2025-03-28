<template>
  <div class="crew-container">
    <div class="title-section">
      <div class="ocean">
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
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
           :class="['crew-card-' + index, index % 2 === 0 ? 'card-left' : 'card-right']">
        <div class="card-content">
          <div class="image-section" :style="{ backgroundImage: `url(${crew.image_url})` }">
            <div class="image-overlay"></div>
          </div>
          <div class="text-section">
            <div class="text-content">
              <span class="crew-number">{{ String(index + 1).padStart(2, '0') }}</span>
              <h2 class="crew-name">{{ crew.crew_nm }}</h2>
              <div class="crew-info">
                <p class="crew-role">{{ crew.crew_role }}</p>
                <p class="crew-type">{{ crew.crew_type }}</p>
              </div>
              <p class="crew-description">{{ crew.description }}</p>
            </div>
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
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2
      });
    },
    initCardAnimations() {
      this.crews.forEach((_, index) => {
        const card = '.crew-card-' + index;
        const content = `${card} .card-content`;
        const image = `${card} .image-section`;
        const textContent = `${card} .text-content`;

        gsap.set([content, image, textContent], { 
          opacity: 0
        });

        gsap.set(content, {
          x: index % 2 === 0 ? -30 : 30,
          y: 20
        });

        gsap.set(image, {
          scale: 1.05
        });

        gsap.set(textContent, {
          y: 15
        });

        ScrollTrigger.create({
          trigger: card,
          start: "top center+=100",
          end: "bottom center",
          onEnter: () => {
            const tl = gsap.timeline({
              defaults: {
                duration: 0.65,
                ease: "power2.out"
              }
            });

            tl.to(content, {
              opacity: 1,
              x: 0,
              y: 0,
            })
            .to(image, {
              opacity: 1,
              scale: 1,
            }, "-=0.45")
            .to(textContent, {
              opacity: 1,
              y: 0,
            }, "-=0.45");
          },
          onLeaveBack: () => {
            const tl = gsap.timeline({
              defaults: {
                duration: 0.5,
                ease: "power2.in"
              }
            });

            tl.to(textContent, {
              opacity: 0,
              y: 15,
            })
            .to(image, {
              opacity: 0,
              scale: 1.05,
            }, "-=0.35")
            .to(content, {
              opacity: 0,
              x: index % 2 === 0 ? -30 : 30,
              y: 20,
            }, "-=0.35");
          }
        });
      });
    },
    fetchCrewData() {
      axios.get('http://localhost:3000/crews')
        .then(response => {
          // 이미지 URL과 설명 필드가 없는 경우를 위한 기본값 처리
          this.crews = response.data.map(crew => ({
            ...crew,
            image_url: crew.image_url || '/default-profile.jpg',
            description: crew.description || '선원에 대한 자세한 소개가 곧 업데이트될 예정입니다.'
          }));
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
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  overflow: hidden;
  perspective: 1000px;
}

.ocean {
  position: absolute;
  width: 100%;
  height: 40%;
  bottom: 0;
  left: 0;
  background: linear-gradient(to bottom, rgba(26, 35, 126, 0.02), rgba(26, 35, 126, 0.05));
  overflow: hidden;
}

.wave {
  position: absolute;
  width: 200%;
  height: 100%;
  bottom: -5%;
  left: 0;
  background: url('data:image/svg+xml,<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="%231a237e" fill-opacity="0.04" d="M0,160L34.3,165.3C68.6,171,137,181,206,165.3C274.3,149,343,107,411,101.3C480,96,549,128,617,154.7C685.7,181,754,203,823,186.7C891.4,171,960,117,1029,112C1097.1,107,1166,149,1234,160C1302.9,171,1371,149,1406,138.7L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>') repeat-x;
  animation: wave 25s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

.wave:nth-of-type(2) {
  bottom: -10%;
  background: url('data:image/svg+xml,<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="%231a237e" fill-opacity="0.06" d="M0,192L34.3,181.3C68.6,171,137,149,206,160C274.3,171,343,213,411,213.3C480,213,549,171,617,144C685.7,117,754,107,823,128C891.4,149,960,203,1029,208C1097.1,213,1166,171,1234,160C1302.9,149,1371,171,1406,181.3L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>') repeat-x;
  animation: wave 20s cubic-bezier(0.36, 0.45, 0.63, 0.53) -.125s infinite;
  opacity: 1;
}

@keyframes wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1);
  }
  50% {
    transform: translateX(-25%) translateZ(0) scaleY(0.95);
  }
  100% {
    transform: translateX(-50%) translateZ(0) scaleY(1);
  }
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
  color: #1a237e;
  font-size: 0.9rem;
  opacity: 0.7;
}

.crews-section {
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  gap: 15vh;
  max-width: 1400px;
  margin: 0 auto;
  background: #ffffff;
}

.crew-card {
  position: relative;
  overflow: visible;
  height: 70vh;
  min-height: 600px;
  width: 100%;
  padding: 0 2rem;
}

.card-left {
  display: flex;
  justify-content: flex-start;
}

.card-right {
  display: flex;
  justify-content: flex-end;
}

.card-content {
  position: relative;
  background: #ffffff;
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(26, 35, 126, 0.08);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: grid;
  grid-template-columns: 45% 55%;
  overflow: hidden;
  width: 75%;
  transform-origin: center center;
  will-change: transform, opacity;
}

.image-section {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(26, 35, 126, 0.1),
    rgba(26, 35, 126, 0.05)
  );
}

.text-section {
  position: relative;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-content {
  opacity: 1;
  transform: none;
  position: relative;
}

.crew-card:hover .card-content {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(26, 35, 126, 0.15);
}

.crew-card:hover .image-section {
  transform: scale(1.05);
}

.crew-number {
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  font-size: 1.8rem;
  color: #1a237e;
  font-weight: 800;
  opacity: 0.3;
}

.crew-name {
  font-size: 4.5rem;
  color: #1a237e;
  margin: 0 0 1.5rem 0;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 30px rgba(26, 35, 126, 0.1);
  text-align: left;
}

.crew-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.crew-role,
.crew-type {
  font-size: 1rem;
  color: #1a237e;
  margin: 0;
  font-weight: 600;
  opacity: 0.8;
  background: rgba(26, 35, 126, 0.08);
  padding: 0.5rem 1rem;
  border-radius: 50px;
}

.crew-role::before,
.crew-type::before {
  content: '#';
  margin-right: 0.2rem;
  opacity: 0.7;
}

.crew-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #1a237e;
  opacity: 0.7;
  margin: 0;
  max-width: 90%;
}

@media (max-width: 1024px) {
  .crews-section {
    padding: 4rem 2rem;
  }

  .crew-card {
    padding: 0;
  }

  .card-left, .card-right {
    justify-content: center;
  }

  .card-content {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 45% 55%;
  }

  .text-section {
    padding: 2.5rem;
  }

  .crew-name {
    font-size: 3.5rem;
  }

  .crew-role,
  .crew-type {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  .crew-description {
    font-size: 1rem;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .main-title-top,
  .main-title-bottom {
    font-size: 2.8rem;
    padding: 0 1rem;
  }

  .card-content {
    width: 100%;
    grid-template-rows: 40% 60%;
  }

  .text-section {
    padding: 2rem;
  }
  
  .crew-name {
    font-size: 3rem;
    margin: 0 0 1rem 0;
  }
  
  .crew-info {
    margin-bottom: 1.5rem;
  }

  .crew-role,
  .crew-type {
    font-size: 0.85rem;
    padding: 0.3rem 0.7rem;
  }
}
</style>