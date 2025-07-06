<!-- src/components/FishInform.vue -->


<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div
        class="modal-content"
        ref="modal"
        :style="{
          position: 'absolute',
          top: modalPosition.y + 'px',
          left: modalPosition.x + 'px'
        }"
        @mousedown="startDrag"
        @click.stop
      >
        <h2>금어종 종류</h2>
  
        <div class="image-grid-scroll">
          <div
            v-for="(img, index) in images"
            :key="index"
            class="image-wrapper"
          >
            <img
              :src="img.src"
              :alt="img.name"
              class="grid-image"
              @click="showImageName(img.name)"
            />
            <p class="image-name">{{ img.name }}</p>
          </div>
        </div>
  
        <button @click="$emit('close')">닫기</button>
      </div>

      <FishDetailInform
      v-if="selectedFish"
      :fish="selectedFish"
      @close="closeDetail"
      />

    </div>
  </template>
  
  <script>
  import FishDetailInform from './FishDetailInform.vue';

  export default {
    props: ['images'],
    components: {
    FishDetailInform  // ← 이거 있어야 <FishDetailInform /> 쓸 수 있어요!
    },
    data() {
      return {
        selectedFish: null,  // 선택된 어종 정보 저장
        isDragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0,
        modalPosition: { x: 200, y: 150 }
      };
    },
    mounted() {
      this.$nextTick(() => {
        const modal = this.$refs.modal;
        if (modal) {
          const { offsetWidth, offsetHeight } = modal;
          const centerX = (window.innerWidth - offsetWidth) / 2;
          const centerY = (window.innerHeight - offsetHeight) / 2;
          this.modalPosition = { x: centerX, y: centerY };
        }
      });
    },
    methods: {
      startDrag(event) {
        this.isDragging = true;
        this.dragOffsetX = event.clientX - this.modalPosition.x;
        this.dragOffsetY = event.clientY - this.modalPosition.y;
        window.addEventListener('mousemove', this.onDrag);
        window.addEventListener('mouseup', this.stopDrag);
      },
      onDrag(event) {
        if (!this.isDragging) return;
        this.modalPosition.x = event.clientX - this.dragOffsetX;
        this.modalPosition.y = event.clientY - this.dragOffsetY;
      },
      stopDrag() {
        this.isDragging = false;
        window.removeEventListener('mousemove', this.onDrag);
        window.removeEventListener('mouseup', this.stopDrag);
      },
      showImageName(name) {
          const target = this.images.find(img => img.name === name);
          this.selectedFish = {
          ...target,
          size: 10,
          season: '6월~8월',
          description: `${name}는 대표적인 연안 어종이며, 여름철 산란기로 인해 금어기에 해당합니다.`
          };
      },
      closeDetail() {
          this.selectedFish = null;
      }
    }
  };
  </script>
  
  <style scoped>
  /* 기존 스타일 복붙 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 1000px;
    text-align: center;
  }
  .modal-content button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .modal-content button:hover {
    background-color: #0056b3;
  }
  .image-grid-scroll {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    max-height: 600px;
    overflow-y: auto;
    padding: 10px;
  }
  .grid-image {
    width: 100%;
    aspect-ratio: 2 / 1;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  .image-name {
    margin-top: 6px;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    word-break: break-word;
  }
  </style>