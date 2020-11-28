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
    <!-- <div class="information">
      <div id="profileImage" :style="{ background: profileColor }">
        <img
          class="profilePicture"
          :src="getProfileImage(student.name)"
          alt="profilePicture"
        />
      </div>
      <div class="name">
        <h3>{{ student.name }} {{ student.surname }}</h3>
        <p>@{{ student.id }}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const route = useRoute();
    const id = computed(() => route.params.id);

    const state = reactive({
      student: {},
    });

    onMounted(() => {
      axios
        .get(
          "https://gist.githubusercontent.com/3xbun/fd57e85333d4e089f7deda435c2ce65b/raw"
        )
        .then((res) =>
          res.data.filter((std) => {
            if (std.id == id.value) state.student = std;
          })
        );
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
