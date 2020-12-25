<template>
  <div id="News">
    <h1>
      บอร์ดประกาศ
    </h1>
    <div class="news">
      <ul>
        <div class="news-item" v-for="news in state.news" :key="news.id">
          <li>
            <u>{{ news.title }}</u> <br />
            <span>{{ news.content }} </span>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      news: [],
    });

    onMounted(() => {
      const promise = axios.get(
        "https://gist.githubusercontent.com/3xbun/1440ab456a777752dbf61854790aac1a/raw"
      );

      promise.then((res) => (state.news = res.data));
    });

    return { state };
  },
};
</script>

<style>
.news-item {
  background: var(--grey);
  margin: 1em auto;
  padding: 0.5em 1em;
  border-radius: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  color: var(--light-grey);
  transform: scale(0.8);
  min-width: 100px;
  text-align: right;
}
</style>
