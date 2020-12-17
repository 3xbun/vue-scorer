<template>
  <div id="roomNo">
    เลือกดู
    <select name="room" id="room" v-model="state.room">
      <option value="1">ห้อง 1</option>
      <option value="2">ห้อง 2</option>
      <option value="3">ห้อง 3</option>
      <option value="4">ห้อง 4</option>
    </select>

    <table class="students">
      <thead>
        <tr>
          <th>รหัส</th>
          <th>เลขที่</th>
          <th>ชื่อ</th>
          <th>นามสกุล</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="std in state.filteredStudents"
          :key="std.id"
          @click="student.selectedStudent = std"
        >
          <td style="color: var(--blue)" class="center">{{ std.id }}</td>
          <td class="center">{{ std.room.slice(2) }}</td>
          <td>{{ std.name }}</td>
          <td>{{ std.surname }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, reactive, inject, watch } from "vue";
import axios from "axios";
export default {
  setup() {
    const global = inject("global");
    const student = inject("student");
    const state = reactive({
      students: [],
      filteredStudents: [],
      room: "1",
    });

    watch(
      () => state.room,
      () => {
        state.filteredStudents = state.students.filter((std) => {
          if (std.room) {
            return std.room.startsWith(state.room);
          }
        });
      }
    );

    onMounted(() => {
      const promise = axios.get(`${global.apiURL}/api/students`);
      promise.then((res) => {
        state.students = res.data;
        state.filteredStudents = state.students.filter((std) => {
          if (std.room) {
            return std.room.startsWith(state.room);
          }
        });
      });
    });

    return { state, student };
  },
};
</script>

<style scoped>
select {
  font-family: inherit;
  font-size: inherit;
  border: 1px solid var(--white);
  background: var(--white);
  border-radius: 1em;
  padding: 0 0.5em;
  outline: none;
}

table {
  margin-top: 1em;
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 0.5em 1em;
  border: solid 1px rgba(101, 119, 134, 0.5);
}

tr {
  cursor: pointer;
}

.center {
  text-align: center;
}
</style>
