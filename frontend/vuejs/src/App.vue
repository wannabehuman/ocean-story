<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'HakgyoansimDunggeunmisoTTF-B';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

/* 전역 스타일 */
body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}



/* Chrome, Edge, Safari */
::-webkit-scrollbar {
  width: 15px; /* 세로 스크롤바 너비 */
  height: 12px; /* 가로 스크롤바 높이 */
}

::-webkit-scrollbar-track {
  background: #f0f0f0; /* 트랙 색상 */
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #999; /* 손잡이 색상 */
  border-radius: 10px;
  border: 2px solid #f0f0f0; /* 안쪽 테두리로 마진 느낌 */
}

::-webkit-scrollbar-thumb:hover {
  background: #666; /* 마우스 오버 시 */
}

/* Firefox */


</style>