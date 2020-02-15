<template>
  <div id="app">

    <transition name="fade" mode="out-in">
      <!--路由占位符 -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
	margin: 0px;
	padding: 0px;
	font-family: Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,  SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
  }

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}
</style>
