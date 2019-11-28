<template>
	<Button 
        @click="getCode"
        :style="myStyle"
        class="code-btn" 
        :class="{'btn-disabled': isSend}"
        :loading="loading"
    >
        {{content}}
	</Button>
</template>

<script>
import { notify, isPhone } from "@/plugins/utils";
import Api from "@/plugins/api";

export default {
    props: ["phone", "type", "myStyle", "isReset"],
    data() {
        return {
            content: "获取验证码",
            isSend: false,
            timer: null,
            loading: false,
        }
    },
    watch: {
        // 监听isReset，为true时，初始化组件
        "isReset": function(newVal, oldVal){
            this.isSend = false
            this.content = "获取验证码"
            clearTimeout(this.timer)
            this.timer = null
        }
    },
    methods: {
        getCode() {
            if(this.isSend){
                return
            }
            if (!isPhone(this.phone)) {
                notify.error("请输入正确的手机号！");
                return;
            }
            this.loading = true
            Api.getVerifyCode({ phone: this.phone, 
            type: this.type }).then(res => {
                this.loading = false
                if(res.status == "1001"){
                    this.$emit("getCode", res.extData.bizNo);
                    this.timeChange();
                }else{
                    notify.error(res.message);
                }
            });
        },
        timeChange() {
            let self = this;
            let format = "ss重发";
            let count = 60;
            down();
            function down(){
                self.content = format.replace(/s/, count);
                count--;
                if (count < 0) {
                    self.content = "重新获取";
                    self.isSend = false;
                    clearTimeout(self.timer);
                    self.timer = null;
                } else {
                    self.isSend = true;
                    self.timer = setTimeout(down, 1000);
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

.code-btn {
	width: 110px;
    text-align: center;
    background: $mainColor;
	color: #fff;
    font-size: 14px;
    cursor: pointer;
    border-radius: 0;
    border: none;
    &:hover{
        background-color: $hoverColor;
    }
}
.btn-disabled {
	background: #dcdcdc;
    color: #999;
    &:hover{
        background-color: #dcdcdc;
    }
}
</style>