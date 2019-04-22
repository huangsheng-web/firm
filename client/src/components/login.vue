<template>
  <div class="vl_login">
    <div class="vl_login_content">
      <div class="lg_main">
        <div class="lg_fm">
          <div class="lg_logo vl_icon vl_icon_lg_logo" style="">
            后台登录
          </div>
          <el-form :inline="false" ref="loginForm" :model="loginForm" class="lg_form">
            <el-form-item prop="userMobile" class="login_form_item">
              <el-input v-model="loginForm.userMobile" placeholder="输入用户名"></el-input>
              <i class="vl_icon vl_icon_lg_01"></i>
            </el-form-item>
            <el-form-item prop="userPassword" class="login_form_item">
              <el-input v-model="loginForm.userPassword" type="password" placeholder="输入密码"></el-input>
              <i class="vl_icon vl_icon_lg_02"></i>
            </el-form-item>
          </el-form>
          <div class="lg_btn">
            <el-button  @click="loginSubmit()" :loading="loginBtnLoading" :disabled="!loginForm.userMobile || !loginForm.userPassword" >登&nbsp;&nbsp;录</el-button>
            <el-button style="margin-left: 20px;" @click="showDialog" >修改密码</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="修改账号密码"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="400px">
      <el-dialog
        width="200px"
        title="修改成功"
        :visible.sync="innerVisible"
        append-to-body>
        <el-button style="margin-left: 50px;" type="primary" @click="hideDialog">确定</el-button>
      </el-dialog>
      <el-form :model="reviseInfo" :rules="rules" ref="ruleForm1" class="demo-ruleForm1" style="margin-top: 30px;">
        <el-form-item prop="oldName">
          <el-input v-model="reviseInfo.oldName" placeholder="请输入旧的账号名"></el-input>
        </el-form-item>
        <el-form-item prop="newName">
          <el-input v-model="reviseInfo.newName" placeholder="请输入新的账号名"></el-input>
        </el-form-item>
        <el-form-item prop="oldPass">
          <el-input v-model="reviseInfo.oldPass" placeholder="请输入旧的密码"></el-input>
        </el-form-item>
        <el-form-item prop="newPass">
          <el-input v-model="reviseInfo.newPass" type="password" placeholder="请输入新的密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPass">
          <el-input v-model="reviseInfo.confirmPass" type="password" placeholder="请再次输入新的密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" :loading="reviseLoading" type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      var checkPass = (rule, value, callback) => {
        if (value) {
          if (value !== this.reviseInfo.newPass) {
            return callback(new Error('两次密码必须一致'));
          }
        } else {
          return callback(new Error('密码不能为空'))
        }
        callback();
      }
      return {
        dialog2: false,
        innerVisible: false,
        loginForm: {
          userMobile: '',
          userPassword: ''
        },
        reviseInfo: {
          oldName: '',
          oldPass: '',
          newName: '',
          newPass: '',
          confirmPass: ''
        },
        rules: {
          oldName: [{required: true, message: '账号不能为空', trigger: blur}],
          oldPass: [{required: true, message: '密码不能为空', trigger: blur}],
          newName: [{required: true, message: '账号不能为空', trigger: blur}],
          newPass: [{required: true, message: '密码不能为空', trigger: blur}],
          confirmPass: [{validator: checkPass, trigger: blur}]
        },
        loginBtnLoading: false,
        reviseLoading: false
      }
    },
    mounted () {
    },
    methods: {
      loginSubmit () {
        this.loginBtnLoading = true;
        this.axios.post('http://118.25.36.60:8081/login', this.loginForm)
            .then(res => {
              if (res && res.data.code === '00000000') {
                this.loginBtnLoading = false;
                this.$router.push({name: 'admin', params: {sd: true}})
              } else {
                this.loginBtnLoading = false;
                this.$message.error('用户名或密码错误')
              }
            })
      },
      onSubmit () {
        this.reviseLoading = true;
        this.$refs.ruleForm1.validate((valid) => {
          if (valid) {
            this.axios.post('http://118.25.36.60:8081/updateUserInfo', this.reviseInfo)
                .then(res => {
                  if (res && res.data.code === '00000000') {
                    this.reviseLoading = false;
                    this.innerVisible = true;
                  } else {
                    this.reviseLoading = false;
                    this.$message.error('修改失败，原账号密码输入错误')
                  }
                })
          } else {
            this.reviseLoading = false;
            return false;
          }
        });
      },
      showDialog () {
        this.dialog2 = true;
        this.reviseInfo = {
          oldName: '',
          oldPass: '',
          newName: '',
          newPass: '',
          confirmPass: ''
        }
      },
      hideDialog () {
        this.innerVisible = false;
        this.dialog2 = false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .vl_login {
    height: 100%;
    background: -webkit-linear-gradient(to right bottom, #28A0FF, #017CFF);
    background: -moz-linear-gradient(to right bottom, #28A0FF, #017CFF);
    background: linear-gradient(to right bottom, #28A0FF, #017CFF);
    .vl_login_content {
      position: relative;
      height: 100%;
      min-height: 700px;
      background: url(../assets/login_bg.png) center bottom no-repeat;
      background-size: 100% auto;
      > .lg_main {
        position: absolute; top: 50%; left: 50%;
        width: 488px; height: 520px;
        margin-left: -244px; margin-top: -265px;
        > .lg_fm {
          height: 436px;
          padding: 0 50px;
          background-color: #fff;
          border-radius: 6px;
          box-shadow: 0 0 5px #ddd;
          animation: fadeIn .6s ease-out both;
          .lg_logo {
            height: 160px;font-size: 40px;
            text-align: center;
            line-height: 160px;
          }
          .lg_form {
          }
          .lg_info {
            padding-bottom: 20px;
            overflow: hidden;
            a {
              color: #0C70F8;
              cursor: pointer;
              &:hover {
                text-decoration: none;
              }
            }
            span {
              float: right;
            }
          }
          .lg_btn {
            text-align: center;
            .default_btn {
              width: 100%;
              background-color: #0C70F8;
              color: #fff;
              &:hover {
                opacity:0.85;
              }
            }
            .disabled_btn {
              width: 100%;
              background-color: #F2F2F2;
              color: #B2B2B2;
            }
          }
        }
        > .lg_vc {
          position: absolute; bottom: 0; left: 0;
          width: 100%; height: 60px; line-height: 60px;
          background-color: #fff;
          border-radius: 6px;
          color: #0088FA; font-size: 14px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 0 5px #ddd;
          animation: fadeInUp .4s ease-out .2s both;
          > div {
            position: absolute; bottom: 84px;
            width: 100%;
            text-align: center;
            box-shadow: 0 0 5px #ddd;
            background-color: #fff;
            border-radius: 2px;
            animation: fadeIn .4s ease-out both;
            > div {
              width: 200px;
              margin: 0 auto; padding: 40px 0;
            }
            &::after {
              border-bottom-color: rgba(0, 0, 0, 1);
              content: "";
              display: inline-block;
              position: absolute;
              left: 50%;
              margin-left: -15px;
              bottom: -18px;
              border-top: 18px solid #fff;
              border-left: 18px solid transparent;
              border-right: 18px solid transparent;
            }
          }
          &:hover {
            > div {
              display: block;
            }
          }
        }
      }
    }
  }
  .login_form_item {
    .el-form-item__content {
      position: relative;
      .vl_icon_lg_01 {
        position: absolute; top: 12px; left: 12px;
      }
      .vl_icon_lg_02 {
        position: absolute; top: 12px; left: 12px;
      }
      .vl_icon_lg_03 {
        position: absolute; top: 12px; right: 12px;
        cursor: pointer;
      }
    }
  }
  .lg_footer {
    position: absolute; bottom: 20px; left: 0;
    animation: fadeIn .6s ease-out .4s both;
  }
</style>