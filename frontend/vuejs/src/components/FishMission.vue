<template>
  <div class="fish-mission-container">
    <div class="mission-header">
      <h2>세상을 낚을 주인공은 당신입니다</h2>
      <div class="nickname-input" v-if="!userNickname">
        <input 
          v-model="inputNickname" 
          placeholder="닉네임을 입력하세요" 
          @keyup.enter="loadUserMission"
        />
        <button @click="loadUserMission">조회</button>
      </div>
      <div class="user-info" v-else>
        <p class="user-nickname">{{ userNickname }}님! 해당 물고기를 잡아오세요!</p>
      </div>
    </div>

    <div class="fish-mission-content" v-if="userMission">
      <div class="fish-types-grid">
        <div 
          class="fish-type-card" 
          v-for="(typeName, key) in fishTypeNames" 
          :key="key"
          :class="{ 'completed': userMission[key] === 'Y' }"
        >
          <div class="fish-icon">
            <img :src="fishTypeIcons[key]" :alt="typeName">

          </div>
          <div class="fish-type-info">
            <p class="fish-type-name">{{ typeName }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="hasSearched" class="no-mission">
      <p>{{ inputNickname || userNickname }}님의 어종 미션 정보가 없습니다.</p>
    </div>

    <div v-else-if="!userNickname" class="instruction">
      <p>닉네임을 입력하여 어종 미션 상태를 확인하세요.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FishMission',
  data() {
    return {
      userNickname: this.$route.query.nickname || this.$route.params.nickname,
      inputNickname: '',
      userMission: null,
      hasSearched: false,
      fishTypeNames: {
        fish_type1: '',
        fish_type2: '',
        fish_type3: '',
        fish_type4: '',
        fish_type5: ''
      },
      fishTypeIcons: {
        fish_type1: 'https://via.placeholder.com/150?text=고등어',
        fish_type2: 'https://via.placeholder.com/150?text=갈치',
        fish_type3: 'https://via.placeholder.com/150?text=문어',
        fish_type4: 'https://via.placeholder.com/150?text=오징어',
        fish_type5: 'https://via.placeholder.com/150?text=광어'
      }
    };
  },
  created() {
    // URL에서 쿼리 스트링 또는 경로 파라미터 확인
    const nickname = this.$route.query.nickname || this.$route.params.nickname;
    if (nickname) {
      this.userNickname = nickname;
      this.loadUserMissionByNickname(nickname);
    }
  },
  mounted() {
    this.loadUserMissionByNickname(this.userNickname);
  },
  methods: {
    async loadUserMission() {
      if (!this.inputNickname.trim()) {
        alert('닉네임을 입력해주세요');
        return;
      }
      
      this.loadUserMissionByNickname(this.inputNickname);
    },
    
    async loadUserMissionByNickname(nickname) {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/fish-mission/${nickname}`);
        if (response.data) {
          console.log(response.data);
          this.userMission = response.data;
          this.userNickname = nickname;
          
          this.fishTypeNames = {
            fish_type1: response.data.fish_type1,
            fish_type2: response.data.fish_type2,
            fish_type3: response.data.fish_type3,
            fish_type4: response.data.fish_type4,
            fish_type5: response.data.fish_type5
          };
          
        //   if (this.$router && this.$route.query.nickname !== nickname) {
        //     this.$router.push({
        //       path: '/fishMission',
        //       query: { nickname: nickname }
        //     });
        //   }
        } else {
          this.userMission = null;
        }
        this.hasSearched = true;
      } catch (error) {
        console.error('어종 미션 정보 로드 실패:', error);
        this.userMission = null;
        this.hasSearched = true;
      }
    }
  }
};
</script>

<style scoped>
.fish-mission-container {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.mission-header {
  text-align: center;
  margin-bottom: 30px;
}

.mission-header h2 {
  color: #0455BF;
  font-size: 2rem;
  margin-bottom: 15px;
}

.nickname-input {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
}

.nickname-input input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 250px;
}

.nickname-input button {
  padding: 8px 16px;
  background-color: #0455BF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.nickname-input button:hover {
  background-color: #034090;
}

.user-info {
  margin-top: 15px;
}

.user-nickname {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.completion-info {
  font-size: 1rem;
  color: #0455BF;
  font-weight: bold;
}

.fish-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.fish-type-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;
}

.fish-type-card:hover {
  transform: translateY(-5px);
}

.fish-type-card.completed {
  border: 2px solid #4CAF50;
  background-color: rgba(76, 175, 80, 0.05);
}

.fish-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.fish-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fish-status {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
  border-radius: 0 0 0 8px;
  font-size: 12px;
  font-weight: bold;
}

.status-complete {
  background-color: #4CAF50;
  color: white;
}

.status-incomplete {
  background-color: #F44336;
  color: white;
}

.fish-type-info {
  text-align: center;
  width: 100%;
}

.fish-type-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.no-mission, .instruction {
  text-align: center;
  margin: 50px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.no-mission p, .instruction p {
  font-size: 18px;
  color: #666;
}

@media (max-width: 768px) {
  .fish-types-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .fish-icon {
    width: 100px;
    height: 100px;
  }
  
  .nickname-input input {
    width: 180px;
  }
}
</style>
