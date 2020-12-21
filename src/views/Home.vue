<template>
  <div id="home">
    <News />
    <router-link :to="{ name: 'Login' }">
      <div class="btn">
        Login
      </div>
    </router-link>
  </div>
</template>

<script>
import News from "../components/News";
export default {
  components: {
    News,
  },
};
</script>

<style scoped>
#home {
  padding-top: 3em;
}

.btn {
  margin: 1em auto;
  font-size: 1.2em;
  cursor: pointer;
  width: fit-content;
  padding: 0.5em 1em;
  background: var(--blue);
  border-radius: 1em;
  color: var(--white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.btn:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transform: scale(1.2);
}
</style>
