<template>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "loader",
};
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Creating the dots */
span {
  height: 0.5em;
  width: 0.5em;
  margin-right: 1em;
  border-radius: 50%;
  background-color: grey;
  animation: loading 1s linear infinite;
}
/* Creating the loading animation*/
@keyframes loading {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(15px);
  }
  50% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(0);
  }
}

span:nth-child(1) {
  animation-delay: 0.1s;
}
span:nth-child(2) {
  animation-delay: 0.2s;
}
span:nth-child(3) {
  animation-delay: 0.3s;
}
span:nth-child(4) {
  animation-delay: 0.4s;
}
span:nth-child(5) {
  animation-delay: 0.5s;
}
</style>
