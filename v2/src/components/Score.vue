<template>
  <div id="score">
    <table>
      <tr v-for="(score, key) in state.scores" :key="key">
        <td>{{ state.works.filter((work) => work.key === key)[0].name }}</td>
        <td>{{ score }}</td>
      </tr>
    </table>

    <p class="updatedAt">อัพเดทเมื่อ {{ state.updatedAt }}</p>

    <div class="btn">
      เพิ่มคะแนน
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { inject, onMounted, reactive, watch } from "vue";

export default {
  setup() {
    const global = inject("global");
    const student = inject("student");
    const state = reactive({
      works: {},
      scores: {},
      updatedAt: "",
    });

    const readScore = () => {
      const promise = axios.get(
        `${global.apiURL}/api/scores/${student.selectedStudent.id}`
      );
      promise.then((res) => {
        state.scores = res.data[0].works[0];
        moment.locale("th");
        const date = res.data[0].updatedAt;
        state.updatedAt = moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").fromNow();
      });
    };

    watch(
      () => student.selectedStudent.id,
      () => readScore()
    );

    onMounted(() => {
      const promise = axios.get(`${global.apiURL}/api/works`);

      promise.then((res) => (state.works = res.data));
    });

    return { state };
  },
};
</script>

<style scoped>
#score {
  width: 50vw;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 0.5em 1em;
  border: solid 1px rgba(101, 119, 134, 0.5);
}

.updatedAt {
  font-size: 0.8em;
  color: var(--grey);
  text-align: right;
}

.btn {
  margin: 1em auto 0;
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
}
</style>
