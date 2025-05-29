<template>
  <div id="app">
    <section class="banner">
      <div class="banner-container">
        <p>
          Because every life deserves to be rembembered
        </p>
      </div>
    </section>
  </div>
  <section class="honor-section">
        <div class="honor-box">
            <span>HONOR THE MEMORY OF A LOVED ONE</span>
            <button><a href="/survey">+</a></button>
        </div>
        <div class="search-box">
            <p>REMEMBER SOMEONE SPECIAL</p>
            <input type="text" placeholder="First Name">
            <input type="text" placeholder="Last Name">
            <button>🔍</button>
        </div>
    </section>
  <section class="gallery">
    <div class="gallery-card">
      <img src="../assets/images/photo-pp.jpg" alt="">
      <p>NOM Prénom</p>
    </div>
    <div class="gallery-card">
      <img src="../assets/images/photo-pp.jpg" alt="">
      <p>NOM PRENOM</p>
    </div>
    <div class="gallery-card">
      <img src="../assets/images/photo-pp.jpg" alt="">
      <p>NOM PRENOM</p>
    </div>
  </section>
  <div class="gallery-nav">
    <button>←</button>
    <button>→</button>
  </div>
  <section class="extra-section">
    <h2>About Relatives Remembered</h2>
    <p>We created this space to celebrate the lives and memories of those we’ve loved and lost. Whether you want to
      share stories, light a virtual candle, or simply browse the legacy left by others, we welcome you to connect and
      remember together.</p>
  </section>
  <section class="features-section">
    <h2>What You Can Do</h2>
    <div class="features-list">
      <div class="feature">Create personal tribute pages</div>
      <div class="feature">Upload photos and messages</div>
      <div class="feature">Connect with others who remember</div>
    </div>
  </section>
  <section class="testimonial-section">
    <h2>What People Are Saying</h2>
    <div class="testimonial">“A beautiful place to share memories and feel connected to my family again.”</div>
    <div class="testimonial">“This site helped me remember my grandmother and show my children who she was.”</div>
  </section>
  <section class="cta-section">
    <h2>Ready to Share a Memory?</h2>
    <p>Create a tribute and keep the memory of your loved ones alive.</p>
    <button><a href="/survey">Start Now</a></button>
  </section>
</template>

<script setup>
import '../assets/css/home/Banner.css'
import '../assets/css/home/SearchBar.css'
import '../assets/css/home/home-page.css'
</script>