<template>
  <main class="who-we-are">
    <div class="about-subnav">
      <router-link to="/about"                >Overview</router-link>
      <router-link to="/about/who-we-are" class="active">Who We Are</router-link>
      <router-link to="/about/contact"        >Contact</router-link>
      <router-link to="/about/founder"        >Founder</router-link>
    </div>

    <h1>Who We Are</h1>

    <section>
      <h2>Our Roots</h2>
      <p>
        The journey began with <strong>Charles Haskell</strong> and his
        passion for remembrance…
      </p>
    </section>

    <section>
      <h2>Volunteer-Driven</h2>
      <p>
        Historians, students, families and veterans all lend a hand to keep
        memory alive.
      </p>
    </section>

    <section>
      <h2>Partners</h2>
      <ul>
        <li>Local schools (education programmes)</li>
        <li>Veteran associations &amp; regimental groups</li>
        <li>Businesses supporting our exhibitions</li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import '../../assets/css/about_us/WhoWeAre.css'
import '../../assets/css/about_us/_Subnav.css'
</script>
