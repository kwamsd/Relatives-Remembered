<template>
  <div id="about-us">
    <div class="aboutus-main-container">
      <div class="aboutus-image-block">
        <img v-if="imageSrc" :src="imageSrc" alt="About us" />
        <div v-else class="aboutus-image-placeholder"></div>
      </div>
      <div class="aboutus-text-block">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, vitae egestas nunc justo nec eros. Suspendisse potenti. Mauris ac eros ac sem pulvinar tincidunt.
        </p>
        <p>
          Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Mets ici le chemin de ton image si tu en as une
const imageSrc = ''
import '../assets/AboutUs.css'
</script>
