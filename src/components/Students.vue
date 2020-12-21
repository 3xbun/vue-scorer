<template>
  <div id="Students">
    <Searchbar v-if="global.isAdmin" />
    <div class="small"></div>
    <Room
      v-if="global.isAdmin"
      :class="{ hide: student.selectedStudent.name }"
    />
    <div class="student" v-if="student.selectedStudent.id">
      <center>
        <div
          id="profileImage"
          :style="{ background: student.selectedStudent.profileColor }"
        >
          <img
            class="profilePicture"
            :src="profileImage(student.selectedStudent.name)"
            alt="profilePicture"
          />
        </div>
      </center>
      <div class="information">
        <p>
          <strong>{{ student.fullName }} </strong>
          <span class="id"> @{{ student.selectedStudent.id }}</span>
        </p>
        <br />
        <Score />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, provide, reactive, inject, onMounted } from "vue";
import Searchbar from "./Searchbar";
import Score from "./Score";
import Room from "./Room";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  components: {
    Searchbar,
    Score,
    Room,
  },
  setup() {
    const global = inject("global");
    const route = useRoute();

    const student = reactive({
      selectedStudent: {},
      fullName: computed(
        () =>
          student.selectedStudent.name + " " + student.selectedStudent.surname
      ),
      showRoom: false,
    });

    provide("student", student);

    const profileImage = (seed) =>
      `https://avatars.dicebear.com/api/avataaars/${seed}.svg?top[]=longHair&skin[]=tanned&skin[]=pale&skin[]=light`;

    onMounted(() => {
      if (route.params.id !== "admin") {
        const promise = axios.get(
          `${global.apiURL}/api/students/${route.params.id}`
        );

        promise.then((res) => (student.selectedStudent = res.data[0]));
      }
    });

    return { student, profileImage, global };
  },
};
</script>

<style>
.small {
  height: 1em;
}
.hide {
  display: none;
}

.student {
  background: var(--dark-grey);
  border-radius: 1em;
  padding: 1em;
}
#profileImage {
  margin-top: 1em;
  width: 5em;
  height: 5em;
  border-radius: 50%;
}
.information {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.id {
  color: var(--blue);
}

select {
  cursor: pointer;
}

tbody tr:hover {
  background: rgba(255, 255, 255, 0.1);
}

.profilePicture {
  border-radius: 50%;
}
</style>
