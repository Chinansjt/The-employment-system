<template>
  <div class="details">
    <van-nav-bar title="职位详情"    @click-left="toBack" left-arrow>
      <van-icon name="like-o" slot="right" />
      <van-icon class="details_icon" name="share" slot="right" />>
    </van-nav-bar>
    <div class="details_company">
      <img :src="jobDetails.img" />
      <div>{{jobDetails.jobName}} | 蚂蚁金服高级前端工程师/专家（蚂蚁金服-保险事业部）</div>
      <span>{{jobDetails.address}}｜{{jobDetails.nature}}｜{{jobDetails.education}}</span>
      <strong>{{jobDetails.salary}}</strong>
    </div>
    <div class="details_job_highlights">
      <span class="size_65">职位亮点</span>
      <div
        class="size_38"
      >{{jobDetails.highlights}}</div>
    </div>
    <div class="details_job_duties">
      <div class="size_65">职位描述</div>
      <div class="size_40">岗位描述:</div>
      <div class="size_38">{{jobDetails.duties}}</div>
      <div class="size_40">岗位要求:</div>
      <div class="size_38">{{jobDetails.claim}}</div>
    </div>
    <van-button class="details_but">投递简历</van-button>
  </div>
</template>
<script>
import { getJobDetails } from "../../plugins/api";
import Vue from "vue";
import { NavBar, Icon, Button } from "vant";

Vue.use(Icon).use(NavBar).use(Button);
export default {
  data() {
    return {
      jobDetails: {},
      job_id: this.$route.params.job_id,
    };
  },
  created() {
    this.getJobDetails();
  },
  methods: {
    getJobDetails() {
      getJobDetails({ job_id: this.job_id }).then(res => {
        if (res.status == "1001") {
          this.jobDetails = res.extData;
          console.log(res.extData);
        }
      });
    },
    toBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.details {
  margin: 0 25rpx;
  .details_icon {
    padding-left: 25rpx;
  }
  .details_company {
    border: 0.5rpx solid #e7e7e7;
    margin: 40rpx 0rpx;
    box-shadow: 1px 1px 1px 1px #dcdcdc;
    padding-left: 25rpx;
    padding-top: 30rpx;
    padding-bottom: 30rpx;
    img {
      width: 150rpx;
      position: absolute;
      right: 45rpx;
    }
    div {
      width: 70%;
      font-size: 60rpx;
      color: #333233;
    }
    span {
      font-size: 30rpx;
      color: #b4b5b7;
      display: inline-block;
      height: 80rpx;
      line-height: 80rpx;
    }
    strong {
      font-size: 50rpx;
      display: block;
    }
  }
  .details_job_highlights {
    .szie_38 {
      color: #656565;
      margin: 30rpx 0rpx;
    }
  }
  .details_job_duties {
      padding-bottom: 116rpx;
  }
  .details_but {
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			bottom: 20rpx;
			width: 95%;
			height: 96rpx;
			background-color: #07c160;
			border-radius: 10rpx;
			border-color: #07c160
		}
  .size_65 {
    font-size: 65rpx;
    display: block;
  }
  .size_40 {
    font-size: 40rpx;
    color: #656565;
    height: 60rpx;
    line-height: 60rpx;
  }
  .size_38 {
    color: #656565;
    margin: 20rpx 0rpx;
  }
}
/deep/ .van-nav-bar {
  height: 100rpx;
  line-height: 100rpx;
}
/deep/ .van-nav-bar__arrow {
  font-size: 40rpx;
}
/deep/ .van-nav-bar__right {
  font-size: 40rpx;
}
/deep/ .van-button__text {
		font-size: 40rpx;
		color: #ffffff;
	}
</style>