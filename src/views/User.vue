<template>
  <div id="login" class="display">
    <div class="information">
      <div
        id="profileImage"
        :style="{ background: state.student.profileImage }"
      >
        <img
          class="profilePicture"
          :src="getProfileImage(state.student.name)"
          alt="profilePicture"
        />
      </div>
      <div class="name">
        <h3>{{ state.student.name }} {{ state.student.surname }}</h3>
        <p>@{{ state.student.id }}</p>
      </div>
    </div>

    <center>
      <router-link @click="global.isLogin = false" :to="{ name: 'Home' }">
        <div class="logout">
          ออกจากระบบ
        </div>
      </router-link>
    </center>
  </div>
</template>

<script>
import { computed, onMounted, reactive, inject } from "vue";
import { useRoute } from "vue-router";
import routes from "../router";
import axios from "axios";

export default {
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

      promise.then((res) => (state.student = res.data[0]));
    });

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

.information {
  display: flex;
  margin: 2em 0;
}

.name {
  margin-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name > p {
  color: #657786;
}

#profileImage {
  display: flex;
  justify-content: center;

  width: 5em;
  height: 5em;
  border-radius: 2.5em;
}

.profilePicture {
  width: 100%;
  border-radius: 50%;
}

.logout {
  display: block;
  background: var(--red);
  border-radius: 1em;
  width: fit-content;
  padding: 0.5em 1em;
}
</style>
