<template>
  <div class="login_container">
    <div class="avatar">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" class="loginForm">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username">
          <i slot="prefix" class="iconfont icon-user"></i>
        </el-input>

      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" @keyup.enter.native="login">
          <i slot="prefix" class="iconfont icon-3702mima"></i>
        </el-input>

      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入当前 .vue 文件配置的行为
import mix from './Login-mixins'
export default {
  // 把外界导入的行为 通过mixins属性 混入到当前组建件中生效
  mixins: [mix]
}
</script>
<style lang="less" scoped>
.login_container {
  width: 450px;
  height: 304px;
  background: #fff;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar {
    background: #fff;
    width: 130px;
    height: 130px;
    border: 2px solid #eee;
    border-radius: 50%;
    padding: 7px;
    box-shadow: 0 0 10px #ccc;
    position: absolute;
    left: 50%;
    // top:0;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      border-radius: 50%;
      background: #eee;
    }
  }
  .loginForm {
    width: 100%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    padding: 0 20px;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
