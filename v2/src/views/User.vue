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
    <Authenticator />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Authenticator from "../components/Authenticator";

export default {
  components: { Authenticator },
  setup() {
    const route = useRoute();
    const id = computed(() => route.params.id);

    const state = reactive({
      apiURL: "https://vue-scorer-api.herokuapp.com",
      student: {},
    });

    onMounted(() => {
      const promist = axios.get(
        `${state.apiURL}/api/students/${route.params.id}`
      );

      promist.then((res) => (state.student = res.data[0]));
    });

    const getProfileImage = (seed) =>
      `https://avatars.dicebear.com/api/avataaars/${seed}.svg?top[]=longHair&skin[]=tanned&skin[]=pale&skin[]=light`;

    return { id, getProfileImage, state };
  },
};
</script>

<style>
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
</style>
