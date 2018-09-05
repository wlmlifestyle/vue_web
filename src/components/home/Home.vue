<template>
  <el-container class="home_container">
    <el-header>
      <div class="left">
        <img src="../../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="collapse ? '65px':'200px'">
        <div class="toolBar" @click="collapse=!collapse">|||</div>
        <el-menu :collapse="collapse" :collapse-transition="false" unique-opened router class="el-menu-vertical-demo" background-color="#333744" text-color="#fff" active-text-color="#54a8ff">
          <el-submenu :index="item.id+''" v-for="(item,i) in menus" :key="item.id" :style="collapse ? 'width:65px':'width:200px'">
            <template slot="title">
              <i :class="['iconfont',iconlist[i]]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{subitem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import mix from './Home-mixins'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
  .el-header {
    user-select: none;
    padding-left: 0px;
    display: flex;
    justify-content: space-between;
    background: #373d41;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      color: #fff;
      img {
        margin-right: 10px;
        width: 50px;
      }
    }
  }
  .el-aside {
    user-select: none;
    background: #333744;
  }
  .el-main {
    background: #eaedf1;
  }
  .toolBar {
    color: white;
    cursor: pointer;
    font-size: 12px;
    text-align: center;
    background: #4a5064;
    line-height: 25px;
    letter-spacing: 0.1em;
  }
}
</style>
