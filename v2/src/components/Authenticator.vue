<template>
  <div id="authenticator">
    <center>
      <h1>กรอกรหัสผ่าน</h1>
      <form @submit.prevent="authenticate">
        <input
          type="password"
          class="input"
          :placeholder="state.placeholder"
          v-model="state.inputPassword"
          @click="state.result = ''"
        />
        <br />
        <button type="submit">ตกลง</button>
      </form>
      <div class="error" v-if="state.showErr">
        {{ state.result }}
      </div>
    </center>
  </div>
</template>

<script>
import { reactive, watch } from "vue";

export default {
  props: {
    result: {
      type: Number,
      default: 404,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      apiURL: "https://vue-scorer-api.herokuapp.com",
      placeholder: "* * * * * * * *",
      inputPassword: "",
      isAuthenticate: Boolean,
      result: "",
      showErr: false,
    });

    const authenticate = () => {
      ctx.emit("password", state.inputPassword);
      return;
    };

    watch(
      () => props.result,
      (result) => {
        if (result === 404) {
          state.showErr = true;
          state.result = "กรุณากรอกรหัสผ่าน";
        } else if (result === 200) {
          state.showErr = false;
        }
      }
    );

    return { state, authenticate };
  },
};
</script>

<style scoped>
input {
  color: #fff;
  background: #253341;
  font-size: 1.5em;
  outline: none;
  border: none;
  width: 50%;
  padding: 0.5em 1em;
  border-radius: 1em;
  text-align: center;
}

button {
  font-size: 1em;
  margin: 0.5em;
  padding: 0.2em 1em;
  border-radius: 1em;
  border: 1px solid #1e97e2;
  background: #1e97e2;
  color: #fff;
  font-family: inherit;
  cursor: pointer;
}

.error {
  color: #ff4b4b;
}
</style>
