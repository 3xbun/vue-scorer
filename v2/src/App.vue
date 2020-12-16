<template>
  <div class="container">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { provide, reactive } from "vue";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Footer,
  },
  setup() {
    const global = reactive({
      isLogin: false,
      isAdmin: false,
      apiURL: "https://vue-scorer-api.herokuapp.com",
    });

    provide("global", global);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Prompt&display=swap");

:root {
  --blue: #1da1f2;
  --dark-blue: #243447;
  --white: #fff;
  --black: #151e29;
  --red: #b00020;
  --grey: #657786;
  --light-grey: #aab8c2;
  --dark-grey: #1b2737;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
  font-weight: bold;
}

li {
  list-style: none;
}

body {
  background: var(--black);
  font-family: "Prompt", sans-serif;
  color: var(--white);
}

.container {
  margin: auto;
  width: 85vw;
  max-width: 600px;
}
</style>
