<template>
  <div class="splash-screen">
    <img src="../assets/logo.png" />
  </div>
</template>
<style lang="scss">
  .splash-screen{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    & img{
      opacity: 0;
      animation: splashAnimation 3s ease-in-out forwards;
      animation-delay: 0.5s;
    }
  }

  @keyframes splashAnimation {
    0% {
      opacity: 0; /* Start with transparency */
    }
    20% {
      opacity: 1; /* Gradually appear within the first 20% of animation duration */
    }
    80% {
      opacity: 1; /* Stay fully visible for the next 60% of animation duration */
    }
    100% {
      opacity: 0; /* Fade away in the final 20% of animation duration */
    }
  }
</style>
