<template>
  <div id="list-page">
    <!-- Barre de recherche & filtres -->
    <div class="controls">
      <!-- Recherche par nom complet -->
      <input
        type="text"
        v-model="searchTerm"
        placeholder="🔍 Rechercher un nom..."
        class="search-input"
      />

      <!-- Filtre par année de naissance -->
      <select v-model="selectedBirth" class="filter-select">
        <option value="">Toutes années de naissance</option>
        <option v-for="year in birthYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>

      <!-- Filtre par profession -->
      <select v-model="selectedProfession" class="filter-select">
        <option value="">Toutes professions</option>
        <option
          v-for="profession in professions"
          :key="profession"
          :value="profession"
        >
          {{ profession }}
        </option>
      </select>

      <!-- Filtre par lieu de naissance -->
      <select v-model="selectedBirthplace" class="filter-select">
        <option value="">Tous lieux de naissance</option>
        <option
          v-for="place in birthplaces"
          :key="place"
          :value="place"
        >
          {{ place }}
        </option>
      </select>
    </div>

    <!-- Conteneur en grille : on boucle désormais sur paginatedList -->
    <div class="list-container">
      <Card
        v-for="person in paginatedList"
        :key="person.id"
        :firstname="person.firstname"
        :lastname="person.lastname"
        :birth="person.birth"
        :death="person.death"
        :profession="person.profession"
        :birthplace="person.birthplace"
        :known_for="person.known_for"
        :photo="person.photo"
      />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="page-btn"
      >
        Précédent
      </button>

      <!-- Boutons numérotés de page -->
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="['page-btn', { active: page === currentPage }]"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        class="page-btn"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Card from '../components/Card.vue'
import '../assets/css/List.css'

/**
 * Exemple de données statiques, enrichies pour inclure :
 * - firstname, lastname
 * - profession
 * - birthplace (lieu de naissance)
 * - known_for (ce pour quoi la personne est connue)
 * - photo (URL ou chaîne vide)
 * Vous pouvez, bien entendu, remplacer par un fetch vers votre API.
 */
