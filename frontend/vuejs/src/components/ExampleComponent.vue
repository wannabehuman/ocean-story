<template>
    <div>
      <h1>{{ message }}</h1>
      <!-- <h2>{{ 윤정서체크체크 }}</h2> -->
      <!-- <h2>{{ getHello }}</h2> -->
      <!-- <h2>{{ dbTest }}</h2> -->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: '',
        윤정서체크체크:'윤정서 체크체크',
        dbTest : '',
        getHello:''
      };
    },
    mounted() {
      axios.get('http://localhost:3000/api/data')
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          console.error('상세 에러 정보:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
          });
          // 사용자에게 에러 메시지 표시
          this.message = '데이터를 불러오는데 실패했습니다';
        });

      // axios.get('http://localhost/api/data')
      //   .then(response => {
      //     this.message = response.data.message;  // 응답 데이터 설정
      //   })
      //   .catch(error => {
      //     console.error('There was an error!', error);
      //   });
      //   axios.get('http://localhost/api')
      //   .then(response => {
      //     this.getHello = response.data;  // 응답 데이터 설정
      //   })
      //   .catch(error => {
      //     console.error('There was an error!', error);
      //   });
      // axios.get('http://localhost/api/visit')
      //   .then(response => {
      //     this.dbTest = response.data;  // 응답 데이터 설정
      //   })
      //   .catch(error => {
      //     console.error('There was an error!', error);
      //   });
      },
  };
  </script>