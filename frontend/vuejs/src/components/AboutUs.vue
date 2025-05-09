<template>
  <div class="about-container">
    <div class="title-section">
      <div class="title-wrapper">
        <h1 class="main-title">주변의 <span class="highlight">진짜 문제</span>를 살펴보자</h1>
      </div>
    </div>

    <div class="content-section">
      <div class="section-card" id="section-1">
        <div class="card-content">
          <div class="text-section">
            <div class="text-content">
              <span class="section-number">01</span>
              <h2 class="section-title">우리 커뮤니티, <span class="highlight">씨리얼</span>은 이렇게 시작했어요</h2>
              <div class="description-container">
                <p class="section-description">
                  처음은 서로가 모르는 부분을 채워주는 사내 스터디 성격의 작은 동아리였습니다.<br>그치만 단순히 공부만 하긴 지겨웠달까요.
                </p>
                <p class="section-description">
                  올해 1월, 팀원들끼리 카페에서 만났습니다. 조그만 사이드 프로젝트라도 좋으니 일상에서 불편한 부분, 바꿨으면 하는 부분들을 하나씩 만들어보자고 입을 모아 말했어요.
                </p>
                <p class="section-description">
                  아마도 이때가 저희 첫 <span class="highlight-text">작당(?) 모의</span>가 아녔을까 싶어요.<br>그렇게 작당 모의를 하며 여러 아이디어를 모으고 기획하던 중 <span class="highlight-text">청년 작당소</span>를 만났어요.
                </p>
                <p class="section-description">
                  부산에서 주어진 인프라 만으로 재밌게 지내보려는 청년 커뮤니티가 있었다는게 기뻤습니다.<br>성인이 되고서도 이렇게 <span class="highlight">'재미'</span>를 찾아다니는 사람들을 보는게 기분이 묘하더라고요.
                </p>
                <p class="section-description">
                  여기 놀러온 여러분도 재밌었으면 좋겠어요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section-card" id="section-2">
        <div class="card-content">
          <div class="text-section">
            <div class="text-content">
              <span class="section-number">02</span>
              <h2 class="section-title">우리 커뮤니티의 <span class="highlight">지향점</span></h2>
              <div class="description-container">
                <p class="section-description">
                  우리의 목표는 <strong class="emphasis-box">"우리 주변의 작은 문제를 가지고 있는 '기술'로 재밌게 풀어나가보자"</strong> 입니다. 그 시작은 낚시에 필요한 정보를 귀엽게 보여주는 이번 <span class="highlight">오션스토리</span> 프로젝트 였습니다.
                </p>
                <p class="section-description">
                  이번 작당 이후에는 <span class="highlight-text">선거보도모니터링 시스템</span>이나 <span class="highlight-text">병원 차트 프로그램</span> 등 여러 방향을 두고 고민하고 있어요.
                </p>
                <p class="section-description">
                  그러나 여기 커뮤니티에서 만난 사람들과 나눈 대화로 <span class="highlight">재밌는 것</span>을 해보고 싶어요.
                </p>
                <p class="section-description">
                  이 작당 모의의 끝은 어떨지 모르겠지만, 일단은 <span class="highlight">재밌었으면</span> 좋겠습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section-card" id="section-3">
        <div class="card-content">
          <div class="text-section">
            <div class="text-content">
              <span class="section-number">03</span>
              <h2 class="section-title">우리 <span class="highlight">한번 이야기</span>해봐요</h2>
              <div class="description-container">
                <p class="section-description">
                  혹시 우리 <span class="highlight">강태공</span> 님은 <span class="highlight-text">부산</span>에 살면서 어떤게 가장 불편하셨을까요? <strong class="emphasis-box">특히, 어떤 서비스가 있으면 좋을까요?</strong> 같이 고민해봐요! 이메일 혹은 인스타 DM을 보내주세요! 한번 이야기 나눠봐요.
                </p>
                <div class="contact-info">
                  <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>dogfeet14@gmail.com</span>
                  </div>
                  <div class="contact-item">
                    <i class="fab fa-instagram"></i>
                    <span>21kikik</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  mounted() {
    this.initSectionAnimations();
  },
  methods: {
    initSectionAnimations() {
      const sections = ['#section-1', '#section-2', '#section-3'];
      
      sections.forEach((section, index) => {
        const content = `${section} .card-content`;
        const titleEl = `${section} .section-title`;
        const numberEl = `${section} .section-number`;
        const descItems = `${section} .section-description`;
        const contactInfo = `${section} .contact-info`;
        
        // 초기 상태 설정
        gsap.set(content, { 
          opacity: 0,
          y: 50,
          scale: 0.95
        });
        
        gsap.set(titleEl, {
          opacity: 0,
          x: index % 2 === 0 ? -30 : 30
        });
        
        gsap.set(numberEl, {
          opacity: 0,
          scale: 1.5
        });
        
        gsap.set(descItems, {
          opacity: 0,
          y: 20,
          stagger: 0.1
        });
        
        if (contactInfo) {
          gsap.set(contactInfo, {
            opacity: 0,
            y: 20
          });
        }

        // ScrollTrigger 설정
        ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          once: true,
          onEnter: () => {
            // 카드 컨텐츠 애니메이션
            gsap.to(content, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power2.out"
            });
            
            // 타이틀 애니메이션
            gsap.to(titleEl, {
              opacity: 1,
              x: 0,
              duration: 0.7,
              delay: 0.1,
              ease: "back.out(1.4)"
            });
            
            // 번호 애니메이션
            gsap.to(numberEl, {
              opacity: 0.3,
              scale: 1,
              duration: 0.6,
              delay: 0.2,
              ease: "elastic.out(1, 0.5)"
            });
            
            // 설명 텍스트 애니메이션 (순차적으로)
            gsap.to(descItems, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              delay: 0.3,
              ease: "power1.out"
            });
            
            // 연락처 정보 애니메이션 (있는 경우)
            if (contactInfo) {
              gsap.to(contactInfo, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.6,
                ease: "power1.out"
              });
            }
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.about-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(205, 236, 250, 0.7) 0%, rgba(225, 245, 254, 0.7) 100%);
  overflow-x: hidden;
  padding-bottom: 2rem;
}

