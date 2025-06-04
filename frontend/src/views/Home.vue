<template>
  <!-- 1. Banner -->
  <section class="banner">
    <div class="banner-container">
      <p>Because every life deserves to be remembered</p>
    </div>
  </section>

  <!-- 2. Free-creation notice -->
  <section class="free-notice">
    <p>There is no fee to create a tribute page—celebrate your loved one at no cost</p>
  </section>

  <!-- 3. Honor & Search -->
  <section class="honor-section">
    <div class="honor-box">
      <span>HONOUR THE MEMORY OF A LOVED ONE</span>
      <button class="honor-btn" @click="handleHonor">+</button>
    </div>

    <div class="search-box">
      <p>REMEMBER SOMEONE SPECIAL</p>
      <input v-model="searchFirst" type="text" placeholder="First Name" />
      <input v-model="searchLast"  type="text" placeholder="Last Name" />
      <button @click="handleSearch">🔍</button>
    </div>
  </section>

  <!-- 4. Gallery / Anecdotes -->
  <section v-if="hasGalleryData" class="gallery-wrapper">
    <!-- Titles -->
    <h3 class="gallery-title">{{ activeTab === 'tributes' ? 'Latest Tributes' : 'Anecdotes' }}</h3>

    <!-- Tabs -->
    <div class="gallery-tabs">
      <button :class="{ active: activeTab === 'tributes' }" @click="activeTab = 'tributes'">Latest&nbsp;Tributes</button>
      <button :class="{ active: activeTab === 'anecdotes' }" @click="activeTab = 'anecdotes'">Anecdotes</button>
    </div>

    <!-- Body -->
    <!-- ---------- TRIBUTES CAROUSEL ---------- -->
    <div v-if="activeTab === 'tributes'" class="gallery-body">
      <button class="nav-btn-home" @click="prev"><i class="fa-solid fa-arrow-left"></i></button>

      <div class="gallery-container">
        <div class="gallery-track" :style="trackStyle">
          <router-link
            v-for="(card, index) in cards"
            :key="card.id"
            :to="`/template/${card.id}`"
            class="gallery-card"
            :class="{ active: index === activeIndex }"
          >
            <img :src="card.img" alt="Tribute portrait" />
            <p>{{ card.lastName }} {{ card.firstName }}</p>
          </router-link>
        </div>
      </div>

      <button class="nav-btn-home" @click="next"><i class="fa-solid fa-arrow-right"></i></button>
    </div>

    <!-- ---------- ANECDOTES LIST ---------- -->
    <div v-else class="anecdotes-container">
      <div v-for="(anec, i) in anecdotes" :key="i" class="anecdote-card">
        <p class="anecdote-text">"{{ anec.text }}"</p>
        <p class="anecdote-author">— {{ anec.lastName }} {{ anec.firstName }}</p>
      </div>
    </div>
  </section>

  <!-- 5. Extra/About -->
  <section class="extra-section">
    <h2>About Relatives Remembered</h2>
    <p>
      We created this space to celebrate the lives and memories of those
      we’ve loved and lost. Whether you want to share stories, light a
      virtual candle, or simply browse the legacy left by others, we
      welcome you to connect and remember together.
    </p>
  </section>

  <!-- 6. Features -->
  <section class="features-section">
    <h2>What You Can Do</h2>
    <div class="features-list">
      <div class="feature">
        Create personal tribute pages
        <i class="fa-solid fa-plus"></i>
      </div>
      <div class="feature">
        Upload photos and messages
        <i class="fa-solid fa-upload"></i>
      </div>
      <div class="feature">
        Connect with others who remember
        <i class="fa-solid fa-plug"></i>
      </div>
    </div>
  </section>

  <!-- 7. Testimonials -->
  <section class="testimonial-section">
    <h2>What People Are Saying</h2>
    <div class="testimonial">“A beautiful place to share memories and feel connected to my family again.”</div>
    <div class="testimonial">“This site helped me remember my grandmother and show my children who she was.”</div>
  </section>

  <!-- 8. Call to Action -->
  <section class="cta-section">
    <h2>Ready to Share a Memory?</h2>
    <p>Create a tribute and keep the memory of your loved ones alive.</p>

    <router-link v-if="isLogged" to="/survey" class="cta-btn">Start&nbsp;Now</router-link>
    <button v-else class="cta-btn" @click="handleStartNow">Start&nbsp;Now</button>
  </section>

  <!-- Login required modal -->
  <div v-if="showLoginPrompt" class="login-modal" @click.self="showLoginPrompt = false">
    <div class="login-modal-content">
      <button class="modal-close" @click="showLoginPrompt = false">&times;</button>
      <h2>Please&nbsp;log&nbsp;in</h2>
      <p>You must be logged in to create a memorial page.</p>
      <router-link to="/login" class="modal-login-btn">Go&nbsp;to&nbsp;Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'
import placeholderImg from '../assets/images/photo-pp.jpg'

/* ------------- Auth / CTA ------------- */
const { state } = authService
const isLogged        = computed(() => !!state.user)
const router          = useRouter()
const showLoginPrompt = ref(false)

function handleHonor()      { isLogged.value ? router.push('/survey') : showLoginPrompt.value = true }
function handleStartNow()   { handleHonor() }   // même logique
function handleSearch () {
  if (!searchFirst.value && !searchLast.value) return
  router.push({ path: '/list', query:{ first:searchFirst.value, last:searchLast.value }})
}

/* ------------- Recherche formulaire ------------- */
const searchFirst = ref('')
const searchLast  = ref('')

/* ------------- Carousel (tributes) --------------- */
const apiUrl       = 'http://localhost:3000'
const CARD_WIDTH   = 220
const cards        = ref([])          // alimenté après fetch
const activeIndex  = ref(0)
const activeTab    = ref('tributes')

function prev () { activeIndex.value = (activeIndex.value - 1 + cards.value.length) % cards.value.length }
function next () { activeIndex.value = (activeIndex.value + 1) % cards.value.length }

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIndex.value * CARD_WIDTH}px)`
}))

/* ------------- Anecdotes (placeholder) ----------- */
const anecdotes = ref([
  { firstName:'Marie', lastName:'Durand', text:'She never missed Sunday lunch.' },
  { firstName:'Jean',  lastName:'Dupont', text:'He taught me how to fish.' },
])

/* ------------- Fetch latest tributes ------------- */
async function fetchLatestTributes () {
  try {
    const res = await fetch(`${apiUrl}/api/deceased?limit=12`)
    if (!res.ok) throw new Error('Bad response')
    const data = await res.json()

    cards.value = data.map(d => ({
      id:        d.id,
      firstName: d.firstname,
      lastName:  d.lastname,
      img:       d.image_url
                  ? (d.image_url.startsWith('http') ? d.image_url : apiUrl + d.image_url)
                  : placeholderImg,
    }))
  } catch (err) {
    console.error('Could not load tributes', err)
  }
}

onMounted(fetchLatestTributes)

/* ------------- Galerie visible ? ----------------- */
const hasGalleryData = computed(() =>
  (activeTab.value === 'tributes' && cards.value.length) ||
  (activeTab.value === 'anecdotes' && anecdotes.value.length)
)
</script>

<style src="../assets/css/home/home-page.css"/>
<style src="../assets/css/home/Banner.css"/>
<style src="../assets/css/home/SearchBar.css"/>