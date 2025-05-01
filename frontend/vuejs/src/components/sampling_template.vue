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
        .to('.line', {
          opacity: 1,
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out"
        }, '-=0.3')
        .to('.description', {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out"
        }, '-=0.2');
        
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
        
        // 낚시 이미지에 호버 효과 추가
        const fishingImage = document.querySelector('.fishing-image');
        fishingImage.addEventListener('mouseenter', () => {
          gsap.to(fishingImage, {
            scale: 1.02,
            duration: 0.5,
            ease: "power1.out"
          });
        });
        
        fishingImage.addEventListener('mouseleave', () => {
          gsap.to(fishingImage, {
            scale: 1,
            duration: 0.5,
            ease: "power1.out"
          });
        });
        
        // 텍스트 애니메이션
        const letters = document.querySelectorAll('.letters');
        letters.forEach(letter => {
          gsap.to(letter, waveEffect);
        });
        
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
    /* opacity: 0.7; */
    height: 60%;  
    background: #0cbff5;
  
  }
  
  .wave2 {
    z-index: 2;
    /* opacity: 0.5; */
    height: 80%;
    background: #6ddcf8;
  
  }
  
  .wave3 {
    z-index: 1;
    /* opacity: 0.3; */
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
    color: #666;
    margin: 0;
    transform: translateY(30px);
    opacity: 0;
    font-weight: 300;
    letter-spacing: 0.1em;
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
  }
  </style> 