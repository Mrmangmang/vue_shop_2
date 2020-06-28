<template>
    <div class="login_container">
        <div class="login_form">
            <div class="login_form_img">
                <img src="../assets/logo.png" height="200" width="200"/>
            </div>
<!--            登录表单区域-->
            <el-form ref="LoginFormRef" :rules="LoginFormRules" :model="LoginForm" class="login_form_in">
<!--                //用户名-->
                <el-form-item prop="username">
                    <el-input   v-model="LoginForm.username" prefix-icon="iconfont icon-user" ></el-input>
                </el-form-item>
<!--                密码-->
                <el-form-item prop="password">
                    <el-input  v-model="LoginForm.password" prefix-icon="iconfont icon-password"></el-input>
                </el-form-item>
<!--                按钮区域-->
                <el-form-item class="btns">
                    <el-button @click="login">登录</el-button>
                    <el-button @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                LoginForm:{
                    username:'admin',
                    password:'123456'
                },
                LoginFormRules:{
                    username:[
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            // 点击重置按钮，重置整个表单
            resetLoginForm(){
                this.$refs.LoginFormRef.resetFields();
            },
            //登录按钮
            login(){
                this.$refs.LoginFormRef.validate(async valid=>{
                    // console.log(valid)
                    // return this.$message.('登录')
                     const {data:res} =await this.$http.post('login',this.LoginForm)
                    if(res.meta.status!==200) {
                        return this.$message.error('登录失败')
                    }
                    this.$message.success('登录成功')
                    window.sessionStorage.setItem('token',res.data.token)
                    this.$router.push('/home')
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container{
       background-color: darkgreen;
       height: 100%;
   }
    .login_form{
        width: 450px;
        height: 300px;
        background-color: white;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
        .login_form_img{
            width: 120px;
            height: 120px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #dddddd;
            position: absolute;
            left: 50%;
            background-color:#dddddd;
            /*top: -50%;*/
            transform: translate(-50%,-50%);
            img{
                height: 100%;
                width: 100%;
                border-radius: 50%;
                background-color: #eeeeee;
            }
        }
    }
    .login_form_in{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
</style>