<template>
  <div class="login">
    <div class="text_align login_titel">杭州电子科技大学信息工程学院</div>
    <div class="text_align login_head">就业系统</div>
    <van-image
      round
      fit="cover"
      class="login_logo spjz"
      src="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/logo.jpg?Expires=1575044885&OSSAccessKeyId=TMP.hivN8Vv7pZg4DqYAoJStCCA8Gj41qxGx7qABfGZaNg7BAn6nKpbpCoyTMvrid3WTw84uuzSJS6ECQPjqVnNW4Pc9TWqFzLouH13FGjPfkrnxrHYJgb1jot6NTxVYBr.tmp&Signature=9WnR8LYTiKVjgPP%2BptOhQj9nkKk%3D"
    />
    <div class="login_user">
      <van-field v-model="studentId" placeholder="请输入学号" />
      <van-field v-model="password" placeholder="请输入密码" />
    </div>
    <van-button type="default" loading-text="加载中...">登录</van-button>
    <div class="login_tourists">
      <span>游客访问</span>
      <img
        src="https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E5%8F%8C%E7%AE%AD%E5%A4%B4.png?Expires=1575043312&OSSAccessKeyId=TMP.hivN8Vv7pZg4DqYAoJStCCA8Gj41qxGx7qABfGZaNg7BAn6nKpbpCoyTMvrid3WTw84uuzSJS6ECQPjqVnNW4Pc9TWqFzLouH13FGjPfkrnxrHYJgb1jot6NTxVYBr.tmp&Signature=9jKt5IzLh%2Bl8gX0rjAZo15GgOvI%3D"
      />
    </div>
  </div>
</template>

<script>
import Api from "@/plugins/api";
import verifyCode from "_c/verifyCode";
import { isPhone, isCode, notify } from "@/plugins/utils";
import config from "@/plugins/config";
import Vue from "vue";
import { Image, Field, Button } from "vant";

Vue.use(Field)
  .use(Image)
  .use(Button);
export default {
  data() {
    return {
      studentId: "",
      password: ""
    };
  }
};
</script>

<style lang="scss"  scoped>
@import "../../style/mixin";
/deep/ .van-cell {
  font-size: 50rpx;
}
/deep/ .van-cell:not(:first-child)::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0.8rem;
  border-bottom: 0.05rem solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
/deep/ .van-button--default {
  color: #000000;
  background: linear-gradient(left, #6f9ef8, #6482f6);
  background: -ms-linear-gradient(left, #6f9ef8, #6482f6);
  background: -webkit-linear-gradient(left, #6f9ef8, #6482f6);
  background: -moz-linear-gradient(left, #6f9ef8, #6482f6);
}
/deep/ .van-button {
  font-size: 50rpx;
  width: 500rpx;
  border-radius: 50rpx;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 100rpx;
}
.spjz {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.text_align {
  text-align: center;
}
.login {
  .login_logo {
    width: 250rpx;
    height: 250rpx;
    margin-bottom: 30rpx;
    margin-top: 20rpx;
  }
  .login_titel {
    margin-top: 150rpx;
    font-size: 55rpx;
  }
  .login_head {
    margin-top: 20rpx;
    font-size: 50rpx;
  }
  .login_user {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    font-size: 50rpx;
    width: 70%;
  }
  .login_tourists {
    margin-top: 20rpx;
    text-align: center;
    height: 40rpx;
    line-height: 40rpx;
    span {
      font-size: 20rpx;
    }
    img {
      width: 40rpx;
      position: relative;
      top: 7rpx;
    }
  }
}
</style>
