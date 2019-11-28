<template>
    <div class="user-avator-dropdown">
        <span class="user-company">企业：{{companyInfo.companyName}}</span>
        <Dropdown @on-click="handleClick">
            <Avatar :src="companyInfo.avatarUrl"/>
            <span class="user-name ellipsis-one">{{companyInfo.userName}}</span>
            <Icon :size="18" type="md-arrow-dropdown"/>
            <DropdownMenu slot="list">
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import { mapActions } from "vuex"
import Api from "@/plugins/api"
export default {
    name: "User",
    props: {
        companyInfo: {
            default: ""
        }
    },
    methods: {
        ...mapActions([
            "handleLogOut"
        ]),
        logout () {
            Api.logout({showLoading: true}).then(res => {
                if(res.status === "1001"){
                    window.location.href = "/login"
                }
            })
        },
        handleClick (name) {
            switch (name) {
            case "logout": this.logout() 
                break;
            default: 
                break;
            }
        }
    }
}
</script>

<style lang="less">
.user{
    &-avator-dropdown{
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        .ivu-badge-dot{
            top: 16px;
        }
        .user-company{
            margin-right: 20px;
            vertical-align: middle;
        }
    }
    &-name{
        display: inline-block;
        max-width: 100px;
        font-size: 13px;
        margin: 0 5px;
        vertical-align: middle;
    }
}
</style>
