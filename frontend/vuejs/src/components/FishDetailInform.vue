<!-- src/components/FishDetailInform.vue -->
<template>
    <div class="detail-modal-overlay" @click.self="$emit('close')">
      <div class="detail-modal">
        <div class="left-section">
          <img :src="fish.src" alt="어종" class="fish-image" />
          <div class="info-row">
            <!-- <img src="@/assets/Icon/ban.png" alt="금지 아이콘" class="ban-icon" /> -->
            <span>{{ fish.size }}cm, {{ fish.season }}</span>
          </div>
        </div>
        <div class="right-section">
          <p class="fish-description">{{ fish.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['fish']
  }
  </script>
  
  <style scoped>
  .detail-modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .detail-modal {
    background: white;
    display: flex;
    border-radius: 8px;
    padding: 20px;
    width: 800px;
    max-width: 90%;
  }
  
  .left-section {
    flex: 1;
    border: 1px solid #ccc;
    padding: 10px;
    position: relative;
  }
  
  .fish-image {
    width: 100%;
    height: auto;
  }
  
  .info-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
  }
  
  .ban-icon {
    width: 24px;
    height: 24px;
  }
  
  .right-section {
    flex: 2;
    border: 1px solid #ccc;
    margin-left: 10px;
    padding: 10px;
    text-align: left;
  }
  
  .fish-description {
    font-size: 18px;
  }
  </style>