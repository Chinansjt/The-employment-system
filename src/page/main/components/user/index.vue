<template>
  <div class="user">
    <div :style="{opacity: opacity}" class="user_information">
      <van-image
        width="5rem"
        round
        fit="cover"
        height="5rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="user_information_box">
        <div class="user_information_name">宁柏森</div>
        <div class="user_information_code">16920523</div>
        <div class="user_information_profession">电子信息工程</div>
      </div>
      <div class="user_information_circle">
        <van-circle
          v-model="currentRate"
          :rate="90"
          :size="size"
          :color="gradientColor"
          :speed="100"
          :text="chang ? text : ''"
        />
      </div>
    </div>

    <div id="searchBar" class="user_tab margin_20">
      <van-grid :border="false">
        <van-grid-item :to="{ path: '/user/resume'}" icon="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E7%AE%80%E5%8E%86.png" text="在线简历" />
        <van-grid-item icon="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E7%AB%8B%E5%8D%B3%E6%8A%95%E9%80%92.png" text="我的投递" />
        <van-grid-item icon="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E5%85%AC%E5%8F%B8%20%284%29.png" text="关注公司" />
        <van-grid-item icon="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E6%94%B6%E8%97%8F.png" text="职位收藏" />
      </van-grid>
    </div>
    <div class="margin_20 user_img">
      <img src="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/WechatIMG1.jpeg" alt />
    </div>
    <div class="user_nav margin_20">
      <van-cell icon="location-o" title="求职意向" is-link to="index" />
      <van-cell icon="location-o" title="路由跳转" is-link to="index" />
      <van-cell icon="location-o" title="路由跳转" is-link to="index" />
      <van-cell icon="location-o" title="路由跳转" is-link to="index" />
      <van-cell icon="location-o" title="路由跳转" is-link to="index" />
    </div>
  </div>
</template>

<script>
// import Api from "@/plugins/api"
import Vue from "vue";
import {
  Sticky,
  Image,
  Row,
  Col,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Circle
} from "vant";

Vue.use(Sticky)
  .use(Image)
  .use(Cell)
  .use(CellGroup)
  .use(Grid)
  .use(Circle)
  .use(GridItem)
  .use(Row)
  .use(Col);
export default {
  name: "User",
  data() {
    return {
      currentRate: 0,
      text: "简历完善度90%",
      gradientColor: {
        "0%": "#f01313",
        "100%": "#008000"
      },
      opacity: 1, //头部背景渐变
      beforeScrollTop: 0,
      size: 100, //圆的大小
      chang: true //是否显示圆中文字
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var scroll = scrollTop - this.beforeScrollTop;
      this.beforeScrollTop = scrollTop;

      if (scroll < 0) {
        this.opacity += 0.01;
        this.size += this.size > 100 ? "" : 1;
      } else {
        this.opacity -= 0.01;
        this.size -= 1;
        this.chang = false;
      }
      if (scrollTop == 0) {
        this.opacity = 1;
        this.size = 100;
        this.chang = true;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="less" scoped>
.margin_20 {
  margin: 0 20rpx;
}
.user {
  background-color: #f5f5f5;
  //   height: 100%;
  .user_information {
    position: fixed;
    top: 0rpx;
    width: 100%;
    padding: 0 20rpx;
    height: 400rpx;
    display: flex;
    align-items: center;
    background: linear-gradient(left, #79dfaa, #07c160);
    background: -ms-linear-gradient(left, #79dfaa, #07c160);
    background: -webkit-linear-gradient(left, #79dfaa, #07c160);
    background: -moz-linear-gradient(left, #79dfaa, #07c160);
    img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      background-size: cover;
    }
    .user_information_box {
      margin-left: 30rpx;
      div {
        height: 50rpx;
        line-height: 50rpx;
        color: #f5f5f5;
        font-size: 30rpx;
      }
      .user_information_name {
        font-size: 40rpx;
      }
    }
    .user_information_circle {
      margin-left: 100rpx;
    }
  }
  .user_img {
    height: 400rpx;
    padding-top: 50rpx;
    position: relative;
    z-index: 100;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .user_tab {
    border-radius: 10rpx;
    margin-top: 325rpx;
    height: 150rpx;
  }
  .user_nav {
    padding-top: 50rpx;
    border-radius: 100rpx;
  }
}
/deep/ .van-grid-item__content--center:nth-child(1) {
  // border-radius: 10px;
}
</style>
