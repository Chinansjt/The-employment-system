<template>
    <div class="page account">
        <!-- 账户信息 -->
        <div class="account-info">
            <div class="account-balance">
                账户余额：
                <p><span>{{companyInfo.balance}}</span> 元</p>
            </div>
            <div class="account-income">
                <span>总收入：{{companyInfo.totalRevenue}} 元</span>
                <span>总支出：{{companyInfo.totalExpenses}} 元</span>
            </div>
        </div>
        <!-- 查询条件 -->
        <table class="form-search">
            <tr>
                <td>
                    <label class="form-label">交易时间：</label>
                    <DatePicker
                        type="daterange" 
                        :value="date" 
                        placeholder="请选择时间段" 
                        style="width: 280px"
                        format="yyyy-MM-dd"
                        @on-change="changeDate"
                        :editable="false"
                    />
                    <Button class="search-btn" type="primary" @click="onSearch">查询</Button>
                </td>
            </tr>
        </table>
        <!-- 账户列表 -->
        <Table :columns="columns" :data="accountList"/>
        <!-- 分页 -->
        <Page
            :current="pageNum" 
            :total="total" 
            :page-size="pageSize" 
            show-total 
            show-elevator
            @on-change="pageChange"
        />
    </div>
</template>

<script>
import Api from "@/plugins/api"
import { notify } from "@/plugins/utils"
import { mapState } from "vuex"

export default{
    data() {
        return {
            date: [],   
            accountList: [], // 账户列表
            columns: [{     // 账户列表表头设置
                title: "交易单号",
                key: "transactionNo",
                width: "190",
            },{
                title: "任务单号",
                key: "taskNo"
            },{
                title: "收入(元)",
                key: "income"
            },{
                title: "支出(元)",
                key: "expenditure"
            },{
                title: "账户余额(元)",
                key: "accountBalance"
            },{
                title: "说明备注",
                key: "remarks"
            },{
                title: "交易时间",
                key: "transactionTime",
                width: "190",
            }],
            total: 1,      // 总页数
            pageSize: 10,  // 每页数据
            pageNum: 1,    // 当前页数
        }
    },
    created(){
       this.getAccountList()
    },
    computed: {
        ...mapState(["companyInfo"])
    },
    methods: {
        // 改变交易时间
        changeDate(date){
            this.date = date
        },
        // 改变页数
        pageChange(page){
            this.pageNum = page
            this.getAccountList()
        },
        onSearch(){
            this.pageNum = 1
            this.getAccountList()
        },
        // 获取账户列表
        getAccountList(){
            // 请求参数封装
            let params = {
                pageNum: this.pageNum,
                showLoading: true
            }
            if(this.date.length){
                params.beginTime = this.date[0]
                params.endTime = this.date[1]
            }

            // 数据请求
            Api.getAccountList(params).then(res => {
                if(res.status == "1001"){
                    this.accountList = res.extData.list
                    this.total = res.extData.total
                    this.pageSize = res.extData.pageSize
                }else{
                    notify.error(res.message)
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.account{
    background-color: #fff;
    padding: 15px; 
    .account-info{
        margin: 15px 0 40px;
        font-size: 13px;
        padding: 0 15px 30px;
        border-bottom: 1px solid #eee;
        color: #555;
        .account-balance{
            p{
                font-size: 20px;
                color: #EA841F;
                margin: 15px 0 20px;
                span{
                    font-size: 32px;
                    margin-top: 10px;
                }
            }
        }
        .account-income span{
            margin-right: 30px;
        }
    }
    .search-btn{
        margin-left: 30px;
        width: 80px;
    }
}

</style>