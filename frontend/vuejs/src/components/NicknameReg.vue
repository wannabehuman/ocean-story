<template>
  <div class="wrap n-name">


    <!-- NICKNAME WRAP -->
    <div class="n-name-wrap">


      <!-- TITLE -->
      <p class="n-name-tit">닉네임 등록하기</p>


      <!-- INPUT -->
      <div class="ipt-n-name">

        <input type="text" v-model="nickname">

      </div>
      <!-- INPUT // -->


      <!-- SUB TEXT -->
      <div class="n-name-stxt">
        강태공님의 닉네임을 입력해주세요.<br>
        입력하신 닉네임은 랭킹 등록 시 사용 됩니다.
      </div>
      <!-- SUB TEXT // -->


      <!-- BUTTON -->
      <button type="button" class="n-name-btn" @click="registerNickname">등록하기</button>


    </div>
    <!-- NICKNAME WRAP // -->


  </div>
</template>

<script>
import '@/assets/css/NicknameReg.css';
export default {
  name: 'NickNameReg',
  data() {
    return {
      nickname: ''
    }
  },
  methods: {
    async registerNickname() {
      if (!this.nickname) {
        alert('닉네임을 입력해주세요!');
        return;
      }
      try {
        // 1. 닉네임 중복 검사
        let isDuplicate = false;
        try {
          const checkResponse = await fetch(`${process.env.VUE_APP_API_URL}/api/ranking/${this.nickname}`);
          if (checkResponse.ok) {
            const existingUser = await checkResponse.json();
            // 응답이 객체이고 user_nm 속성이 있으면 중복으로 판단
            isDuplicate = existingUser && existingUser.user_nm === this.nickname;
          }
        } catch (error) {
          console.log('중복 검사 실패, 등록 계속 진행:', error);
          // 중복 검사 실패해도 등록 진행
        }
        
        if (isDuplicate) {
          alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해주세요.');
          return;
        }

        // 2. 랭킹 API 호출
        console.log('랭킹 API 호출 시작...');
        const rankingResponse = await fetch(`${process.env.VUE_APP_API_URL}/api/ranking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_nm: this.nickname })
        });

        if (!rankingResponse.ok) {
          console.error('랭킹 API 오류:', await rankingResponse.text());
          throw new Error('랭킹 서버 오류');
        }
        console.log('랭킹 API 호출 성공!');

        // 3. 어종 미션 API 호출
        console.log('어종 미션 API 호출 시작...');
        const missionResponse = await fetch(`${process.env.VUE_APP_API_URL}/api/fish-mission`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_nm: this.nickname })
        });

        if (!missionResponse.ok) {
          console.error('어종 미션 등록 오류:', await missionResponse.text());
          // 미션 등록 실패해도 닉네임 등록은 성공으로 처리
        } else {
          console.log('어종 미션 API 호출 성공!');
        }

        // 등록한 닉네임 저장
        const registeredNickname = this.nickname;
        
        // 입력 필드 초기화
        this.nickname = '';
        
        // 성공 메시지 표시
        alert('닉네임이 등록되었습니다! 잠시 후 미션 화면으로 이동합니다.');
        
        // 2초 지연 후 미션 페이지로 리다이렉트
        setTimeout(() => {
          this.$router.push(`/fishMission?nickname=${encodeURIComponent(registeredNickname)}`);
        }, 1000);
      } catch (e) {
        console.error('등록 중 오류:', e);
        alert('등록 중 오류가 발생했습니다: ' + e.message);
      }
    }
  },
}
</script>
