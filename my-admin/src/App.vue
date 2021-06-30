<template>
  <div id="app">
    <div class="content">
      <div class="header"></div>
      <div class="main">
        <div class="menu"></div>
        <div class="container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  font-family: Roboto,San Francisco,Helvetica Neue,Helvetica,Arial,PingFangSC-Light,Hiragina Sans GB,WenQuanYi Micro Hei,microsoft yahei ui,microsoft yahei,sans-serif;
  box-sizing: border-box;
}
ul,li{
  list-style-type: none;
}
a{
  text-decoration: none;
}
.content{
  width: 100vw;
  height: 100vh;
  .header{
    width: 100%;
    height: 48px;
    position: fixed;
    top: 0;
    left: 0;
    background: #262f3e;
  }
  .main{
    width: 100%;
    height: 100%;
    padding-top: 48px;
    display: flex;
    background: #f2f2f2;
    .menu{
      width: 100%;
      height: 100%;
      max-width: 200px;
      background: #1e222d;
    }
    .container{
      width: 100%;
      height: 100%;
      padding: 10px;
    }
  }
}
</style>
