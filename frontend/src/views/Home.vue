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
</template>

<script setup>
import '../assets/Banner.css'
import '../assets/SpecialButton.css'
import '../assets/SearchBar.css'
</script>