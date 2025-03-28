<template>
  <div class="ocean-container">
    <div class="title-section">
      <div class="title-content">
        <div class="ocean-title">
          <span class="text-wrapper">
            <span class="letters letters-left">바다</span>
            <span class="letters ampersand"></span>
            <span class="letters letters-right">이야기</span>
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
  mounted() {
    this.initAnimation();
  },
  methods: {
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
      const letters = document.querySelectorAll('.letters');
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
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
  overflow: hidden;
}

.title-section {
  text-align: center;
  padding: 2rem;
}

.title-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.ocean-title {
  position: relative;
  display: inline-block;
}

.text-wrapper {
  position: relative;
  display: inline-block;
  padding: 0.5em 0;
}

.letters {
  display: inline-block;
  font-size: 7rem;
  font-weight: 900;
  color: #000;
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
  color: #666;
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
  font-size: 1.8rem;
  color: #666;
  margin: 0;
  transform: translateY(30px);
  opacity: 0;
  font-weight: 300;
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .letters {
    font-size: 4rem;
  }

  .ampersand {
    margin: 0 0.5rem;
  }

  .description {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .letters {
    font-size: 3rem;
  }

  .description {
    font-size: 1rem;
  }
}
</style> 