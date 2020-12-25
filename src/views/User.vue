<template>
  <div id="login" class="display">
    <Student />

    <router-link @click="global.isLogin = false" :to="{ name: 'Home' }">
      <div class="logout">
        ออกจากระบบ
      </div>
    </router-link>
  </div>
</template>

<script>
import { onMounted, inject } from "vue";
import { useRoute } from "vue-router";
import routes from "../router";
import Student from "../components/Students";

export default {
  components: {
    Student,
  },
  setup() {
    const global = inject("global");
    const route = useRoute();

    onMounted(() => {
      if (!global.isLogin) {
        routes.push({ name: "Login" });
      }

      if (route.params.id === "admin") {
        routes.push({ name: "Admin Dashboard" });
      }
    });
  },
};
</script>

<style scoped>
.display {
  margin-bottom: 5em;
}

.logout {
  margin: 1em auto 0;
  display: block;
  background: var(--red);
  border-radius: 1em;
  width: fit-content;
  padding: 0.5em 1em;
}
</style>
