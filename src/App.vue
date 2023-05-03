<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    background: #fff;
    height: 100%;
  }
  #app{
    height: 100%;
    overflow: auto;
  }
  a{
    text-decoration: none;
  }
</style>
