<template>
    <main class="main-form">
    <h1>Créer une page en mémoire</h1>
    <form action="upload.php" method="post" enctype="multipart/form-data">
      <div>
        <label for="prenom">Prénom</label>
        <input type="text" id="prenom" name="prenom" required>
      </div>
      <div>
        <label for="nom">Nom</label>
        <input type="text" id="nom" name="nom" required>
      </div>
      <div>
        <label for="date_naissance">Date de naissance</label>
        <input type="date" id="date_naissance" name="date_naissance">
      </div>
      <div>
        <label for="date_deces">Date de décès</label>
        <input type="date" id="date_deces" name="date_deces">
      </div>
      <div class="full-width">
        <label for="biographie">Biographie / Hommage</label>
        <textarea id="biographie" name="biographie" rows="5"></textarea>
      </div>
      <div>
        <label for="photo">Upload your photo</label>
        <input type="file" id="photo" name="photo" accept="image/*">
      </div>
      <div>
        <label for="theme">Thème de la page</label>
        <select id="theme" name="theme">
          <option value="clair">Clair</option>
          <option value="nature">Nature</option>
          <option value="sobre">Sobre</option>
        </select>
      </div>
      <button> <a href="/dead-people">Créer la page hommage</a></button>
    </form>
  </main>
</template>

<script setup>
import '../assets/css/form.css'
</script>