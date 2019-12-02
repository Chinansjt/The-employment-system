<template>
	<div class="app_base">
		<!-- <transition name="router-fade" mode="out-in">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition> -->

		<!-- 全局loading -->
		<div v-if="isLoading" class="loading">
			<van-loading class="vant-loading" type="spinner" color="white"/>
		</div>
        <router-view></router-view>
	</div>
</template>
<script>
import Vue from "vue";
import {mapState } from "vuex";
import { Loading } from "vant";
Vue.use(Loading)
export default {
	data() {
		return {};
    },

    created() {
        var UA = window.navigator.userAgent.toLocaleLowerCase();
        if (/iphone|ipad|ipod/.test(UA)) {
            //ios
            window.mobileType = "ios";
        } else {
            //其他手机
            window.mobileType = "and";
		}
	},
	computed: {
        ...mapState({
			isLoading: "isLoading",
        }),
       
	
    },
};
</script>

<style lang="scss">
@import "./style/common";
@import "./style/mixin";
.router-fade-enter-active,
.router-fade-leave-active {
	transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
	opacity: 0;
}
.loading {
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99999;
	background-color: rgba(0, 0, 0, 0.35);
	.vant-loading {
		position: absolute;
		width: 70rpx;
		height: 70rpx;
		left: 50%;
		top: 50%;
		margin-left: -35rpx;
		margin-top: -35rpx;
	}
}

// 弹出层pop代码，后期要封装成组件
.van-popup--left {
	width: 100%;
	height: 100%;
}
.app_popup .van-overlay {
	background-color: #fff;
}
.popup_page {
	position: relative;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	max-width: 750px;
	background: url(http://cdn.qiyingfu.com/qyfcdn/2019/01/29/06_01_39_9EyW8G9yuCvaNaxt.png)
		center center no-repeat;
	background-size: 257rpx auto;

	.popup_iframe {

	}

    .popup_iframe_and {
        width: 100%;
        height: 100%;
    }
    .popup_iframe_ios {
        width: 750rpx !important;
        height: 100%;
    }

}
.popup_close {
    position: fixed;
    right: 15rpx;
    bottom: 120rpx;
    z-index: 8000;
    width: 100rpx;
    height: 100rpx;
    background: url(http://cdn.qiyingfu.com/qyfcdn/2019/02/02/04_41_48_PfRhADKXxArgG6CH.png)
        center center;
    background-size: 100% auto;
}
// 弹出层pop代码，后期要封装成组件
</style>
