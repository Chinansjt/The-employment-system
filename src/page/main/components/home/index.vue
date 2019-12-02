<template>
  <div class="home">
    <transition name="head">
      <div v-if="!isShow">
        <van-search placeholder="输入公司或职位"  @blur="onBlur" @focus = "onFocus" show-action :background="backgroundColor" shape="round">
          <div slot="action">搜索</div>
        </van-search>
        <van-swipe indicator-color="#07c160" :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img width="100%" v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
        <div class="home_nav">
          <van-grid :gutter="10" clickable :column-num="3">
            <van-grid-item :to="{ path: 'coming'}">
              <div class="home_nav_box">
                <span>来校招聘</span>
                <img
                  src="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/wb_%E5%AD%A6%E6%A0%A1%20%281%29.png"
                />
              </div>
            </van-grid-item>
            <van-grid-item :to="{path: 'preach'}">
              <div class="home_nav_box">
                <span>宣讲会</span>
                <img
                  src="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E6%BC%94%E8%AE%B2.png"
                />
              </div>
            </van-grid-item>
            <van-grid-item :to="{path: 'elction'}">
              <div class="home_nav_box">
                <span>双选会</span>
                <img
                  src="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E9%80%89%E6%8B%A9.png"
                />
              </div>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="home_line"></div>
        <van-notice-bar
          color="#1989fa"
          mode="closeable"
          background="#ecf9ff"
          left-icon="volume-o"
        >1. React， Redux 等 React 技术相关技术栈，对各类框架和工具底层原理有深入理解。 2. Node.js 后端开发能力，能够完成各类中间层业务的开发，同时具备一定的服务器运维能力，能够追踪线上问题 3. 对webpack有较深入了解，能够根据业务熟练配置webpack 4. 对前端代码设计具备深刻思考，能够优雅设计工程代码 5. 具备canvas，svg，webgl 等数据可视化开发能力 6. css3，html5，js原生基础牢靠 7. 对新技术保持关注，技术储备丰富 8. 有独立思考及技术创新，由开源项目或工具类产品是非常重要的加分项。 9. 欢迎带团加入，团队职位充足。 10. 对特定技术有深入研究，如机器学习等方面，是额外加分项。</van-notice-bar>
      </div>
    </transition>
    <div class="home_jobs">
      <div id="searchBar" :class="{'is_show': isShow}">
        <van-cell title="WEB前端" is-link value="求职意向" />
        <!-- <van-divider /> -->
      </div>

      <transition name="fade">
        <div v-if="isShow" class="is_fixed van-cell">
          <div class="home_top">
            <span>WEB前端</span>
            <van-icon name="arrow" class="home_top_arrow" />
            <van-icon
              @click="toTop"
              class="home_top_top"
              size="1.8rem"
              name="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8%20%284%29%20%281%29.png"
            ></van-icon>
          </div>
        </div>
      </transition>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :offset="500"
          @load="getJobsList"
          class="home_jobs_list"
        >
          <div v-for="item in jobsList">
            <router-link :to="{ path: 'details', params: { job_id: item.job_id }}">
              <div class="home_jobs_box">
                <div class="home_jobs_box_img">
                  <img :src="item.img" />
                </div>
                <div class="home_jobs_box_info">
                  <span>{{item.jobName}}</span>
                  <span>{{item.salary}}</span>
                  <span>{{item.company}}</span>
                  <span>{{item.date}}</span>
                  <span>{{item.address}}｜{{item.nature}}｜{{item.education}}</span>
                </div>
                <van-divider />
              </div>
            </router-link>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getJobsList } from "@/plugins/api";
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  Image,
  Icon,
  NavBar,
  Divider,
  Cell,
  Search,
  NoticeBar,
  PullRefresh,
  List
} from "vant";
import { type } from "os";

Vue.use(Swipe)
  .use(Grid)
  .use(Image)
  .use(GridItem)
  .use(SwipeItem)
  .use(NavBar)
  .use(Icon)
  .use(PullRefresh)
  .use(Divider)
  .use(List)
  .use(Cell)
  .use(Search)
  .use(NoticeBar)
  .use(Lazyload);
