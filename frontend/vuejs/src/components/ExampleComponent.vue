<template>
    <div>
      <h1>{{ message }}</h1>
      <h2>{{ 윤정서체크체크 }}</h2>
      <h2>{{ getHello }}</h2>
      <h2>{{ dbTest }}</h2>
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
      axios.get('http://localhost/api/data')
        .then(response => {
          this.message = response.data.message;  // 응답 데이터 설정
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
        axios.get('http://localhost/api')
        .then(response => {
          this.getHello = response.data;  // 응답 데이터 설정
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
      axios.get('http://localhost/api/visit')
        .then(response => {
          this.dbTest = response.data;  // 응답 데이터 설정
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
      },
  };
  </script>