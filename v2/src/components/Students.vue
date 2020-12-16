<template>
  <div id="Students">
    <Searchbar />
    <br />
    <div class="student" v-if="student.selectedStudent.name">
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
import { computed, provide, reactive, inject } from "vue";
import Searchbar from "./Searchbar";
import Score from "./Score";
export default {
  components: {
    Searchbar,
    Score,
  },
  setup() {
    const global = inject("global");
    const student = reactive({
      selectedStudent: {},
      fullName: computed(
        () =>
          student.selectedStudent.name + " " + student.selectedStudent.surname
      ),
    });

    provide("student", student);

    const profileImage = (seed) =>
      `https://avatars.dicebear.com/api/avataaars/${seed}.svg?top[]=longHair&skin[]=tanned&skin[]=pale&skin[]=light`;

    return { student, profileImage, global };
  },
};
</script>

<style>
.student {
  background: var(--dark-grey);
  border-radius: 1em;
  padding: 1em;
}
#profileImage {
  margin-top: 1em;
}
.information {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.id {
  color: var(--blue);
}
</style>
