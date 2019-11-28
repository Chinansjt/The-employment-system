<template>
    <div class="error-page">
        <div class="content-con">
            <img :src="src">
            <p class="error-desc">{{ desc }}</p>
            <div class="back-home">
                <b>{{this.second}}s</b> 后自动返回首页 
                <Button size="large" type="primary" @click="backHome">返回首页</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "error_content",
    data(){
        return {
            second: 5,
            timer: null
        }
    },
    props: {
        desc: String,
        src: String
    },
    mounted(){
        this.timer = setInterval(() => {
            if (this.second === 0) {
                this.backHome()
            }else {
                this.second--
            }
        }, 1000)
    },
    methods: {
        backHome () {
            this.$router.replace({
                name: "home"
            })
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>
