<template>
  <div id="app">
    <section class="banner">
      <div class="banner-container">
        <p>
          Lorem ipsum dolor sit amet
        </p>
      </div>
    </section>
    <div class="home-row">
    <button class="special-btn">
      <span class="special-btn-label">
        HONOUR THE MEMORY OF A LOVED ONE
      </span>
      <span class="special-btn-plus">
        <span class="plus-icon">+</span>
      </span>
    </button>
    <div class="search-bar-container">
      <div class="search-bar-label">Remember Special</div>
      <div class="search-bar-fields">
        <input type="text" class="search-input" placeholder="First Name" />
        <input type="text" class="search-input" placeholder="Last Name" />
        <button class="search-bar-icon" aria-label="Search">
        <span class="search-bar-icon">
          <!-- Icône loupe SVG, simple et sans dépendance -->
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#222" stroke-width="2"/>
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#222" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
        </button>
      </div>
    </div>
    </div>
  </div>
  <section class="gallery">
    <div class="gallery-card">
      <img src="./image/photo-pp.jpg" alt="">
      <p>NOM Prénom</p>
    </div>
    <div class="gallery-card">
      <img src="./image/photo-pp.jpg" alt="">
      <p>NOM PRENOM</p>
    </div>
    <div class="gallery-card">
      <img src="./image/photo-pp.jpg" alt="">
      <p>NOM PRENOM</p>
    </div>
  </section>
  <div class="gallery-nav">
    <button>←</button>
    <button>→</button>
  </div>
  <section class="extra-section">
    <h2>About Relatives Remembered</h2>
    <p>We created this space to celebrate the lives and memories of those we’ve loved and lost. Whether you want to share stories, light a virtual candle, or simply browse the legacy left by others, we welcome you to connect and remember together.</p>
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
    <button><a href="./html/form.html">Start Now</a></button>
  </section>
</template>

<script setup>
import '../assets/css/Banner.css'
import '../assets/css/SpecialButton.css'
import '../assets/css/SearchBar.css'
import '../assets/css/home-page.css'
</script>