<template>
  <main class="contact-page">
    <!-- barre interne -->
    <div class="about-subnav">
      <router-link to="/about"                >Overview</router-link>
      <router-link to="/about/who-we-are"     >Who We Are</router-link>
      <router-link to="/about/contact" class="active">Contact</router-link>
      <router-link to="/about/founder"        >Founder</router-link>
    </div>

    <h1>Contact</h1>

    <section class="details">
      <h2>WW1 Remembrance Centre</h2>
      <p>Bastion 6, Airport Service Rd, Portsmouth PO3 5PJ</p>
      <p><strong>Tél.</strong> : 02394 007775</p>
      <p><strong>Email</strong> : <a href="mailto:contact@ww1rc.org">contact@ww1rc.org</a></p>
      <p><strong>Horaires</strong> : 11 h – 14 h · Dimanche, Mardi-Jeudi*</p>
      <small>*Horaires susceptibles de changer sans préavis (équipe bénévole).</small>
    </section>

    <section class="map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.967896594474!2d-1.0554378235011606!3d50.83175855983586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48745db817fda771%3A0xecdbe5a7a0e72152!2sThe%20WW1%20Remembrance%20Centre!5e0!3m2!1sfr!2suk!4v1748970305418!5m2!1sfr!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </section>

    <section class="donate">
      <h2>Support Us</h2>
      <router-link to="/donation" class="donate-btn">DONATE NOW</router-link>
    </section>
  </main>
</template>

<script setup>
import '../../assets/css/about_us/Contacts.css'
import '../../assets/css/about_us/_Subnav.css'
</script>
