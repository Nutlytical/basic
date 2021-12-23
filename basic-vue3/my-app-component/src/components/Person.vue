<template>
  <Card>
    <template v-slot:header>
      <h2>{{ name }}</h2>
    </template>
    <template v-slot:button>
      <button @click="toggleDescription(id)">See More</button>
      <button @click="deleteEmployee(id)">Delete Data</button>
    </template>
    <template v-slot:content>
      <transition name="fade">
        <div v-show="isVisible">
          <p>Salary: {{ salary }}, Department: {{ department }}</p>
          <p>Gender: {{ gender }}, Skill: {{ skill }}</p>
        </div>
      </transition>
    </template>
  </Card>
</template>

<script>
import Card from "./Card.vue";
export default {
  name: "Person",
  components: { Card },
  props: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    salary: { type: Number, default: 15000 },
    department: { type: String, required: true },
    gender: { type: String, required: true },
    skill: { type: Array },
    isVisible: { type: Boolean },
  },
  methods: {
    toggleDescription(id) {
      this.$emit("show", id);
    },
    deleteEmployee(id) {
      this.$emit("delete", id);
    },
  },
};
</script>

<style scoped>
button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background: #ff0077;
  color: white;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
</style>