const deceasedList = [
  {
    id: 1,
    firstname: 'Louis',
    lastname: 'Pasteur',
    birth: '1822',         // Année
    death: '1895',         // Année
    profession: 'Chimiste',
    birthplace: 'Dole, France',
    known_for: 'Découverte de la vaccination',
    photo: ''
  },
  {
    id: 2,
    firstname: 'Marie',
    lastname: 'Curie',
    birth: '1867',
    death: '1934',
    profession: 'Physicienne / Chimiste',
    birthplace: 'Varsovie, Pologne',
    known_for: 'Travaux sur la radioactivité',
    photo: ''
  },
  {
    id: 3,
    firstname: 'Victor',
    lastname: 'Hugo',
    birth: '1802',
    death: '1885',
    profession: 'Écrivain',
    birthplace: 'Besançon, France',
    known_for: 'Les Misérables, Notre-Dame de Paris',
    photo: ''
  },
  {
    id: 4,
    firstname: 'Claude',
    lastname: 'Monet',
    birth: '1840',
    death: '1926',
    profession: 'Peintre',
    birthplace: 'Paris, France',
    known_for: 'Impressionisme',
    photo: ''
  },
  {
    id: 5,
    firstname: 'Ada',
    lastname: 'Lovelace',
    birth: '1815',
    death: '1852',
    profession: 'Mathématicienne',
    birthplace: 'Londres, Royaume-Uni',
    known_for: 'Premier algorithme pour machine',
    photo: ''
  },
  {
    id: 6,
    firstname: 'Albert',
    lastname: 'Einstein',
    birth: '1879',
    death: '1955',
    profession: 'Physicien',
    birthplace: 'Ulm, Allemagne',
    known_for: 'Théorie de la relativité',
    photo: ''
  },
  {
    id: 7,
    firstname: 'Rosa',
    lastname: 'Parks',
    birth: '1913',
    death: '2005',
    profession: 'Militante des droits civiques',
    birthplace: 'Tuscumbia, États-Unis',
    known_for: 'Bus de Montgomery',
    photo: ''
  },
  {
    id: 8,
    firstname: 'Nelson',
    lastname: 'Mandela',
    birth: '1918',
    death: '2013',
    profession: 'Président / Militant',
    birthplace: 'Mvezo, Afrique du Sud',
    known_for: 'Lutte contre l’apartheid',
    photo: ''
  },
  {
    id: 9,
    firstname: 'Frida',
    lastname: 'Kahlo',
    birth: '1907',
    death: '1954',
    profession: 'Peintre',
    birthplace: 'Coyoacán, Mexique',
    known_for: 'Autoportraits colorés',
    photo: ''
  },
  {
    id: 10,
    firstname: 'Mahatma',
    lastname: 'Gandhi',
    birth: '1869',
    death: '1948',
    profession: 'Leader politique',
    birthplace: 'Porbandar, Inde',
    known_for: 'Lutte non violente',
    photo: ''
  },
  {
    id: 11,
    firstname: 'Florence',
    lastname: 'Nightingale',
    birth: '1820',
    death: '1910',
    profession: 'Infirmière',
    birthplace: 'Florence, Italie',
    known_for: 'Fondatrice des soins infirmiers modernes',
    photo: ''
  },
  {
    id: 12,
    firstname: 'Leonardo',
    lastname: 'da Vinci',
    birth: '1452',
    death: '1519',
    profession: 'Artiste / Inventeur',
    birthplace: 'Vinci, Italie',
    known_for: 'La Joconde, L’Homme de Vitruve',
    photo: ''
  },
  {
    id: 13,
    firstname: 'Emily',
    lastname: 'Dickinson',
    birth: '1830',
    death: '1886',
    profession: 'Poétesse',
    birthplace: 'Amherst, États-Unis',
    known_for: 'Poèmes sensibles',
    photo: ''
  },
  {
    id: 14,
    firstname: 'Maya',
    lastname: 'Angelou',
    birth: '1928',
    death: '2014',
    profession: 'Poétesse / Écrivaine',
    birthplace: 'St. Louis, États-Unis',
    known_for: 'I Know Why the Caged Bird Sings',
    photo: ''
  },
  {
    id: 15,
    firstname: 'Alan',
    lastname: 'Turing',
    birth: '1912',
    death: '1954',
    profession: 'Mathématicien / Informaticien',
    birthplace: 'Londres, Royaume-Uni',
    known_for: 'Test de Turing, décryptage Enigma',
    photo: ''
  },
  {
    id: 16,
    firstname: 'Simone',
    lastname: 'Veil',
    birth: '1927',
    death: '2017',
    profession: 'Ministre / Militante',
    birthplace: 'Nice, France',
    known_for: 'Loi sur l’IVG en France',
    photo: ''
  },
  {
    id: 17,
    firstname: 'Gabriel',
    lastname: 'Garcia Marquez',
    birth: '1927',
    death: '2014',
    profession: 'Écrivain',
    birthplace: 'Aracataca, Colombie',
    known_for: 'Cent ans de solitude',
    photo: ''
  },
  {
    id: 18,
    firstname: 'Amelia',
    lastname: 'Earhart',
    birth: '1897',
    death: '1937',
    profession: 'Aviatrice',
    birthplace: 'Atchison, États-Unis',
    known_for: 'Traversée solo Atlantique',
    photo: ''
  },
  {
    id: 19,
    firstname: 'Martin',
    lastname: 'Luther King Jr.',
    birth: '1929',
    death: '1968',
    profession: 'Pasteur / Militants droits civiques',
    birthplace: 'Atlanta, États-Unis',
    known_for: 'I Have a Dream',
    photo: ''
  },
  {
    id: 20,
    firstname: 'Coco',
    lastname: 'Chanel',
    birth: '1883',
    death: '1971',
    profession: 'Styliste',
    birthplace: 'Saumur, France',
    known_for: 'Mode féminine moderne',
    photo: ''
  },
  {
    id: 21,
    firstname: 'Pablo',
    lastname: 'Picasso',
    birth: '1881',
    death: '1973',
    profession: 'Peintre',
    birthplace: 'Málaga, Espagne',
    known_for: 'Cubisme',
    photo: ''
  },
  {
    id: 22,
    firstname: 'Jane',
    lastname: 'Austen',
    birth: '1775',
    death: '1817',
    profession: 'Romancière',
    birthplace: 'Steventon, Royaume-Uni',
    known_for: 'Orgueil et Préjugés',
    photo: ''
  },
  {
    id: 23,
    firstname: 'Wolfgang',
    lastname: 'Mozart',
    birth: '1756',
    death: '1791',
    profession: 'Compositeur',
    birthplace: 'Salzbourg, Autriche',
    known_for: 'Requiem, Symphonie n°40',
    photo: ''
  },
  {
    id: 24,
    firstname: 'Franz',
    lastname: 'Kafka',
    birth: '1883',
    death: '1924',
    profession: 'Écrivain',
    birthplace: 'Prague, Tchécoslovaquie',
    known_for: 'La Métamorphose',
    photo: ''
  },
  {
    id: 25,
    firstname: 'Beethoven',
    lastname: '',
    birth: '1770',
    death: '1827',
    profession: 'Compositeur',
    birthplace: 'Bonn, Allemagne',
    known_for: 'Symphonie n°9',
    photo: ''
  },
  // … ajoutez autant d’entrées que souhaité pour tester la pagination, etc. …
]

