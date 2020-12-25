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
import { computed, onMounted, reactive, inject } from "vue";
import { useRoute } from "vue-router";
import routes from "../router";
import axios from "axios";
import Student from "../components/Students";

export default {
  components: {
    Student,
  },
  setup() {
    const global = inject("global");
    const route = useRoute();
    const id = computed(() => route.params.id);

    const state = reactive({
      student: {},
    });

    onMounted(() => {
      if (!global.isLogin) {
        routes.push({ name: "Login" });
      }

      if (route.params.id === "admin") {
        routes.push({ name: "Admin Dashboard" });
      }

      const promise = axios.get(
        `${global.apiURL}/api/students/${route.params.id}`
      );

      promise.then((res) => {
        state.student = res.data[0];
      });
    });

    onMounted(() => {});

    const getProfileImage = (seed) =>
      `https://avatars.dicebear.com/api/avataaars/${seed}.svg?top[]=longHair&skin[]=tanned&skin[]=pale&skin[]=light`;

    return { id, getProfileImage, state, global };
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
