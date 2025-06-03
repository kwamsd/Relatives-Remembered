<template>
<main class="about-general">
<section class="hero">
  <div class="about-subnav">
      <router-link to="/about"                >Overview</router-link>
      <router-link to="/about/who-we-are"     >Who We Are</router-link>
      <router-link to="/about/contact" class="active">Contact</router-link>
      <router-link to="/about/founder"        >Founder</router-link>
    </div>
<h1>About Relatives Remembered</h1>
<p class="tagline">Because every life deserves to be remembered</p>
</section>

<section class="mission">
<h2>Our Mission</h2>
<p>
Relatives Remembered is a project born in collaboration with the
<strong>WW1 Remembrance Centre</strong> in Portsmouth.
Our goal: to provide a free digital space where everyone can
honor loved ones, share memories, and support historic
preservation. </p>
</section>

<section class="what-we-do">
<h2>What We Do</h2>
<ul>
<li>Creation of free and customizable tribute pages.</li>
<li>Collection and promotion of artifacts and testimonies.</li>
<li>Educational programs for schools and families.</li>
<li>Guided tours of the <em>WW1 Remembrance Centre</em>.</li>
</ul>
</section>

<section class="cta-links">
<router-link to="/about/who-we-are">Who are we?</router-link>
<router-link to="/about/contact">Contact us</router-link>
<router-link to="/about/founder">Our founder</router-link>
</section>
</main>
</template>

<script setup>
import '../../assets/css/about_us/AboutGeneral.css'
import '../../assets/css/about_us/_Subnav.css'
</script>