/* ----------------------------------------
   États réactifs pour recherche & filtres
---------------------------------------- */
const searchTerm        = ref('')
const selectedBirth     = ref('')
const selectedProfession = ref('')
const selectedBirthplace = ref('')

/* ----------------------------------------
   Nombre d’éléments par page
---------------------------------------- */
const itemsPerPage = 20
const currentPage  = ref(1)

/* ----------------------------------------
   Liste des années de naissance uniques
---------------------------------------- */
const birthYears = computed(() => {
  const years = [...new Set(deceasedList.map((p) => p.birth))]
  // On trie en nombres croissants
  return years.sort((a, b) => parseInt(a) - parseInt(b))
})

/* ----------------------------------------
   Liste des professions uniques (qui ne sont pas vides)
---------------------------------------- */
const professions = computed(() => {
  const profs = deceasedList
    .map((p) => p.profession)
    .filter((p) => p && p.trim().length > 0)
  return [...new Set(profs)].sort()
})

/* ----------------------------------------
   Liste des lieux de naissance uniques
---------------------------------------- */
const birthplaces = computed(() => {
  const places = deceasedList
    .map((p) => p.birthplace)
    .filter((p) => p && p.trim().length > 0)
  return [...new Set(places)].sort()
})

/* ----------------------------------------
   Liste filtrée selon recherche + filtres
---------------------------------------- */
const filteredList = computed(() => {
  return deceasedList.filter((person) => {
    // Recherche sur prénom ou nom
    const fullName = `${person.firstname} ${person.lastname}`.toLowerCase()
    const matchesName = fullName.includes(searchTerm.value.toLowerCase())

    // Filtre sur année de naissance
    const matchesBirth = selectedBirth.value
      ? person.birth === selectedBirth.value
      : true

    // Filtre sur profession
    const matchesProf = selectedProfession.value
      ? person.profession === selectedProfession.value
      : true

    // Filtre sur lieu de naissance
    const matchesPlace = selectedBirthplace.value
      ? person.birthplace === selectedBirthplace.value
      : true

    return matchesName && matchesBirth && matchesProf && matchesPlace
  })
})

/* ----------------------------------------
   Calcul du nombre total de pages
---------------------------------------- */
const totalPages = computed(() =>
  Math.ceil(filteredList.value.length / itemsPerPage)
)

/* ----------------------------------------
   Liste paginée (slice de filteredList)
---------------------------------------- */
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredList.value.slice(start, start + itemsPerPage)
})

/* ----------------------------------------
   Dès que filteredList change, on revient à la page 1
---------------------------------------- */
watch(filteredList, () => {
  currentPage.value = 1
})
</script>

