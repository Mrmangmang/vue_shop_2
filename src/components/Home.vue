<template>
        <el-container class="home-container">
            <el-header>
                <div>
                    <img src="../assets/heima.png"/>
                    <span>这是一个后台</span>
                </div>
                <el-button type="info" @click="logout">退出</el-button>
            </el-header>
            <el-container>
<!--                侧边栏菜单区域-->
                <el-aside :width="togglebtn ?  '64px':'200px' "    >
                    <div   @click="toggle" class="toggle-button">|||</div>
                    <el-menu
                            :router="true"
                            :collapse-transition="false"
                            :collapse="togglebtn"
                            :unique-opened="true"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
<!--                        一级菜单-->
                        <el-submenu   :index="'/'+item.path"  v-for="item in menulist"   >
                            <template slot="title">
                                <i :class='iconobj[item.id]'></i>
                                <span>{{item.authName}}</span>
                            </template>
<!--                            二级菜单-->
                            <el-menu-item  :index="'/'+subitem.path " v-for="subitem in item.children" >
                               <template>
                                   <i class="el-icon-s-order"></i>
                                   <span>{{subitem.authName}}</span>
                               </template>
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
    export default {
        data(){
            return{
                // queryInfo:{
                //     query:'',
                //     pagenum:'1',
                //     pagesize:'10'
                // },
                //左侧菜单数据
                menulist:[

                ],
                iconobj:{
                    '125':'iconfont icon-user',
                    '103':'iconfont icon-shangpin',
                    '101':'iconfont icon-baobiao',
                    '102':'iconfont  icon-volumemeasurement',
                    '145':'iconfont icon-danju'
                },
                togglebtn:false
            }
        },
        created() {
           this.getMenus()
        },
        methods:{
            //折叠方法
            toggle(){
                this.togglebtn=!this.togglebtn
            },
            logout(){
                window.sessionStorage.clear()
                this.$router.push('/login')
            },
          async getMenus(){
             const {data:res} = await this.$http.get('menus')
              // console.log(res)
              if(res.meta.status !==200)  return this.$message.error(res.meta.msg)
              this.menulist = res.data
              console.log(res)
            }
        }
    }
</script>

<style lang="less" scoped>

    .home-container{
        height: 100%;
    }
    .el-header{
        background-color: #55a532;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0;
        >div{
            display: flex;
            align-items: center;
            span{
                margin-left: 15px;
            }
        }
    }
    .el-aside{
        background-color: #9a6e3a;
        div{
            background-color: #eeeeee;
            font-size: 10px;
            line-height: 24px;
            color: #fffdef;
            text-align: center;
            letter-spacing: 0.2em;
            cursor: pointer;
        }
    }
    .el-main{
        background-color: #0077aa;
    }
    .el-menu{
        border-right: 0px;
        span{
            margin-left: 15px;
        }
    }


</style>-