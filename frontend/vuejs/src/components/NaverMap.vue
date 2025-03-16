<template>
    <!-- 지도가 표시될 영역 -->
    <div ref="mapRef" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script>
  /* global naver */
  export default {
    name: "NaverMap",
    data() {
      return {
        map: null, // naver.maps.Map 인스턴스 보관용
      };
    },
    mounted() { //마운트 시점에서 네이버지도 스크립트 로딩 확인하고 initmap으로 지도생성
      if (window.naver && window.naver.maps) {
        this.initMap();
      } else {
        console.error("Naver Maps script not loaded or invalid clientId");
      }
    },
    methods: {
      initMap() {
        const mapOptions = {
          center: new naver.maps.LatLng(37.3595704, 127.105399), // 부산시청좌표 -> 현재 위치로는 api를 따로 받는 작업을 해야할듯합니다 버튼누르든지 해서
          zoom: 10, //줌크기
        };
  
        // naver.maps.Map 인스턴스 생성
        this.map = new naver.maps.Map(this.$refs.mapRef, mapOptions);
      },
      addMarker(lat, lng) {
        // 지도 위에 마커 찍기
        new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map: this.map,
        });
      },
    },
  };
  </script>

  