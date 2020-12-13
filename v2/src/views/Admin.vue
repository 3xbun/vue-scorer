<template>
  <div id="dashboard">
    <br />
    <h3>Admin Dashboard</h3>
    <hr />

    <div id="work" class="items">
      <div class="header">
        <h1>งาน</h1>
        &nbsp;
        <div class="icon">
          <i
            @click="state.showWork = true"
            v-if="!state.showWork"
            class="far fa-eye"
          ></i>
          <i
            @click="state.showWork = false"
            v-else
            class="far fa-eye-slash"
          ></i>
        </div>
      </div>
      <Works v-if="state.showWork" />
    </div>
    <div id="students" class="items">
      <div class="header">
        <h1>นักเรียน</h1>
        &nbsp;
        <div class="icon">
          <i
            @click="state.showStudent = true"
            v-if="!state.showStudent"
            class="far fa-eye"
          ></i>
          <i
            @click="state.showStudent = false"
            v-else
            class="far fa-eye-slash"
          ></i>
        </div>
      </div>
      <Students v-if="state.showStudent" />
    </div>
    <br />
    <center>
      <router-link
        @click="global.isLogin = false"
        id="logout"
        :to="{ name: 'Home' }"
      >
        ออกจากระบบ
      </router-link>
    </center>
  </div>
</template>

<script>
import { reactive, inject, onMounted } from "vue";
import Works from "../components/Works";
import Students from "../components/Students";
import routes from "../router";

export default {
  components: {
    Works,
    Students,
  },
  setup() {
    const global = inject("global");
    const state = reactive({
      showWork: false,
      showStudent: false,
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
}

.icon {
  cursor: pointer;
  font-size: 1.5em;
  display: flex;
  align-items: center;
}
</style>
