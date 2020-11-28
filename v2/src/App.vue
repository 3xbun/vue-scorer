<template>
  <div class="container">
    <Searchbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Searchbar from "./components/Searchbar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Searchbar,
    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Prompt&display=swap");

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
  background: #15202b;
  font-family: "Prompt", sans-serif;
  color: #fff;
}

.container {
  margin: auto;
  width: 85vw;
  max-width: 600px;
}
</style>
