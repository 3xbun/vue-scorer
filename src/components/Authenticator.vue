<template>
  <center>
    <h1>กรอกรหัสผ่าน</h1>
    <input type="password" placeholder="* * * * * * * *" /> <br />
    <button type="submit" @click="authenticate">ตกลง</button>
    <div class="error">* Error *</div>
  </center>
</template>

<script>
export default {
  setup() {
    const authenticate = () => {};
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
