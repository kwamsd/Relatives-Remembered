<template>
  <div class="main-donation">
    <h1 class="donation-title">Support Relatives Remembered</h1>
    <p class="donation-subtitle">
      Every donation honors the memory of our loved ones and keeps our platform free for all.
    </p>
    <section class="section-donation section-donation--info">
      <h2 class="donation-heading">Where does your donation go?</h2>
      <ul class="donation-list">
        <li>24/7 hosting and maintenance of the platform</li>
        <li>Development of new features</li>
        <li>Administrative and communication costs</li>
      </ul>
      <p class="donation-text">
        Managed by the <strong>Relatives Remembered</strong> association,
        100% of donations are reinvested to keep memories alive.
      </p>
    </section>

    <section class="section-donation section-donation--payment">
      <h2 class="donation-heading">Choose an amount</h2>
      <div class="donation-buttons">
        <a class="donation-button" href="https://pay.sumup.com/b2c/QEHC8WA8">£ 5</a>
        <a class="donation-button" href="https://pay.sumup.com/b2c/QKBUK501">£ 10</a>
        <a class="donation-button" href="https://pay.sumup.com/b2c/Q5JIU3F4">£ 15</a>
        <a class="donation-button" href="https://pay.sumup.com/b2c/QMB0B8F1">£ 20</a>
        <a class="donation-button donation-button--custom" href="https://pay.sumup.com/b2c/QT34V2UB">
          Custom
        </a>
      </div>
    </section>

    <section class="section-donation section-donation--alt">
      <h2 class="donation-heading">You can also donate by : <br>PayPal or JustGiving by clickinf on the logos</h2>
      <div class="donation-alt-links">
        <a href="https://www.paypal.com/GB/fundraiser/charity/4388391" target="_blank" rel="noopener">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/PayPal_2024.svg/langfr-2880px-PayPal_2024.svg.png" alt="Donate via PayPal"
            class="donation-alt-logo" />
        </a>
        <a href="https://www.justgiving.com/ww1rc" target="_blank" rel="noopener">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/JustGiving.svg/500px-JustGiving.svg.png" alt="Donate via JustGiving"
            class="donation-alt-logo" />
        </a>
      </div>
    </section>

    <p v-if="submitted" class="donation-confirmation">
      Thank you so much for your support! 💖
    </p>
  </div>
</template>
<script>
export default {
  name: 'DonationPage',
  data() {
    return { submitted: false };
  },
  mounted() {
    this.$el.querySelectorAll('a[href*="pay.sumup.com"]').forEach(link => {
      link.addEventListener('click', () => { this.submitted = true; });
    });
  }
};
</script>
<style scoped src="../assets/css/donation.css"></style>
