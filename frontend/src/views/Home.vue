<!-- frontend/src/views/home.vue -->
<template>
  <!-- MULTI‐ROOT TEMPLATE IS OK IN VUE 3 -->

  <!-- 1. Banner section remains as before -->
  <section class="banner">
    <div class="banner-container">
      <p>
        Because every life deserves to be remembered
      </p>
    </div>
  </section>

  <!-- 2. Free‐creation notice -->
  <section class="free-notice">
    <p>There is no fee to create a tribute page—celebrate your loved one at no cost</p>
  </section>

  <!-- 3. Honor & Search -->
  <section class="honor-section">
    <div class="honor-box">
      <span>HONOR THE MEMORY OF A LOVED ONE</span>
      <button><a href="/survey">+</a></button>
    </div>
    <div class="search-box">
      <p>REMEMBER SOMEONE SPECIAL</p>
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
      <button>🔍</button>
    </div>
  </section>

  <!-- 4. Gallery carousel -->
  <section class="gallery-wrapper">
    <div class="gallery-container">
      <div
        class="gallery-track"
        :style="{ transform: `translateX(-${activeIndex * CARD_WIDTH}px)` }"
      >
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="gallery-card"
          :class="{ active: index === activeIndex }"
        >
          <img :src="card.img" alt="" />
          <p>{{ card.lastName }} {{ card.firstName }}</p>
        </div>
      </div>
    </div>
    <div class="gallery-nav">
      <button @click="prev">←</button>
      <button @click="next">→</button>
    </div>
  </section>

  <!-- 5. Extra/About -->
  <section class="extra-section">
    <h2>About Relatives Remembered</h2>
    <p>
      We created this space to celebrate the lives and memories of those
      we’ve loved and lost. Whether you want to share stories, light a
      virtual candle, or simply browse the legacy left by others, we
      welcome you to connect and remember together.
    </p>
  </section>

  <!-- 6. Features -->
  <section class="features-section">
    <h2>What You Can Do</h2>
    <div class="features-list">
      <div class="feature">Create personal tribute pages</div>
      <div class="feature">Upload photos and messages</div>
      <div class="feature">Connect with others who remember</div>
    </div>
  </section>

  <!-- 7. Testimonials -->
  <section class="testimonial-section">
    <h2>What People Are Saying</h2>
    <div class="testimonial">
      “A beautiful place to share memories and feel connected to my family
      again.”
    </div>
    <div class="testimonial">
      “This site helped me remember my grandmother and show my children who
      she was.”
    </div>
  </section>

  <!-- 8. Call to Action -->
  <section class="cta-section">
    <h2>Ready to Share a Memory?</h2>
    <p>Create a tribute and keep the memory of your loved ones alive.</p>
    <a href="/survey" class="cta-btn">Start Now</a>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Import the placeholder image once, so Webpack/Vite resolves it correctly:
import imgPP from '../assets/images/photo-pp.jpg'

// Card‐width (200px card + 20px gap), must match CSS
const CARD_WIDTH = 220

// Five example cards; adjust names or image paths as needed
const cards = [
  { firstName: 'Prénom1', lastName: 'Nom1', img: imgPP },
  { firstName: 'Prénom2', lastName: 'Nom2', img: imgPP },
  { firstName: 'Prénom3', lastName: 'Nom3', img: imgPP },
  { firstName: 'Prénom4', lastName: 'Nom4', img: imgPP },
  { firstName: 'Prénom5', lastName: 'Nom5', img: imgPP },
]

const activeIndex = ref(0)

function prev() {
  activeIndex.value =
    (activeIndex.value - 1 + cards.length) % cards.length
}

function next() {
  activeIndex.value = (activeIndex.value + 1) % cards.length
}
</script>

<style src="../assets/css/home/Banner.css" />
<style src="../assets/css/home/SearchBar.css" />
<style src="../assets/css/home/home-page.css" />
