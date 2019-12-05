<template>
  <div class="resumeList">
    <van-nav-bar
      title="简历列表"
      fixed
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="resumeList_circle">
      <van-circle
        class="circle"
        v-model="currentRate"
        size="180px"
        :rate="rate"
        :speed="100"
        :text="text"
      />
    </div>
    <div class="resumeList_but_box">
      <van-button :to="{ path: '/user/resume'}" class="resumeList_but" type="primary">添加简历</van-button>
      <!-- <van-button  class="resumeList_but" type="primary">添加简历</van-button> -->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {mapState, Store} from "vuex"
import { Circle, Button, NavBar } from "vant";

Vue.use(Circle)
  .use(Button)
  .use(NavBar);
export default {
  data() {
    return {
      currentRate: 0,
      rate: this.$store.state.resumeComplete,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6"
      }
    };
  },
  computed: {
    text() {
      return `简历完成度${this.currentRate.toFixed(0)}%`;
    },
  },
  created: {
      
  }
};
</script>
<style lang="scss" scoped>
.resumeList {
  height: 100vh;
  background: linear-gradient(left, #79dfaa, #07c160);
  background: -ms-linear-gradient(left, #79dfaa, #07c160);
  background: -webkit-linear-gradient(left, #79dfaa, #07c160);
  background: -moz-linear-gradient(left, #79dfaa, #07c160);
  .resumeList_circle {
    height: 900rpx;
    .circle {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .resumeList_but_box {
    .resumeList_but {
      margin-top: 30rpx;
      position: relative;
      left: 50%;
      width: 80%;
      transform: translateX(-50%);
      font-size: 40rpx;
      height: 90rpx;
      line-height: 90rpx;
      border-radius: 10rpx;
      background-color: #2f23b3;
    }
  }
}
/deep/ .van-circle__text {
  color: #323233;
  font-weight: 500;
  font-size: 40rpx;
  line-height: 1.325rem;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>