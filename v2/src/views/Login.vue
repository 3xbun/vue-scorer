<template>
  <div id="Login">
    <h1>เข้าสู่ระบบ</h1>
    <form @submit.prevent="authenticate">
      <div
        class="input username"
        :class="{ outline: state.selected === 'username' }"
      >
        <i class="fas fa-user"></i>
        <input
          type="text"
          placeholder="รหัสนักเรียน"
          v-model="state.username"
          required
          @focus="state.selected = 'username'"
          @blur="state.selected = ''"
        />
      </div>
      <div
        class="input password"
        :class="{ outline: state.selected === 'password' }"
      >
        <i class="fas fa-lock"></i>
        <input
          type="password"
          placeholder="รหัสผ่าน"
          v-model="state.password"
          required
          @focus="state.selected = 'password'"
          @blur="state.selected = ''"
        />
      </div>
      <input type="submit" id="submit" value="เข้าสู่ระบบ" />
      <div class="error">
        {{ state.err }}
      </div>
      <div class="success">
        {{ state.msg }}
      </div>
    </form>
  </div>
</template>

<script>
import { inject, reactive } from "vue";
import axios from "axios";
import routes from "../router";

export default {
  setup() {
    const global = inject("global");
    const state = reactive({
      apiURL: "http://localhost:8080",
      selected: "",
      username: "",
      password: "",
      err: "",
      msg: "",
    });

    const focus = (e) => {
      console.log(e);
    };

    const reset = () => {
      state.username = "";
      state.password = "";
      state.err = "";
    };

    const authenticate = () => {
      const promise = axios
        .post(`${state.apiURL}/api/students/authenticate/${state.username}`, {
          password: state.password,
        })
        .catch((err) => console.log(err));

      promise.then((res) => {
        console.table(res);
        if (res.data.status === 200) {
          global.isLogin = true;
          state.msg = "กำลังเข้าสู่ระบบ . . .";
          routes.push({ name: "User", params: { id: state.username } });
          reset();
        } else if (res.data.status === 401) {
          state.err = "รหัสผ่านไม่ถูกต้อง";
        } else if (res.data.status === 404) {
          state.err = "ไม่พบรหัสนักเรียน " + state.username;
        } else {
          state.err = "พบข้อผิดพลาด กรุณาลองใหม่";
        }
      });
    };

    return { state, global, authenticate, focus };
  },
};
</script>

<style scoped>
#Login {
  background: var(--dark-blue);
  padding: 1em;
  margin-top: 5em;
  border-radius: 1em;
  text-align: center;
}

.outline {
  border: solid 1px var(--blue) !important;
}

form {
  display: flex;
  flex-direction: column;
  font-size: 1.5em;
}

.input {
  width: 70%;
  padding-left: 1em;
  margin: 0.5em auto;
  text-align: left;
  background: var(--grey);
  border-radius: 1em;
  border: solid 1px var(--grey);
}

input {
  outline: none;
  font-size: inherit;
  font-family: inherit;
  background: none;
  border: none;
  color: var(--white);
  margin-left: 0.5em;
  width: 80%;
}

input::placeholder {
  color: inherit;
  filter: brightness(60%);
}

#submit {
  width: 70%;
  font-size: 1em;
  margin: 0.5em auto;
  border-radius: 1em;
  border: 1px solid #1e97e2;
  background: #1e97e2;
  color: #fff;
  font-family: inherit;
  cursor: pointer;
}

.error {
  font-size: 0.8em;
  color: var(--red);
  filter: brightness(150%);
}

.success {
  font-size: 0.8em;
  color: var(--grey);
  filter: brightness(150%);
}
</style>
