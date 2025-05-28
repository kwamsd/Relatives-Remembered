<template>
  <div class="donation-container">
    <h1 class="title">Soutenez une bonne cause</h1>
    <p class="subtitle">
      Chaque don contribue à honorer la mémoire de ceux que nous aimons.
    </p>

    <form class="donation-form" @submit.prevent="submitDonation">
      <div class="input-group">
        <label for="amount">Montant (€)</label>
        <input type="number" id="amount" v-model="amount" min="1" required />
      </div>

      <div class="input-group">
        <label for="name">Nom complet</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <button type="submit">Faire un don</button>

      <p v-if="submitted" class="confirmation">Merci infiniment pour votre soutien 💖</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'DonationPage',
  data() {
    return {
      amount: '',
      name: '',
      email: '',
      submitted: false
    };
  },
  methods: {
    submitDonation() {
      // Ici tu pourrais intégrer une API de paiement
      this.submitted = true;
    }
  }
};
</script>

<style scoped src="../assets/css/donate/donation.css"></style>
