<template>
  <section>
    <img :src="picture" :width="size" :height="size" ref="imageEl" />

    <h1>Nickname: {{ nickname }}</h1>
    <form @submit.prevent="submitForm">
      <label for="">Your nickname: </label>
      <input type="text" ref="nicknameEl" />
      <button type="submit">Submit</button>
    </form>

    <h1>Name: {{ getFullName }}</h1>
    <button @click.right.ctrl="showData">Ctrl + rightClick</button>

    <h1>Age : {{ age * 2 }}</h1>
    <h1>Department: {{ getDepartments }}</h1>
    <h1>Salary : ${{ salary }}</h1>
    <h1>Salary Per Year : ${{ getIncomePerYear }}</h1>
    <button @click="decrement(2)">Decrease</button>
    <button @click="increment(2)">Increase</button>

    <hr />
    <button @click="toggleVisible">{{ isVisible ? "hide" : "open" }}</button>
    <article v-show="isVisible">
      <p>Address : <span v-html="address"></span></p>
      <p>Social: <a :href="social" target="_blank">Youtube</a></p>

      <p v-if="hobby.length === 0">No Hobby</p>
      <div v-else>
        <p>Hobby :</p>
        <ol>
          <li v-for="(item, index) in hobby" :key="index">{{ item }}</li>
        </ol>
      </div>
      <p>General :</p>
      <ul>
        <li v-for="(item, key) in general" :key="key">{{ key }}: {{ item }}</li>
      </ul>
    </article>
    <h2>Method: {{ get_random_by_method() }}</h2>
    <h2>Method: {{ get_random_by_method() }}</h2>
    <h2>Computed: {{ get_random_by_computed }}</h2>
    <h2>Computed: {{ get_random_by_computed }}</h2>
  </section>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      firstname: "JoJo",
      lastname: "Company",
      nickname: "",
      age: 22,
      address: "<i>Bangkok</i>",
      picture:
        "https://cdn-icons.flaticon.com/png/512/6032/premium/6032640.png?token=exp=1636811556~hmac=66693d480d3bbf01c5e988572fd69ee5",
      size: 150,
      social: "https://www.youtube.com/",
      hobby: ["play game", "listen music", "exercise"],
      general: { gender: "male", weight: 83.1, height: 180, isFemale: false },
      isVisible: false,
      salary: 20000,
    };
  },
  methods: {
    showData() {
      alert(this.getFullName);
    },
    increment(value) {
      this.salary *= value;
    },
    decrement(value) {
      this.salary /= value;
    },
    submitForm() {
      this.nickname = this.$refs.nicknameEl.value;
    },
    toggleVisible() {
      this.isVisible = !this.isVisible;
    },
    get_random_by_method() {
      return Math.random();
    },
  },
  computed: {
    getFullName() {
      return this.firstname + "  " + this.lastname;
    },
    get_random_by_computed() {
      return Math.random();
    },
    getIncomePerYear() {
      return this.salary * 12;
    },
    getDepartments() {
      return this.salary >= 35000 ? "Manager" : "Programmer";
    },
  },
  watch: {
    salary(value) {
      if (value > 50000) {
        setTimeout(() => {
          this.salary = 20000;
        }, 1000);
        alert("salary more than 50000");
      }
    },
  },
};
</script>

<style></style>
