<template>
  <div class="company">
    <van-nav-bar fixed left-text="公司">
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <van-pull-refresh
      success-text="刷新成功"
      class="company_refresh"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="500"
        @load="getCompanyList"
        class="company_list"
      >
        <div v-for="item in companyList">
          <router-link :to="{ path: 'details', params: { company_id: item.company_id }}"></router-link>
          <div class="company_box">
            <div class="company_box_img">
              <img :src="item.img" />
            </div>
            <div class="company_box_right">
              <strong>{{item.company}}</strong>
              <span>{{item.address}}</span>
              <div>{{item.vision}}</div>
            </div>
          </div>
          <div class="company_line"></div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import Vue from "vue";
import { getCompanyList } from "@/plugins/api";
import { notify } from "@/plugins/utils";
import {
  NavBar,
  Icon,
  PullRefresh,
  Divider,
  List,
  NoticeBar,
  Lazyload
} from "vant";

Vue.use(Icon)
  .use(NavBar)
  .use(PullRefresh)
  .use(Divider)
  .use(List)
  .use(NoticeBar)
  .use(Lazyload);
export default {
  data() {
    return {
      loading: false,
      finished: false,
      companyList: [],
      cPageNum: "1",
      isLoading: false //下拉刷新
    };
  },
  created() {
    //获取公司列表
    this.getCompanyList();
  },
  methods: {
    getCompanyList() {
      getCompanyList({ company_id: "1001" }).then(res => {
        if (!res.extData.hasNext) {
          this.finished = true;
        }
        this.loading = false;
        if (res.status == "1001") {
          this.cPageNum++;
          this.companyList =
            this.companyList.length == 0
              ? res.extData.list
              : this.companyList.concat(res.extData.list); //拼接请求到的列表数据
        } else {
          notify.error(res.message);
        }
      });
    },
    //刷新列表
    onRefresh() {
      getCompanyList({ company_id: "1001" }).then(res => {
        this.isLoading = false;
        if (!res.extData.hasNext) {
          this.finished = true;
        }
        this.loading = false;
        if (res.status == "1001") {
          this.companyList = res.extData.list; //拼接请求到的列表数据
        } else {
          notify.error(res.message);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.company {
  margin: 0 20rpx;
  .company_refresh {
    margin-top: 2.5rem;
    .company_list {
      padding-bottom: 150rpx;
    }
  }
  .company_box {
    height: 300rpx;
    .company_box_img {
      height: 300rpx;
      float: left;
      img {
        width: 200rpx;
        height: 200rpx;
        margin: 0rpx 20rpx;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .company_box_right {
        margin-top: 20rpx;
      div {
        height: 80rpx;
        line-height: 80rpx;
        font-size: 60rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: "Microsoft Yahei"
      }
      span {
        font-size: 40rpx;
        color: #b4b5b7;
        display: inline-block;
        height: 80rpx;
        line-height: 80rpx;
      }
      strong {
        display: block;
        font-size: 55rpx;
      }
    }
  }
  .company_line {
    background-color: rgb(235, 236, 238);
    height: 10rpx;
    border-radius: 5rpx;
  }
}

/deep/ .van-nav-bar {
  height: 100rpx;
  line-height: 100rpx;
}
/deep/ .van-nav-bar__arrow {
  font-size: 50rpx;
}
/deep/ .van-nav-bar__text {
  display: inline-block;
  font-size: 50rpx;
  color: #1989fa;
  vertical-align: middle;
}
/deep/ .van-nav-bar__right {
  font-size: 50rpx;
}
</style>