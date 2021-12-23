<template>
  <ul>
    <Person
      v-for="(employee, index) in getEmployees"
      :key="index"
      :id="employee.id"
      :name="employee.name"
      :salary="employee.salary"
      :department="employee.department"
      :gender="employee.gender"
      :skill="employee.skill"
      :isVisible="employee.isVisible"
      @show="toggleDescription"
      @delete="deleteEmployee"
    />
  </ul>
</template>

<script>
import Person from "./Person.vue";
export default {
  name: "ListData",
  components: {
    Person,
  },
  data() {
    return {
      getEmployees: this.employees,
    };
  },
  props: ["employees"],
  methods: {
    toggleDescription(id) {
      this.getEmployees = this.getEmployees.map((item) => {
        if (item.id === id) {
          return { ...item, isVisible: !item.isVisible };
        }
        return item;
      });
    },
    deleteEmployee(id) {
      this.getEmployees = this.getEmployees.filter((item) => item.id !== id);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
}
</style>
