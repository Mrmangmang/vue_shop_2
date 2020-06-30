<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="15">
                    <el-input  clearable v-model="queryInfo.query">
                        <el-button @click="getUserList" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="9">
                    <el-button @click="dialogVisible = true" type="primary">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table
                    :data="userlist"
                    border
                    stripe
            >
                <el-table-column type="index" label="序号" ></el-table-column>
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column prop="mg_state" label="状态">
                    <template v-slot="scope">
<!--                        {{scope.row}}-->
                        <el-switch
                                v-model="scope.row.mg_state"
                                @change="userStateChange(scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column  label="操作">
                    <template v-slot="scope">
                        <el-button size="mini" icon="el-icon-edit"></el-button>
                        <el-button  size="mini" icon="el-icon-share"></el-button>
                        <el-button size="mini" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--                分页-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 3, 10]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
<!--        添加用户对话框-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                >
<!--            内容主体-->
           <el-form label-width="100px" :model="dialogRuleForm" :rules="dialogRules" >
               <el-form-item size="medium" label="名称" prop="name">
                   <el-input v-model="dialogRuleForm.name"></el-input>
               </el-form-item>
               <el-form-item label="名称" prop="name">
                   <el-input v-model="dialogRuleForm.name"></el-input>
               </el-form-item>
               <el-form-item label="名称" prop="name">
                   <el-input v-model="dialogRuleForm.name"></el-input>
               </el-form-item>
               <el-form-item label="名称" prop="name">
                   <el-input v-model="dialogRuleForm.name"></el-input>
               </el-form-item>
           </el-form>
<!--            底部区域-->
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                //对话框验证数据绑定对象
                dialogRuleForm:{
                  name:''
                },
                //对话框验证规则
                dialogRules:{
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
              queryInfo:{
                  query:'',
                  pagenum:1,
                  pagesize:2
              },
                userlist:[],
                total:0,
                dialogVisible:false
            }

        },
        created() {
            this.getUserList()
        },
        methods:{
            //用户状态修改
           async userStateChange(userinfo){
                // console.log(userinfo)
                // users/:uId/state/:type
            const {data:res}   = await this.$http.put(`users/${userinfo.id}/state/${userinfo.status}`)
                console.log(res)
               userinfo.mg_status = ! userinfo.mg_status
               if(res.meta.status!==200) return this.$message.error('更新用户失败')
               this.$message.success('更新用户成功')
            },
            handleSizeChange(newsize){
                console.log(newsize)
                this.queryInfo.pagesize = newsize
                this.getUserList()
            },
            handleCurrentChange(newcurrent){
                console.log(newcurrent)
                this.queryInfo.pagenum = newcurrent
                this.getUserList()
            },
           async getUserList() {
        const{data:res}  = await this.$http.get('users',{params:this.queryInfo})
               if(res.meta.status!==200) return this.$message.error('获取失败')
               this.userlist=res.data.users
               this.total=res.data.total
               // console.log(res)
            }
        }
    }
</script>

<style lang="less" scoped>
   .el-card{
       margin-top: 10px;
       .el-table{
           margin-top: 10px;
       }
   }
    .el-pagination{
        margin-top: 5px;
    }
</style>