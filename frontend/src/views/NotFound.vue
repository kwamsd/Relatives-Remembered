<template>
  <main class="not-found">
    <h1>404</h1>
    <p>Cette page n’existe pas.</p>
    <RouterLink to="/">Retourner à l’accueil</RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: grid;
  place-content: center;
  text-align: center;
  gap: 0.5rem;
}
.not-found h1 {
  font-size: 5rem;
  margin: 0;
}
</style>
