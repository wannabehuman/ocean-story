<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <ExampleComponent msg="Welcome to Your Vue.js App"/> -->
  <div id="temp_wrap">
    <WeatherComponent/>
    <NickNameComponent/>

  </div>


</template>

<script>
// import ExampleComponent from './components/ExampleComponent.vue'; // 초기화면
import WeatherComponent  from './components/weatherSec.vue';  // 날씨 section 
import NickNameComponent from './components/NicknameReg.vue'; // 닉네임 입력



export default {
  name: 'App',
  components: {
    // ExampleComponent, // 초기화면
    WeatherComponent, // 날씨 section
    NickNameComponent, // 닉네임 입력 
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

#temp_wrap {
  width: 100%;
  height: 100%;
  border: 1px solid;
  overflow: auto;
}


@font-face {
    /* font-family: 'HakgyoansimDunggeunmisoTTF-B'; */
    font-family: 'Hakgyoansim';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
  font-family: 'Hakgyoansim';
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
  width : 100vw;
  height: 100vh;
  overflow: hidden;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/* VUE COMMON CSS */
#app {
  width: 100%;
  height: 100%;
}

</style>
