<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 頭像區域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登錄表單區域 -->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        :rules="loginFormRules"
        class="login_form"
        :model="loginForm"
      >
        <!-- 用戶名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密碼 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <!-- 按鈕區域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登錄</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 這是登錄表單的數據綁定對象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 這是表單的驗證規則對象
      loginFormRules: {
        // 驗證用戶名是否合法
        username: [
          { required: true, message: "請輸入登錄名稱", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 驗證密碼是否合法
        password: [
          { required: true, message: "請輸入登錄密碼", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 點擊重置按鈕重置登錄表單
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 表單登錄與驗證，先獲取表單的引用對象，然後調用validate進行表單預先校驗，會有一個Boolean值，valid為true表單驗證成功，反之亦然
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200) return this.$message.error("登录失败！");
        this.$message.success("登录成功！");
        // 1. 将登录成功后的 token， 保存到客户端的 sessionStorage中
        //  1.1 项目中除了登录之外的其他api接口，必须在登录之后才能访问
        //  1.2 token 只应存在在当前网站的打开期间，所以将token保存在sessionStroage中
        console.log(res);
        window.sessionStorage.setItem("token", res.data.token);
        // 2. 通过编程式导航跳转到后台主页， 路由地址是 /home
        this.$router.push("/home");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>