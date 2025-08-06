<template>
  <div class="chatbot-container">
    <div 
      v-if="!isOpen" 
      class="chatbot-icon" 
      @click="toggleChat"
      title="AI 챗봇"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12h8m-8 4h6m2-10V4a2 2 0 00-2-2H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h14l4 4V8a2 2 0 00-2-2h-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <div v-if="isOpen" class="chat-window">
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
import axios from 'axios'

export default {
  name: 'ChatBot',
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
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
      if (this.isOpen && this.messages.length === 0 && this.apiKey) {
        this.addWelcomeMessage()
      }
    },
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
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: '당신은 도움이 되는 AI 어시스턴트입니다. 간결하고 친근하게 답변해주세요. 낚시 관련 질문에 대해 답변해주세요.'
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.chatbot-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
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