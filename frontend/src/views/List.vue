<template>
  <div id="list-page">
    <div class="list-container">
      <Card
        v-for="person in deceasedList"
        :key="person.id"
        :name="person.name"
        :birth="person.birth"
        :death="person.death"
        :description="person.description"
        :photo="person.photo"
      />
    </div>
  </div>
</template>

<script setup>
import Card from '../components/Card.vue'
import '../assets/Card.css'
import '../assets/List.css'

const deceasedList = [
  {
    id: 1,
    name: "John Doe",
    birth: "1950",
    death: "2020",
    description: "A beloved father and friend.",
    photo: ""
  },
  {
    id: 2,
    name: "Jane Smith",
    birth: "1945",
    death: "2018",
    description: "Her kindness touched many lives.",
    photo: ""
  },
  // ...autres entrées
]
</script>
