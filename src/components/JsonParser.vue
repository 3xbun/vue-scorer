<template>
  <div id="JsonParser">
    <center>
      <h3>กรอกคะแนน</h3>
      <form id="formJson" @submit.prevent="readJson">
        <input type="file" id="Json" />
        <input type="submit" value="Submit" />
        <div class="err">{{ state.err }}</div>
      </form>
    </center>
  </div>
</template>

<script>
import { inject, reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    const global = inject("global");
    const state = reactive({
      err: "",
      files: "",
    });

    const readJson = () => {
      state.err = "";
      const files = document.querySelector("#Json").files;
      const form = document.querySelector("#formJson");

      if (files.length <= 0) {
        return (state.err = "File not found");
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const result = JSON.parse(e.target.result);
        state.files = result;

        for (let file in state.files) {
          console.log(state.files[file].id);
          console.log(state.files[file].works);

          const promise = axios.post(
            `${global.apiURL}/api/scores/${state.files[file].id}`,
            state.files[file].works
          );
          promise.then((res) => {
            state.err = res.data;
            form.reset();
          });
        }
      };

      reader.readAsText(files.item(0));
    };

    return { state, readJson };
  },
};
</script>

<style scoped>
input {
  font-size: inherit;
  font-family: inherit;
}
</style>
