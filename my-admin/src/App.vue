<template>
  <div id="app">
    <div class="header"></div>
    <div class="main">
      <div class="main_menu"></div>
      <div class="main_content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  ul{
    list-style-type: none;
  }
  a{
    text-decoration: none;
  }
}
.header{
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  background: #1e222d;
}
.main{
  height: 100vh;
  display: flex;
  padding-top: 60px;
  background: #f2f2f2;
  .main_menu{
    width: 200px;
    background: #1e222d;
  }
  .main_content{
    width: 100%;
    overflow: auto;
    padding: 10px 10px 0 10px;
  }
}

</style>
