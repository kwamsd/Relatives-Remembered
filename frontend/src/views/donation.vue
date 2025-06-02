<template>
  <div class="donation-container">
    <h1 class="title">Support a good cause</h1>
    <p class="subtitle">
      Each gift helps honour the memory of those we love.
    </p>

    <form class="donation-form" @submit.prevent="submitDonation">
      <div class="input-group">
        <label for="amount">Amount (£)</label>
        <input type="number" id="amount" v-model="amount" min="1" required />
      </div>

      <div class="input-group">
        <label for="name">Full name</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <button type="submit">Donate</button>

      <p v-if="submitted" class="confirmation">Thank you very much for your support 💖</p>
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

<style scoped src="../assets/css/donation.css"></style>
