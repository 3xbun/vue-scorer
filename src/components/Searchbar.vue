<template>
  <div>
    <div class="center">
      <div id="searchbar" :class="{ focus: state.searching }">
        <i class="fas fa-search"></i> &nbsp;
        <input
          type="number"
          placeholder="กรอกรหัสนักเรียน"
          @blur="state.searching = false"
          @focus="state.searching = true"
          v-model="state.id"
        />
      </div>
      <Loader v-if="!state.searching && state.students.length == 0" />
      <ul id="dropdown" v-if="state.id">
        <a
          v-for="std in state.currentStudent"
          :key="std.id"
          @click="student.selectedStudent = std"
        >
          <li>
            {{ std.name }} {{ std.surname }}
            <span class="username">@{{ std.id }}</span>
          </li>
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted, inject } from "vue";
import Loader from "./Loader";
import axios from "axios";

export default {
  setup() {
    const global = inject("global");
    const student = inject("student");
    const state = reactive({
      searching: false,
      id: "",
      students: [],
      student: {},
      currentStudent: computed(() => {
        return state.students
          .filter((std) => std.id.startsWith(state.id))
          .slice(0, 3);
      }),
    });

    onMounted(() => {
      const promise = axios.get(`${global.apiURL}/api/students`);

      promise.then((res) => (state.students = res.data));
    });

    return { state, student };
  },
  components: {
    Loader,
  },
};
</script>

<style scoped>
#searchbar {
  display: flex;
  justify-content: flex-start;
  padding: 0.5em;
  background: rgba(255, 255, 255, 0.15);
  grid-area: search;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 1em;
  font-family: "Prompt", sans-serif;
  margin: 1em auto;
  height: 3em;
}

a {
  cursor: pointer;
}

.focus {
  border: 1px solid #1e97e2 !important;
}

input {
  font-family: inherit;
  color: var(--white);
  background: none;
  font-size: 1.5em;
  outline: none;
  border: none;
  width: 100%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

i {
  font-size: 1.5em;
  color: var(--grey);
  line-height: 130%;
}

#dropdown li {
  text-align: left;
  background-color: rgba(101, 119, 134, 0.2);
  margin-bottom: 0.3em;
  padding: 0.5em 1em;
  border-radius: 1em;
}

#dropdown li:hover {
  transform: scale(1.04);
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

#dropdown a {
  display: inline-block;
  width: 100%;
}

.username {
  color: var(--blue);
  font-size: 0.8em;
}
</style>