.title-section {
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: transparent;
  margin-bottom: 2rem;
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.main-title,
.main-title-bottom {
  font-size: 4rem;
  font-weight: 700;
  color: #0455BF;
  text-align: center;
  margin: 0;
  word-break: keep-all;
  line-height: 1.2;
}

.highlight {
  color: #0cbff5;
  font-weight: 800;
  text-shadow: 0 0 1px rgba(12, 191, 245, 0.3);
}

.highlight-text {
  background: linear-gradient(90deg, rgba(4, 85, 191, 0.08) 0%, rgba(4, 85, 191, 0.16) 100%);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-weight: 600;
}

.emphasis-box {
  display: block;
  background-color: rgba(4, 85, 191, 0.08);
  border-left: 3px solid #0455BF;
  padding: 0.8rem 1rem;
  margin: 0.8rem 0;
  border-radius: 0 4px 4px 0;
  font-weight: 600;
  font-size: 1.15rem;
  line-height: 1.6;
}

.content-section {
  padding: 0 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;
  background: transparent;
}

.section-card {
  position: relative;
  overflow: visible;
  width: 100%;
  margin-bottom: 2rem;
}

.card-content {
  position: relative;
  background: #ffffff;
  border: none;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(4, 85, 191, 0.08);
  height: 100%;
  overflow: hidden;
  width: 100%;
}

.text-section {
  position: relative;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-content {
  position: relative;
}

.description-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-number {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 1.5rem;
  color: #0455BF;
  font-weight: 800;
  opacity: 0.3;
}

.section-title {
  font-size: 2.5rem;
  color: #0455BF;
  margin: 0 0 1.5rem 0;
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  word-break: keep-all;
}

.section-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin: 0;
  word-break: keep-all;
  text-align: left;
}

.contact-info {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
  color: #0455BF;
}

.contact-item i {
  font-size: 1.3rem;
  opacity: 0.8;
}

@media (max-width: 1024px) {
  .title-section {
    height: 30vh;
  }
  
  .main-title,
  .main-title-bottom {
    font-size: 3.5rem;
  }

  .content-section {
    padding: 0 2rem 3rem;
  }

  .text-section {
    padding: 2rem;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .section-description {
    font-size: 1rem;
  }
  
  .emphasis-box {
    font-size: 1.05rem;
    padding: 0.7rem 0.9rem;
  }
}

@media (max-width: 768px) {
  .title-section {
    height: 25vh;
    padding: 0 1rem;
  }
  
  .main-title,
  .main-title-bottom {
    font-size: 2.5rem;
  }

  .text-section {
    padding: 1.5rem;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin: 0 0 1rem 0;
  }
  
  .section-description {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .contact-item {
    font-size: 1rem;
  }
  
  .emphasis-box {
    font-size: 1rem;
    padding: 0.6rem 0.8rem;
    margin: 0.6rem 0;
  }
}
</style> 