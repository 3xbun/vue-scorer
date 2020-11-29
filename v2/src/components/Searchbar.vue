<template>
  <div>
    <center>
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
        <router-link
          v-for="std in state.currentStudent"
          :key="std.id"
          :to="{ name: 'User', params: { id: std.id } }"
          @click="state.id = ''"
        >
          <li>
            {{ std.name }} {{ std.surname }}
            <span class="username">@{{ std.id }}</span>
          </li>
        </router-link>
      </ul>
    </center>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
// import { Students } from "../assets/Students";
import Loader from "./Loader";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      apiURL: "https://vue-scorer-api.herokuapp.com",
      searching: false,
      last_updated: "",
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
      const promist = axios.get(`${state.apiURL}/api/students`);

      promist.then((res) => (state.students = res.data));
    });

    return { state };
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

.focus {
  border: 1px solid #1e97e2 !important;
}

input {
  font-family: inherit;
  color: #fff;
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
  color: #727273;
  line-height: 130%;
}

#dropdown li {
  text-align: left;
  background-color: rgba(101, 119, 134, 0.2);
  margin-bottom: 0.3em;
  padding: 0.5em 1em;
  border-radius: 1em;
}

#dropdown a {
  display: inline-block;
  width: 100%;
}

.username {
  color: #1e97e2;
  font-size: 0.8em;
}
</style>
