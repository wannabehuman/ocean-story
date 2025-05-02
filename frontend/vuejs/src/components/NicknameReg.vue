<template>
  <div class="wrap n-name">


    <!-- NICKNAME WRAP -->
    <div class="n-name-wrap">


      <!-- TITLE -->
      <p class="n-name-tit">닉네임 등록하기</p>


      <!-- INPUT -->
      <div class="ipt-n-name">

        <input type="text">

      </div>
      <!-- INPUT // -->


      <!-- SUB TEXT -->
      <div class="n-name-stxt">
        강태공님의 닉네임을 입력해주세요.<br>
        입력하신 닉네임은 랭킹 등록 시 사용 됩니다.
      </div>
      <!-- SUB TEXT // -->


      <!-- BUTTON -->
      <button type="button" class="n-name-btn">등록하기</button>


    </div>
    <!-- NICKNAME WRAP // -->


  </div>
</template>

<script>
import '@/assets/css/NicknameReg.css';
export default {
  name: 'NickNameReg',
  data() {
    return {}
  },
}
</script>