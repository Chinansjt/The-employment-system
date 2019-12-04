
<template>
  <div class="preach">
    <van-search placeholder="输入公司或职位" show-action shape="round" class="preach_search">
      <div slot="label">校内</div>
      <div slot="action">搜索</div>
    </van-search>
    <van-pull-refresh
      success-text="刷新成功"
      class="preach_refresh"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="500"
        @load="getPreachList"
        class="preach_list"
      >
        <div v-for="item in preachList">
          <van-row @click="toPreachDetails(item.company_id)" class="preach_box" gutter="6">
            <van-col span="4">
              <div class="preach_box_img">
                <img :src="item.img" />
              </div>
            </van-col>
            <van-col span="15">
              <div class="preach_box_preach">{{item.preach}}是德国获得任何人</div>
              <div class="preach_box_school">
                <van-icon name="location-o" class="preach_icon" />
                {{item.school}}
              </div>
              <div class="preach_box_address">
                <van-icon
                  class="preach_icon"
                  name="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E6%95%99%E5%AE%A4.png"
                />
                {{item.address}}
              </div>
            </van-col>
            <van-col span="5">
              <div class="preach_box_right date">{{item.date}}</div>
              <div class="preach_box_right time">{{item.time}}</div>
              <div class="preach_box_right ">
                <van-icon class="preach_icon" name="eye-o" />10
              </div>
            </van-col>
          </van-row>
          <div class="preach_line"></div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import Vue from "vue";
import { getPreachList } from "@/plugins/api";
import { notify } from "@/plugins/utils";
import {
  NavBar,
  Icon,
  PullRefresh,
  Divider,
  List,
  NoticeBar,
  Lazyload,
  Row,
  Col,
  Search
} from "vant";

Vue.use(Icon)
  .use(NavBar)
  .use(PullRefresh)
  .use(Divider)
  .use(List)
  .use(Search)
  .use(Row)
  .use(Col)
  .use(NoticeBar)
  .use(Lazyload);
export default {
  data() {
    return {
      loading: false,
      finished: false,
      preachList: [],
      cPageNum: "1",
      isLoading: false //下拉刷新
    };
  },
  created() {
    //获取公司列表
    this.getPreachList();
  },
  methods: {
    getPreachList() {
      getPreachList({ preach_id: "1001" }).then(res => {
        if (!res.extData.hasNext) {
          this.finished = true;
        }
        this.loading = false;
        if (res.status == "1001") {
          this.cPageNum++;
          this.preachList =
            this.preachList.length == 0
              ? res.extData.list
              : this.preachList.concat(res.extData.list); //拼接请求到的列表数据
        } else {
          notify.error(res.message);
        }
      });
    },
    //刷新列表
    onRefresh() {
      getPreachList({ preach_id: "1001" }).then(res => {
        this.isLoading = false;
        if (!res.extData.hasNext) {
          this.finished = true;
        }
        this.loading = false;
        if (res.status == "1001") {
          this.preachList = res.extData.list; //拼接请求到的列表数据
        } else {
          notify.error(res.message);
        }
      });
    },
    //跳转页面
    toPreachDetails(company_id) {
      this.$router.push({
              path: "/preach/details",
              params: { company_id: company_id }
						});
    }
  }
};
</script>
<style lang="scss" scoped>
.preach {
  .preach_search {
    position: fixed;
    top: 0rpx;
    width: 100%;
    z-index: 100;
    box-sizing: border-box;
  }
  .preach_refresh {
    margin-top: 100rpx;
    .preach_list {
      padding-bottom: 150rpx;
    }
  }
  .preach_box {
    padding: 0 20rpx;
    .preach_box_img {
      height: 190rpx;
      img {
        width: 110rpx;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .preach_box_preach {
      font-size: 40rpx;
      height: 80rpx;
      line-height: 80rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: "Microsoft Yahei";
    }
    .preach_box_school {
      font-size: 25rpx;
      height: 40rpx;
      line-height: 40rpx;
       overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #A9A9A9;
    }
    .preach_box_address {
      font-size: 35rpx;
      height: 70rpx;
      line-height: 70rpx;
      color: 	#C0C0C0;
    }
    .preach_box_right {
      text-align: end;
      height: 70rpx;
      line-height: 70rpx;
    }
    .preach_icon {
      position: relative;
      top: 7rpx;
      color: 	#C0C0C0;
      
    }
    .date {
      font-size: 33rpx;
    }
    .time {
      font-size: 32rpx;
      height: 50rpx;
      line-height: 50rpx;
      color: 	#DC143C;
    }
  }

  .preach_line {
    background-color: rgb(238, 235, 235);
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