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
        const response = await fetch('/api/ranking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_nm: this.nickname })
        });

        if (!response.ok) {
          throw new Error('서버 오류');
        }

        alert('닉네임이 등록되었습니다!');
        this.nickname = '';
      } catch (e) {
        alert('등록 중 오류가 발생했습니다.');
      }
    }
  },
}
</script>
