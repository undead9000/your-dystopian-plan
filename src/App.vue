<template>
  <main class="main-wrapper">
    <RouterView />
  </main>
</template>

<style lang="scss">
@import "./assets/styles/styles.scss";
body{
  margin: 0 auto;
  padding: 0;
  height: 100vh;
  font-weight: normal;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  padding: 3px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  &:before{
    background-image: -moz-linear-gradient( -35deg, rgb(207,136,94) 0%, rgb(231,111,52) 100%);
    background-image: -webkit-linear-gradient( -35deg, rgb(207,136,94) 0%, rgb(231,111,52) 100%);
    background-image: -ms-linear-gradient( -35deg, rgb(207,136,94) 0%, rgb(231,111,52) 100%);
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    z-index: 0;
  }
  &:after{
    background-color: #15191c;
    width: calc(100% - 18px);
    height: calc(100% - 18px);
    position: absolute;
    top: 9px;
    left: 9px;
    display: block;
    z-index: 0;
    content: '';
    box-shadow: 0 0 10px inset rgb(231,111,52);
  }
}
.main-wrapper{
  position: relative;
  z-index: 1;
}

img {
  margin: 5px;
}
.plugins {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
}
</style>