export default {
  data() {
    return {
      images: [
        "https://papaning.oss-cn-hangzhou.aliyuncs.com/images/WechatIMG1.jpeg",
        "https://papaning.oss-cn-hangzhou.aliyuncs.com/images/WechatIMG1.jpeg"
      ],
      loading: false,
      finished: false,
      jobsList: [],
      jPageNum: "1",
      backgroundColor: "transparent",
      isFixed: false, //设置吸顶
      isShow: false, //是否显示顶部内容
      isLoading: false //下拉刷新
    };
  },
  created() {
    //   this.getJobsList()
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
      //获取职位列表
    getJobsList() {
      let page = {
        pageNum: this.jPageNum
      };
      getJobsList(page).then(res => {
        if (!res.extData.hasNext) {
          this.finished = true;
        }
        this.loading = false;
        if (res.status == 1001) {
            console.log(res.extData)
          this.jPageNum++;
          this.jobsList =
            this.jobsList.length == 0
              ? res.extData.list
              : this.jobsList.concat(res.extData.list); //拼接请求到的列表数据
        }
      });
    },
    //刷新列表
    onRefresh() {
      getJobsList({ pageNum: "1" }).then(res => {
        this.$toast("刷新成功");
        this.isLoading = false;
        if (res.status == 1001) {
          if (!res.extData.hasNext) {
            this.finished = true;
          }
          this.loading = false;
          this.jobsList = res.extData.list;
        }
      });
    },
    //点击搜索框 
    onFocus() {
        this.backgroundColor = '#f2f2f2'
    },
    //失去焦点 
    onBlur() {
        this.backgroundColor = 'transparent'
    },
    //返回顶部
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
          this.isShow = false;
        }
      }, 10);
    },
    //获取滚动的位置
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let offsetTop = document.querySelector("#searchBar").offsetTop;
      //设置背景颜色的透明读
      if (offsetTop && scrollTop) {
        this.backgroundColor = `rgba(255, 255, 255,${scrollTop /
          (scrollTop + 40)})`;
      } else if (scrollTop == 0) {
        this.backgroundColor = "transparent";
      }
      scrollTop > offsetTop ? (this.isShow = true) : "";
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../style/mixin";
@import "@/style/common";

//吸顶
.is_fixed {
  position: fixed;
  top: 0;
  z-index: 999;
  transition: 0.3s linear;
}
.is_show {
  visibility: hidden;
}
.home {
  .home_nav {
    padding: 30rpx 0;
    height: 150rpx;
    span {
      color: #242526;
      font-size: 40rpx;
      position: absolute;
      top: 10rpx;
      left: 5rpx;
    }
    img {
      width: 80rpx;
      position: absolute;
      right: 5rpx;
      bottom: 0rpx;
    }
  }
  .home_line {
    width: 100%;
    height: 15rpx;
    background-color: #f6f7f8;
  }
  .home_jobs {
    .home_top {
      width: 100%;
      padding: 0 20rpx;
      height: 80rpx;
      line-height: 80rpx;
      span {
        color: #242526;
        font-size: 40rpx;
      }
      .home_top_arrow {
        position: fixed;
        top: 45rpx;
      }
      .home_top_top {
        position: fixed;
        top: 25rpx;
        right: 15rpx;
      }
    }
    .home_jobs_list {
      margin-top: 40rpx;
      margin-bottom: 120rpx;
      .home_jobs_box {
        height: 180rpx;
        padding: 0 20rpx;
        margin-top: 30rpx;
        .home_jobs_box_img {
          padding-right: 20rpx;
          display: inline;
        }
        img {
          width: 120rpx;
          border-radius: 10rpx;
        }
        .home_jobs_box_info {
          display: inline-block;
          span:nth-child(1) {
            font-size: 35rpx;
            height: 60rpx;
            line-height: 60rpx;
            color: #242526;
          }
          span:nth-child(2) {
            display: inline-block;
          }
          span:nth-child(3) {
            font-size: 20rpx;
            display: block;
            height: 40rpx;
            line-height: 40rpx;
            color: #969699;
          }
          span:nth-child(4) {
            position: absolute;
            right: 0;
          }
          span:nth-child(5) {
            font-size: 30rpx;
            color: #b4b5b7;
            display: inline-block;
            height: 60rpx;
            line-height: 60rpx;
          }
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.head-enter-active,
.head-leave-active {
  transition: opacity 0.5s;
}
.head-enter, .head-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/deep/ .van-search {
  position: fixed;
  top: 0rpx;
  z-index: 100;
  width: 100%;
}
/deep/ .van-cell__title {
  font-size: 40rpx;
  color: #363737;
}
/deep/ .van-grid-item__content {
  height: 140rpx;
  padding: none;
  background-color: #fff;
}
/deep/ .van-grid-item__content--surround::after {
  border-width: 1rpx;
  border-radius: 10rpx;
  box-shadow: 1px 1px 1px 1px rgba(235, 236, 238, 0.5),
    -2px 2px 2px 2px rgba(255, 255, 255, 0.5);
}
/deep/ .van-divider {
  margin: 0rem 0;
}
</style>