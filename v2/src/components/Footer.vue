<template>
  <footer>
    Made with <i class="fa fa-heart pulse red"></i> for Materdei School's
    Student <br />
    <a href="mailto:bunnasorn.k@m.materdei.ac.th">Bunnasorn Kaewsiri</a>
    All Rights Reserved <br />

    This work is licensed under a
    <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
      >Creative Commons Attribution 4.0 International License</a
    >.
  </footer>
</template>

<script>
export default {};
</script>

<style>
footer {
  background-color: #15202b;
  grid-area: footer;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 0.7em;
  color: #657786;
  padding: 0.5em 1em;
  text-align: center;
}

footer > .red {
  color: #ff4b4b;
  animation: pound 0.35s infinite alternate;
  -webkit-animation: pound 0.35s infinite alternate;
}

@-webkit-keyframes pound {
  to {
    transform: scale(1.1);
  }
}

@keyframes pound {
  to {
    transform: scale(1.1);
  }
}
</style>
