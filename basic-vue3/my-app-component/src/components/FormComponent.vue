<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="name">Name</label>
      <input type="text" v-model.trim="employee.name" />
    </div>
    <div class="form-control">
      <label for="salary">Salary</label>
      <input type="text" v-model.trim="employee.salary" />
    </div>
    <div class="form-control">
      <label for="department">Department</label>
      <select v-model="employee.department">
        <option value="programmer">programmer</option>
        <option value="manager">manager</option>
      </select>
    </div>
    <div class="form-control">
      <h2>Gender</h2>
      <div>
        <input type="radio" value="male" v-model="employee.gender" />
        <label for="gender">Male</label>
      </div>
      <div>
        <input type="radio" value="female" v-model="employee.gender" />
        <label for="gender">Female</label>
      </div>
    </div>
    <div class="form-control">
      <h2>Languages</h2>
      <div>
        <input type="checkbox" value="english" v-model="employee.skill" />
        <label for="skill">English</label>
      </div>
      <div>
        <input type="checkbox" value="chinese" v-model="employee.skill" />
        <label for="skill">Chinese</label>
      </div>
      <div>
        <input type="checkbox" value="japanese" v-model="employee.skill" />
        <label for="skill">Japanese</label>
      </div>
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
    {{ JSON.stringify(employee) }}
  </form>
</template>

<script>
export default {
  name: "FormComponent",
  data() {
    return {
      employee: {
        id: Math.random(),
        name: "",
        salary: "",
        department: "programmer",
        gender: "",
        skill: [],
        isVisible: false,
      },
    };
  },
  methods: {
    submitForm() {
      const newEmployee = {
        id: this.employee.id,
        name: this.employee.name,
        salary: this.employee.salary,
        department: this.employee.department,
        gender: this.employee.gender,
        skill: this.employee.skill,
        isVisible: this.employee.isVisible,
      };
      this.$emit("formSubmit", newEmployee);
      this.resetForm();
    },
    resetForm() {
      this.employee.id = "";
      this.employee.name = "";
      this.employee.salary = "";
      this.employee.department = "programmer";
      this.employee.gender = "";
      this.employee.skill = [];
      this.employee.isVisible = false;
    },
  },
};
</script>

<style scoped>
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0.2px 10px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  background: #fff;
}
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
}
input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}
button {
  font: inherit;
  background: purple;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 15px;
}
input[type="radio"],
input[type="checkbox"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}
input[type="radio"] + label,
input[type="checkbox"] + label {
  font-weight: normal;
}
h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}
</style>
