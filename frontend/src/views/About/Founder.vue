<template>
<main>
    <div class="about-subnav">
      <router-link to="/about"                >Overview</router-link>
      <router-link to="/about/who-we-are"     >Who We Are</router-link>
      <router-link to="/about/contact" class="active">Contact</router-link>
      <router-link to="/about/founder"        >Founder</router-link>
    </div>
    <div class="bio-container">
      <div class="left-panel">
        <img src="../../assets/images/pp_ceo.jpeg" alt="Charles Haskell portrait">
        <div class="name">Charles Haskell</div>
        <div class="profile-info">
          <strong>Title:</strong> Founder and CEO<br>
          <strong>Organization:</strong>   <a href="https://ww1rc.org/">WW1 Remembrance Centre</a><br>
          <strong>Location:</strong> Portsmouth, UK<br>
          <strong>Education:</strong> Northern Grammar School<br>
          <strong>Youtube:</strong><a href="https://www.youtube.com/@WW1remcen/videos"> Our youtube channel</a>
          <ul>
            <li>Country Music Presenter – Express FM</li>
            <li>Owner – TellThemRadio</li>
            <li>Tour Guide – WWI & WWII battlefield tours</li>
            <li>Deputy Manager – Big Yellow Self Storage</li>
          </ul>
          <strong>Social:</strong><br>
          <a href="https://www.facebook.com/ww1remembrancecentre">Facebook</a><br>
          <a href="mailto:ww1remcen@hotmail.com">ww1remcen@hotmail.com</a>
        </div>
      </div>
      <div class="right-panel">
        <p><strong>Charles Haskell</strong> is the Founder and CEO of the <strong>WW1 Remembrance Centre</strong> in Portsmouth, UK. With over 15 years of dedication to the cause, Charles has led efforts to preserve the memory of those who served during World War I through immersive exhibits, educational outreach, and volunteer-led operations.</p>

        <p>His mission is clear: <em>"Promoting remembrance through education and commemoration to ensure the young never forget the sacrifices made by past generations."</em></p>

        <p>Located at Bastion 6, Airport Service Rd, Portsmouth, the Centre features authentic artifacts, reconstructed trenches, and engaging displays. It is run by a team of dedicated volunteers and welcomes visitors weekly with free access, free parking, and a pet-friendly policy.</p>

        <p>Charles has a background in broadcasting, having worked as a country music presenter at Express FM and as the owner of TellThemRadio, an online station playing music from the 1920s to the 1960s. He has also led guided tours of WWI and WWII battlefields across France and Belgium.</p>

        <p>If you’re interested in volunteering, donating, or learning more, contact the Centre at <a href="mailto:ww1remcen@hotmail.com">ww1remcen@hotmail.com</a> or call 02392 798751. Group visits and contributions to the exhibit collection are always welcome.</p>

        <p>Charles remains a passionate advocate for historical education and continues to inspire new generations through remembrance.</p>
      </div>
    </div>
  </main>
</template>

<script setup>
// Mets ici le chemin de ton image si tu en as une
const imageSrc = ''
import '../../assets/css/about_us/Founder.css'
import '../../assets/css/about_us/_Subnav.css'
</script>
