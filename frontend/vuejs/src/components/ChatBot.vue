<template>
  <div class="chatbot-container">
    <div 
      v-if="!isOpen" 
      class="chatbot-icon" 
      @click="toggleChat"
      @mouseenter="onHover"
      @mouseleave="onHoverOut"
      title="AI 챗봇"
      ref="chatIcon"
    >
     <img src="@/assets/chat_icon02.png" width="60" height="60" alt="AI 챗봇 아이콘" ref="fishIcon" />
    </div>

    <div v-if="isOpen" class="chat-window" ref="chatWindow">
      <div class="chat-header">
        <h3>AI 챗봇</h3>
        <button @click="toggleChat" class="close-btn">&times;</button>
      </div>

      <div class="api-key-section" v-if="!apiKey">
        <div class="api-input-container">
          <label for="apiKeyInput">API 키를 입력하세요:</label>
          <input width="100%"
            id="apiKeyInput"
            v-model="tempApiKey" 
            type="text" 
            placeholder="OpenAI API 키 입력"
            @keyup.enter="saveApiKey"
          />
          <button @click="saveApiKey" :disabled="!tempApiKey">저장</button>
        </div>
      </div>

      <div v-else class="chat-content">
        <div class="messages-container" ref="messagesContainer">
          <div 
            v-for="message in messages" 
            :key="message.id"
            :class="['message', message.role]"
          >
            <div class="message-content">{{ message.content }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
          <div v-if="isLoading" class="message ai">
            <div class="message-content typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <div class="input-container">
          <input 
            v-model="userInput" 
            type="text" 
            placeholder="메시지를 입력하세요..."
            @keyup.enter="sendMessage"
            :disabled="isLoading"
          />
          <button 
            @click="sendMessage" 
            :disabled="!userInput.trim() || isLoading"
            class="send-btn"
          >
            전송
          </button>
        </div>

        <div class="api-key-controls">
          <button @click="clearApiKey" class="clear-api-btn">API 키 변경</button>
          <button @click="clearMessages" class="clear-messages-btn">대화 초기화</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { gsap } from 'gsap';

export default {
  name: 'ChatBot',
  props: {
    location: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isOpen: false,
      apiKey: '',
      tempApiKey: '',
      userInput: '',
      isLoading: false,
      messages: [],
      messageId: 1
    }
  },
  mounted() {
    this.loadApiKey()
    this.loadMessages()
    this.initFishAnimation()
  },
  methods: {
    saveApiKey() {
      if (this.tempApiKey.trim()) {
        this.apiKey = this.tempApiKey.trim()
        localStorage.setItem('chatbot_api_key', this.apiKey)
        this.tempApiKey = ''
        this.addWelcomeMessage()
      }
    },
    clearApiKey() {
      this.apiKey = ''
      this.tempApiKey = ''
      localStorage.removeItem('chatbot_api_key')
      this.messages = []
      this.saveMessages()
    },
    loadApiKey() {
      const savedKey = localStorage.getItem('chatbot_api_key')
      if (savedKey) {
        this.apiKey = savedKey
      }
    },
    addWelcomeMessage() {
      this.addMessage('안녕하세요! AI 챗봇입니다. 무엇을 도와드릴까요?', 'ai')
    },
    async sendMessage() {
      if (!this.userInput.trim() || this.isLoading) return

      const userMessage = this.userInput.trim()
      this.addMessage(userMessage, 'user')
      this.userInput = ''
      this.isLoading = true

      try {
        // 메시지 전송 시 물고기 반짝임 효과
        this.flashFishIcon()
        
        const response = await this.callOpenAI(userMessage)
        this.addMessage(response, 'ai')
      } catch (error) {
        console.error('AI API 호출 오류:', error)
        this.addMessage('죄송합니다. 오류가 발생했습니다. API 키를 확인하거나 잠시 후 다시 시도해주세요.', 'ai')
      } finally {
        this.isLoading = false
      }
    },
    async callOpenAI(message) {
      try {
        const systemMessage = await this.getFishingRecommendationContext(message);
        console.log(systemMessage)
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemMessage
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        }, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        })

        return response.data.choices[0].message.content
      } catch (error) {
        if (error.response?.status === 401) {
          throw new Error('API 키가 유효하지 않습니다.')
        }
        throw error
      }
    },
    addMessage(content, role) {
      const message = {
        id: this.messageId++,
        content,
        role,
        timestamp: new Date()
      }
      this.messages.push(message)
      this.saveMessages()
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    clearMessages() {
      this.messages = []
      this.saveMessages()
      this.addWelcomeMessage()
    },
    saveMessages() {
      localStorage.setItem('chatbot_messages', JSON.stringify(this.messages))
    },
    loadMessages() {
      const savedMessages = localStorage.getItem('chatbot_messages')
      if (savedMessages) {
        this.messages = JSON.parse(savedMessages).map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }
    },
    formatTime(timestamp) {
      return timestamp.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    async getFishingRecommendationContext(message) {
      const isFishingRelated = this.checkIfFishingRelated(message);
      
      if (isFishingRelated) {
        const targetDate = this.extractDateFromMessage(message);
        const dateInfo = this.getDateInfo(targetDate);
        const weatherData = await this.getWeatherDataForDate(targetDate);
        const tideData = await this.getTideDataForDate(targetDate);
        
        const locationName = this.location?.label || '부산';
        
        return `당신은 낚시 전문가 AI 어시스턴트입니다. ${locationName} 지역의 ${dateInfo.displayText} 날씨와 조류 정보를 바탕으로 낚시 추천을 제공해주세요.

📍 지역: ${locationName}
📅 날짜: ${dateInfo.displayText}

🌤️ 날씨 정보:
- 기온: ${weatherData.temperature}°C
- 풍속: ${weatherData.windSpeed}m/s
- 풍향: ${weatherData.windDirection}°
- 강수량: ${weatherData.precipitation}mm
- 수온: ${weatherData.seaTemperature}°C
- 파고: ${weatherData.waveHeight}m

🌊 조류 정보:
- 만조 시간: ${tideData.highTide}
- 간조 시간: ${tideData.lowTide}

낚시 추천 기준:
1. 좋은 조건:
   - 풍속 3-7m/s (적당한 바람)
   - 수온 15-25°C
   - 강수량 0-5mm
   - 파고 1m 이하
   - 만조/간조 전후 1-2시간

2. 나쁜 조건:
   - 풍속 10m/s 이상 (강풍)
   - 강수량 10mm 이상
   - 파고 2m 이상

위 정보를 바탕으로 ${dateInfo.displayText} 낚시에 대한 친근하고 상세한 추천을 제공해주세요.`;
      } else {
        return '당신은 도움이 되는 AI 어시스턴트입니다. 간결하고 친근하게 답변해주세요. 낚시 관련 질문에 대해 답변해주세요.';
      }
    },
    checkIfFishingRelated(message) {
      const fishingKeywords = ['낚시', '바다', '고기', '물고기', '낚다', '추천', '조황', '언제', '좋은지', '날씨', '바람', '조류'];
      return fishingKeywords.some(keyword => message.includes(keyword));
    },
    extractDateFromMessage(message) {
      const today = new Date();
      
      // 오늘, 지금, 현재
      if (message.includes('오늘') || message.includes('지금') || message.includes('현재')) {
        return today;
      }
      
      // 내일
      if (message.includes('내일')) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow;
      }
      
      // 모레
      if (message.includes('모레')) {
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2);
        return dayAfterTomorrow;
      }
      
      // n일 후 패턴 (예: 3일 후, 일주일 후)
      const daysAfterMatch = message.match(/(\d+)일?\s*후/);
      if (daysAfterMatch) {
        const daysToAdd = parseInt(daysAfterMatch[1]);
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + daysToAdd);
        return futureDate;
      }
      
      // 일주일 후, 1주일 후
      if (message.includes('일주일') || message.includes('1주일')) {
        const oneWeekLater = new Date(today);
        oneWeekLater.setDate(today.getDate() + 7);
        return oneWeekLater;
      }
      
      // 특정 날짜 패턴 (YYYY-MM-DD, MM-DD, MM/DD 등)
      const datePatterns = [
        /(\d{4})-(\d{1,2})-(\d{1,2})/,  // 2024-08-15
        /(\d{1,2})-(\d{1,2})/,          // 08-15 (올해)
        /(\d{1,2})\/(\d{1,2})/,         // 8/15 (올해)
        /(\d{1,2})월\s*(\d{1,2})일?/     // 8월 15일
      ];
      
      for (const pattern of datePatterns) {
        const match = message.match(pattern);
        if (match) {
          let year, month, day;
          
          if (pattern.source.includes('\\d{4}')) {
            // YYYY-MM-DD 형식
            year = parseInt(match[1]);
            month = parseInt(match[2]) - 1; // Date는 0부터 시작
            day = parseInt(match[3]);
          } else if (pattern.source.includes('월')) {
            // N월 N일 형식
            year = today.getFullYear();
            month = parseInt(match[1]) - 1;
            day = parseInt(match[2]);
          } else {
            // MM-DD, MM/DD 형식
            year = today.getFullYear();
            month = parseInt(match[1]) - 1;
            day = parseInt(match[2]);
          }
          
          const targetDate = new Date(year, month, day);
          // 과거 날짜인 경우 내년으로 설정
          if (targetDate < today) {
            targetDate.setFullYear(year + 1);
          }
          return targetDate;
        }
      }
      
      // 기본값: 오늘
      return today;
    },
    getDateInfo(date) {
      const today = new Date();
      const diffTime = date.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const options = { month: 'long', day: 'numeric', weekday: 'long' };
      const formatDate = date.toLocaleDateString('ko-KR', options);
      
      let displayText;
      if (diffDays === 0) {
        displayText = '오늘';
      } else if (diffDays === 1) {
        displayText = '내일';
      } else if (diffDays === 2) {
        displayText = '모레';
      } else if (diffDays > 2) {
        displayText = `${diffDays}일 후 (${formatDate})`;
      } else {
        displayText = formatDate;
      }
      
      return {
        date,
        displayText,
        diffDays,
        formatDate
      };
    },
    async getWeatherDataForDate(targetDate) {
      try {
        // Props로 받은 위치 정보 사용, 없으면 기본값 (부산)
        const lat = this.location?.latitude || 35.1796;
        const lon = this.location?.longitude || 129.0756;
        const dateStr = targetDate.toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];
        
        // 오늘인 경우 실시간 데이터 + 예보 데이터 조합
        if (dateStr === today) {
          // 현재 실시간 데이터
          const currentUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m&timezone=Asia%2FSeoul`;
          const currentResponse = await fetch(currentUrl);
          const currentData = await currentResponse.json();
          
          // 오늘 예보 데이터 (강수량 총합을 위해)
          const dailyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum&timezone=Asia%2FSeoul&start_date=${dateStr}&end_date=${dateStr}`;
          const dailyResponse = await fetch(dailyUrl);
          const dailyData = await dailyResponse.json();
          
          // 해양 데이터
          const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=sea_surface_temperature,wave_height&timezone=Asia%2FSeoul`;
          const marineResponse = await fetch(marineUrl);
          const marineData = await marineResponse.json();
          
          return {
            temperature: currentData.current?.temperature_2m || '알 수 없음',
            windSpeed: currentData.current?.wind_speed_10m || '알 수 없음',
            windDirection: currentData.current?.wind_direction_10m || '알 수 없음',
            precipitation: dailyData.daily?.precipitation_sum?.[0] || currentData.current?.precipitation || '0',
            seaTemperature: marineData.current?.sea_surface_temperature || '알 수 없음',
            waveHeight: marineData.current?.wave_height || '알 수 없음'
          };
        } else {
          // 미래 날짜는 예보 데이터
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&timezone=Asia%2FSeoul&start_date=${dateStr}&end_date=${dateStr}`;
          
          const weatherResponse = await fetch(url);
          const weatherData = await weatherResponse.json();
          
          // 해양 데이터
          const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&daily=sea_surface_temperature_max,wave_height_max&timezone=Asia%2FSeoul&start_date=${dateStr}&end_date=${dateStr}`;
          const marineResponse = await fetch(marineUrl);
          const marineData = await marineResponse.json();
          
          const daily = weatherData.daily;
          const marinDaily = marineData.daily;
          
          if (daily && daily.time && daily.time.length > 0) {
            return {
              temperature: `${daily.temperature_2m_min[0]}~${daily.temperature_2m_max[0]}`,
              windSpeed: daily.windspeed_10m_max[0] || '알 수 없음',
              windDirection: daily.winddirection_10m_dominant[0] || '알 수 없음',
              precipitation: daily.precipitation_sum[0] || '0',
              seaTemperature: marinDaily?.sea_surface_temperature_max?.[0] || '알 수 없음',
              waveHeight: marinDaily?.wave_height_max?.[0] || '알 수 없음'
            };
          } else {
            throw new Error('예보 데이터 없음');
          }
        }
      } catch (error) {
        console.error('날씨 데이터 불러오기 실패:', error);
        return {
          temperature: '알 수 없음',
          windSpeed: '알 수 없음',
          windDirection: '알 수 없음',
          precipitation: '0',
          seaTemperature: '알 수 없음',
          waveHeight: '알 수 없음'
        };
      }
    },
    async getTideDataForDate(targetDate) {
      try {
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        // Props로 받은 위치 정보의 지역 코드 사용, 없으면 기본값 (가덕도)
        const locationCode = this.location?.value || 'DT_0063';
        const response = await fetch(`${process.env.VUE_APP_API_URL || 'http://localhost:8080'}/api/sea-tides/${year}/${month}/${locationCode}`);
        const tideData = await response.json();
        
        const targetDateStr = `${year}-${month}-${String(targetDate.getDate()).padStart(2, '0')}`;
        const dayTide = tideData.find(tide => tide.tideDate === targetDateStr);
        
        if (dayTide) {
          const highTides = [];
          const lowTides = [];
          
          if (dayTide.first_high_tide_time) {
            highTides.push(`${dayTide.first_high_tide_time.slice(0, 5)} (${dayTide.first_high_tide}cm)`);
          }
          if (dayTide.second_high_tide_time) {
            highTides.push(`${dayTide.second_high_tide_time.slice(0, 5)} (${dayTide.second_high_tide}cm)`);
          }
          
          if (dayTide.first_low_tide_time) {
            lowTides.push(`${dayTide.first_low_tide_time.slice(0, 5)} (${dayTide.first_low_tide}cm)`);
          }
          if (dayTide.second_low_tide_time) {
            lowTides.push(`${dayTide.second_low_tide_time.slice(0, 5)} (${dayTide.second_low_tide}cm)`);
          }
          
          return {
            highTide: highTides.length > 0 ? highTides.join(', ') : '정보 없음',
            lowTide: lowTides.length > 0 ? lowTides.join(', ') : '정보 없음'
          };
        } else {
          return {
            highTide: '정보 없음',
            lowTide: '정보 없음'
          };
        }
      } catch (error) {
        console.error('조류 데이터 불러오기 실패:', error);
        return {
          highTide: '정보 없음',
          lowTide: '정보 없음'
        };
      }
    },
    // GSAP 애니메이션 메소드들
    initFishAnimation() {
      // 물고기 아이콘의 기본 떠다니는 애니메이션
      if (this.$refs.fishIcon) {
        gsap.set(this.$refs.fishIcon, { transformOrigin: "center center" });
        
        // 더 자연스러운 상하 떠다니는 움직임
        gsap.to(this.$refs.fishIcon, {
          y: -8,
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
        
        // 좌우로 부드럽게 흔들리는 움직임 (물결 효과)
        gsap.to(this.$refs.fishIcon, {
          x: 3,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
        
        // 살짝 회전하며 헤엄치는 느낌
        gsap.to(this.$refs.fishIcon, {
          rotation: 5,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
        
        // 크기가 살짝 변하는 호흡 효과
        gsap.to(this.$refs.fishIcon, {
          scale: 1.05,
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
        
        // 컨테이너 전체도 살짝 떠다니게
        if (this.$refs.chatIcon) {
          gsap.to(this.$refs.chatIcon, {
            y: -3,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      }
    },
    onHover() {
      if (this.$refs.fishIcon) {
        // 호버 시 물고기가 활발해지는 애니메이션
        gsap.to(this.$refs.fishIcon, {
          scale: 1.1,
          rotation: 10,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
        
        // 빠른 물결 효과 (제거 - 배경 없음)
        // gsap.to(this.$refs.chatIcon, {
        //   boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
        //   duration: 0.3
        // });
      }
    },
    onHoverOut() {
      if (this.$refs.fishIcon) {
        // 호버 해제 시 원래대로
        gsap.to(this.$refs.fishIcon, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "power2.out"
        });
        
        // gsap.to(this.$refs.chatIcon, {
        //   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        //   duration: 0.3
        // });
      }
    },
    toggleChat() {
      // 클릭 시 물고기가 점프하는 애니메이션
      if (!this.isOpen && this.$refs.fishIcon) {
        gsap.to(this.$refs.fishIcon, {
          y: -15,
          rotation: 15,
          scale: 0.9,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(this.$refs.fishIcon, {
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 0.3,
              ease: "bounce.out"
            });
          }
        });
      }
      
      if (this.isOpen) {
        // 채팅창 닫기 애니메이션
        this.closeChatWindow()
      } else {
        // 채팅창 열기
        this.isOpen = true
        this.$nextTick(() => {
          this.openChatWindow()
          if (this.messages.length === 0 && this.apiKey) {
            this.addWelcomeMessage()
          }
        })
      }
    },
    openChatWindow() {
      if (this.$refs.chatWindow) {
        // 초기 상태 설정
        gsap.set(this.$refs.chatWindow, {
          scale: 0.8,
          opacity: 0,
          y: 20,
          transformOrigin: "bottom right"
        });
        
        // 나타나는 애니메이션
        gsap.to(this.$refs.chatWindow, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    },
    closeChatWindow() {
      if (this.$refs.chatWindow) {
        gsap.to(this.$refs.chatWindow, {
          scale: 0.8,
          opacity: 0,
          y: 20,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            this.isOpen = false
          }
        });
      }
    },
    flashFishIcon() {
      // 채팅창이 열려있을 때는 아이콘이 없으므로 스킵
      if (this.isOpen || !this.$refs.fishIcon) return
      
      // 물고기 아이콘이 반짝이는 효과
      gsap.to(this.$refs.fishIcon, {
        scale: 1.2,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 3
      });
      
      // 배경도 함께 반짝임 (제거 - 배경 없음)
      // gsap.to(this.$refs.chatIcon, {
      //   boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
      //   duration: 0.1,
      //   ease: "power2.out",
      //   yoyo: true,
      //   repeat: 3,
      //   onComplete: () => {
      //     gsap.to(this.$refs.chatIcon, {
      //       boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      //       duration: 0.3
      //     });
      //   }
      // });
    }
  }
}
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chatbot-icon {
  width: 60px;
  height: 60px;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  /* border-radius: 50%; */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); */
  transition: all 0.3s ease;
}

.chatbot-icon:hover {
  /* transform: scale(1.1); */
  /* box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); */
}

.chat-window {
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.api-key-section {
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.api-input-container {
  width: 100%;
  text-align: center;
}

.api-input-container label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: #333;
}

.api-input-container input {
  /* width: 100%; */
  padding: 10px;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 14px;
  margin-right: 10px;
}

.api-input-container input:focus {
  outline: none;
  border-color: #667eea;
}

.api-input-container button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.3s ease;
}

.api-input-container button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  max-height: 350px;
}

.message {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.message.user {
  align-items: flex-end;
}

.message.ai {
  align-items: flex-start;
}

.message-content {
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.4;
}

.message.user .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.message.ai .message-content {
  background: #f1f3f4;
  color: #333;
}

.message-time {
  font-size: 11px;
  color: #888;
  margin-top: 5px;
  padding: 0 5px;
}

.typing {
  display: flex;
  align-items: center;
  gap: 4px;
}

.typing span {
  width: 6px;
  height: 6px;
  background: #888;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.input-container {
  padding: 15px;
  border-top: 1px solid #e1e5e9;
  display: flex;
  gap: 10px;
}

.input-container input {
  flex: 1;
  padding: 10px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
}

.input-container input:focus {
  border-color: #667eea;
}

.send-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.3s ease;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.api-key-controls {
  padding: 10px 15px;
  border-top: 1px solid #e1e5e9;
  display: flex;
  gap: 10px;
}

.clear-api-btn,
.clear-messages-btn {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.clear-api-btn:hover,
.clear-messages-btn:hover {
  background: #f8f9fa;
  border-color: #999;
}

@media (max-width: 768px) {
  .chatbot-container {
    bottom: 10px;
    right: 10px;
  }
  
  .chat-window {
    width: calc(100vw - 20px);
    height: calc(100vh - 100px);
    max-width: 350px;
    max-height: 500px;
  }
}
</style>