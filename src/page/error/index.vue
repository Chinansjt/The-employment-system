<template>
  	<error-content desc="Oh~~您的页面好像飞走了~" src="//cdn.qiyingfu.com/qyfcdn/2019/10/12/05_30_10_z8SXvawvRCHOIbJz.png!p80"/>
</template>

<script>
import errorContent from "./error-content.vue"
export default {
    name: "error",
    components: {
        errorContent
    },
    data () {
        return{}
    }
}
</script>
<style lang="scss">
.error-page{
	width: 100%;
	height: 100%;
	position: relative;
	background: #f8f8f9;
	.content-con{
		width: 1000px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -60%);
		text-align: center;
		img{
			display: block;
			width: 100%;
		}
		.error-desc{
			font-size: 22px;
			margin: 20px 0 30px;
		}
		.back-home{
			margin-top: 25px;
			font-size: 14px;
			color: #999;
			b{
				font-size: 15px;
			}
			.ivu-btn{
				margin-left: 10px;
			}
		}
	}
}
</style>
