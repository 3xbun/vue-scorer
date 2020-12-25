<template>
  <div class="works">
    <ul>
      <li v-for="work in state.works" :key="work._id" class="work-card">
        ชื่องาน:
        <strong>
          <a :href="work.url" target="_blank" class="title"
            >{{ work.name }}&nbsp;<i class="fas fa-external-link-alt"></i
          ></a>
        </strong>
        <br />
        วันที่ให้งาน: {{ formatDate(work.assign_date) }} <br />
        วันที่กำหนดส่ง:
        <span v-if="!countDate(work.due_date).late" class="due_date_format">
          {{ countDate(work.due_date).day }}
        </span>
        <span v-else>{{ formatDate(work.due_date) }}</span>
        <span class="due_date late" v-if="countDate(work.due_date).late">
          (ครบกำหนดส่ง)
        </span>
        <span class="due_date" v-else> ({{ formatDate(work.due_date) }}) </span
        ><br />
        <span
          class="delete"
          @click="
            state.work = work;
            state.deleting = true;
          "
          >ลบงาน</span
        >
        |
        <span
          class="edit"
          @click="
            state.title = 'แก้ไขงาน';
            state.showModal = true;
            state.editing = true;
            state.work = work;
          "
          >แก้ไข</span
        >
      </li>
    </ul>

    <div
      class="add"
      @click="
        state.title = 'เพิ่มงาน';
        state.showModal = true;
      "
    >
      เพิ่มงาน
    </div>

    <div v-if="state.showModal" class="modal">
      <h1>{{ state.title }}</h1>
      <form @submit.prevent="submit()">
        <label for="name">ชื่องาน</label>
        <input
          type="text"
          placeholder="ใบกิจกรรมเรื่อง xxxx"
          v-model="state.work.name"
          required
        />
        <label for="key">รหัสชิ้นงาน</label>
        <input
          type="text"
          placeholder="sheet(x)"
          v-model="state.work.key"
          required
        />
        <label for="url">ลิงค์งาน</label>
        <input
          type="text"
          placeholder="https://bit.ly/xlink"
          v-model="state.work.url"
          required
        />
        <label for="name">วันที่มอบหมาย</label>
        <input
          type="datetime-local"
          v-model="state.work.assign_date"
          required
        />
        <label for="name">วันที่กำหนดส่ง</label>
        <input type="datetime-local" v-model="state.work.due_date" required />
        <input type="submit" value="ตกลง" class="add" />
        <div
          class="cancel"
          @click="
            state.showModal = false;
            resetWork();
          "
        >
          ยกเลิก
        </div>
      </form>
    </div>

    <div v-if="state.deleting" class="modal">
      <div class="center">
        <h3>ต้องการลบ</h3>
        <h1>
          {{ state.work.name }}
        </h1>
        <div class="btn">
          <span
            @click="
              deleteWork(state.work._id);
              state.deleting = false;
            "
            >ยืนยัน</span
          >
          <span
            @click="
              state.deleting = false;
              resetWork();
            "
            >ยกเลิก</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { reactive, onMounted, inject } from "vue";

export default {
  setup() {
    const global = inject("global");
    const state = reactive({
      name: "3xbun",
      works: [],
      message: "",
      err: false,
      showModal: false,
      title: "",
      deleting: false,
      editing: false,
      work: {
        name: "",
        url: "",
        assign_date: "",
        due_date: "",
        key: "",
      },
    });

    const formatDate = (date) => {
      if (!date) {
        return "ไม่กำหนด";
      }
      moment.locale("th");
      const day = moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").format("LLL");
      return day;
    };

    const countDate = (date) => {
      if (!date) {
        return "";
      }

      moment.locale("th");
      const day = moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").fromNow();
      const checkLate = moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").diff(moment());
      let late = false;
      if (checkLate < 0) late = true;

      return { day, late };
    };

    const readWork = () => {
      const promise = axios.get(`${global.apiURL}/api/works`);
      promise.then((res) => (state.works = res.data));
    };

    const resetWork = () => {
      state.work = {
        name: "",
        url: "",
        assign_date: "",
        due_date: "",
        key: "",
      };
    };

    const deleteWork = (id) => {
      const promise = axios.delete(`${global.apiURL}/api/works/${id}`);
      promise.then((res) => {
        state.message = res.data;
        readWork();
      });
    };

    const submit = () => {
      if (state.editing) {
        const promise = axios
          .post(`${global.apiURL}/api/works/${state.work._id}`, state.work)
          .catch((err) => {
            if (err) state.err = true;
          });

        promise.then((res) => {
          if (state.err) {
            console.log("error");
          } else {
            state.message = res.data;
          }
          state.showModal = false;
          readWork();
          resetWork();
        });
      } else {
        const promise = axios
          .post(`${global.apiURL}/api/works`, state.work)
          .catch((err) => {
            if (err) state.err = true;
          });

        promise.then((res) => {
          if (state.err) {
            console.log("error");
          } else {
            state.message = res.data;
          }
          state.showModal = false;
          readWork();
          resetWork();
        });
      }

      state.editing = false;
    };

    onMounted(() => {
      readWork();
    });

    return { state, formatDate, deleteWork, submit, resetWork, countDate };
  },
};
</script>

<style scoped>
.works {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  color: var(--blue);
}

.title:hover {
  text-decoration: underline;
}

.due_date {
  color: var(--white);
  filter: brightness(50%);
}

.late {
  color: var(--red);
  filter: brightness(150%);
}

ul {
  width: 100%;
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

.modal h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  text-align: center;
}

input {
  font-size: inherit;
  font-family: inherit;
  border: none;
  margin-bottom: 1em;
  width: 100%;
  text-align: center;
}

.work-card {
  background: var(--dark-blue);
  filter: brightness(150%);
  margin-bottom: 1em;
  padding: 0.5em 1em;
  border-radius: 1em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.work-card:hover {
  transform: scale(1.05);
}

.add {
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

.edit {
  cursor: pointer;
}

.cancel {
  cursor: pointer;
  text-decoration: underline;
  color: var(--white);
  filter: brightness(70%);
}

.delete {
  cursor: pointer;
  color: var(--red);
}

.btn {
  display: flex;
  justify-content: center;
}

.btn span {
  cursor: pointer;
  display: block;
  padding: 0.5em 1em;
  background: var(--blue);
  border-radius: 1em;
  margin: 1em;
}

.btn span:first-child {
  background: var(--red);
}
</style>
