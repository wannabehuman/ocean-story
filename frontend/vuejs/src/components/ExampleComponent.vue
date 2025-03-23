<template>
    <div>
      <h1>{{ message }}</h1>
      <h2>{{ 윤정서체크체크 }}</h2>
      <h2>{{ getHello }}</h2>
      <h2>{{ dbTest }}</h2>
      <h2>{{ yunTest }}</h2>
      <h2>{{ yjs }}</h2>
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
        getHello:'',
        yunTest: '',
        yjs: '',
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
      // axios.get('http://localhost/api/visit')
      //   .then(response => {
      //     this.dbTest = response.data;  // 응답 데이터 설정
      //   })
      //   .catch(error => {
      //     console.error('There was an error!', error);
      //   });

      axios.get('http://localhost/api/yun')
      .then(response => {
        this.yunTest = response.data.yunTest; // 응답 데이터 설정
      })
      .catch(error => {
        console.error('아니 이게 뭐시여ㅇㅅㅇ..', error);
      })

      axios.get('http://localhost/api/yjs')
      .then(res => {
        this.yjs = res.data;
      })
      .catch(err => {
        console.error('실패해따 ㅎ..', err)
      })


    },
  };
  </script>