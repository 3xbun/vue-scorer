<template>
  <div id="dashboard">
    <br />
    <h3>Admin Dashboard</h3>
    <hr />

    <div id="work" class="items">
      <div class="header" @click="state.showWork = !state.showWork">
        <h1>งาน</h1>
        &nbsp;
        <div class="icon">
          <i v-if="!state.showWork" class="fas fa-caret-down"></i>
          <i @click="state.showWork = false" v-else class="fas fa-caret-up"></i>
        </div>
      </div>
      <Works v-if="state.showWork" />
    </div>
    <div id="students" class="items">
      <div class="header" @click="state.showStudent = !state.showStudent">
        <h1>นักเรียน</h1>
        &nbsp;
        <div class="icon">
          <i v-if="!state.showStudent" class="fas fa-caret-down"></i>
          <i
            @click="state.showStudent = false"
            v-else
            class="fas fa-caret-up"
          ></i>
        </div>
      </div>
      <Students v-if="state.showStudent" />
    </div>
    <div id="JsonParser" class="items">
      <div class="header" @click="state.JsonParser = !state.JsonParser">
        <h1>กรอกคะแนน</h1>
        &nbsp;
        <div class="icon">
          <i v-if="!state.JsonParser" class="fas fa-caret-down"></i>
          <i
            @click="state.JsonParser = false"
            v-else
            class="fas fa-caret-up"
          ></i>
        </div>
      </div>
      <JsonParser v-if="state.JsonParser" />
    </div>
    <br />
    <div class="center">
      <router-link
        @click="global.isLogin = false"
        id="logout"
        :to="{ name: 'Home' }"
      >
        ออกจากระบบ
      </router-link>
    </div>
  </div>
</template>

<script>
import { reactive, inject, onMounted } from "vue";
import Works from "../components/Works";
import Students from "../components/Students";
import JsonParser from "../components/JsonParser";
import routes from "../router";

export default {
  components: {
    Works,
    Students,
    JsonParser,
  },
  setup() {
    const global = inject("global");
    const state = reactive({
      showWork: false,
      showStudent: false,
      JsonParser: false,
    });

    onMounted(() => {
      if (!global.isLogin) {
        routes.push({ name: "Login" });
      }
    });

    return { state };
  },
};
</script>

<style>
#dashboard {
  padding-bottom: 5em;
}

.items {
  margin-top: 1em;
  padding: 1em;
  background: var(--dark-blue);
  border-radius: 1em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.header {
  display: flex;
  cursor: pointer;
}

.icon {
  font-size: 1.5em;
  display: flex;
  align-items: center;
}

#logout {
  margin: auto;
  display: block;
  background: var(--red);
  border-radius: 1em;
  width: fit-content;
  padding: 0.5em 1em;
}
</style>
