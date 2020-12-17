<template>
  <div id="score">
    <table>
      <tr v-for="(work, key) in state.works" :key="key">
        <td class="work">{{ work.name }}</td>
        <td v-if="state.scores && state.scores[0][work.key]" class="score">
          {{ state.scores[0][work.key] }}
        </td>
        <td v-else class="score grey">0</td>
      </tr>
    </table>

    <p class="updatedAt">อัพเดทเมื่อ {{ state.updatedAt }}</p>

    <div class="btn" v-if="global.isAdmin" @click="state.showModal = true">
      แก้ไขคะแนน
    </div>
    <br />
    <center>
      <p
        class="score grey back"
        style="text-decoration: underline"
        @click="student.selectedStudent = {}"
      >
        ย้อนกลับ
      </p>
    </center>
  </div>

  <div v-if="state.showModal" class="modal">
    <form @submit.prevent="submit()" id="scores">
      <table v-for="(work, key) in state.works" :key="key">
        <td class="work">{{ work.name }}</td>
        <td class="inputScore">
          <input type="number" v-model="state.inputScores[work.key]" />
        </td>
      </table>
      <center>
        <input type="submit" value="ตกลง" class="add" />
        <div class="cancel" @click="state.showModal = false">ยกเลิก</div>
      </center>
    </form>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { computed, inject, onMounted, reactive, watch } from "vue";

export default {
  setup() {
    const global = inject("global");
    const student = inject("student");
    const state = reactive({
      showModal: false,
      works: {},
      scores: {},
      inputScores: computed(() => {
        let scores = {};
        for (let work in state.works) {
          const key = state.works[work].key;
          let value = 0;

          if (state.scores) value = state.scores[key] || 0;

          scores[key] = value;
        }

        return scores;
      }),
      updatedAt: "",
    });

    const readScore = () => {
      state.scores = {};
      const promise = axios.get(
        `${global.apiURL}/api/scores/${student.selectedStudent.id}`
      );
      promise.then((res) => {
        state.scores = res.data[0].works;
        moment.locale("th");
        const date = res.data[0].updatedAt;
        state.updatedAt = moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").fromNow();
      });
    };

    const readWork = () => {
      const promise = axios.get(`${global.apiURL}/api/works`);
      promise.then((res) => (state.works = res.data));
    };

    const submit = () => {
      console.log(state.inputScores);
      const promise = axios.post(
        `${global.apiURL}/api/scores/${student.selectedStudent.id}`,
        state.inputScores
      );

      promise.then((res) => {
        console.log(res.data);
        readScore();
        state.showModal = false;
      });
    };

    watch(
      () => student.selectedStudent.id,
      () => {
        readScore();
        readWork();
      }
    );

    onMounted(() => {
      readScore();
      readWork();
    });

    return { state, global, submit, student };
  },
};
</script>

<style scoped>
#score {
  width: 100%;
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

.grey {
  color: var(--grey);
}

.back {
  cursor: pointer;
}

.score {
  text-align: center;
  width: 20%;
}

.modal {
  background: var(--dark-blue);
  padding: 1em;
  border-radius: 1em;
  width: 50vw;
  max-width: 500px;
  position: fixed;
  top: 10vh;
  z-index: 1;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

input {
  width: 100%;
  font-size: inherit;
  font-family: inherit;
  border: none;
  background: none;
  text-align: center;
  color: var(--white);
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  outline: none;
}

/* Firefox */
input[type="number"] {
  outline: none;
  -moz-appearance: textfield;
}

.inputScore {
  width: 20%;
  padding: 0;
  background: var(--dark-grey);
}

.add {
  margin: 1em auto;
  cursor: pointer;
  width: fit-content;
  padding: 0.5em 1em;
  background: var(--blue);
  border-radius: 1em;
  color: var(--white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.add:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.cancel {
  cursor: pointer;
  text-decoration: underline;
  color: var(--white);
  filter: brightness(70%);
  margin: auto;
}
</style>
