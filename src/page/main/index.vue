<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" @change="change" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item to="/home">
        <span>就业广场</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.homeActive : icon.homeInActive" />
      </van-tabbar-item>
      <van-tabbar-item to="/company">
        <span>公司</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.companyActive : icon.companyInActive" />
      </van-tabbar-item>
      <van-tabbar-item >
        <span>个人中心</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.userActive : icon.userInActive" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar).use(TabbarItem);

export default {
  name: "Main",
  data() {
    return {
      active: 0,
      icon: {
        homeInActive:
          "https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E8%81%8C%E4%BD%8D.png",
        homeActive:
          "https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E5%8C%B9%E9%85%8D%E8%81%8C%E4%BD%8D-%E5%A1%AB%E5%85%85.png",
          companyInActive: 'https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E5%85%AC%E5%8F%B8%20%282%29.png',
          companyActive: 'https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E5%85%AC%E5%8F%B8%20%281%29.png',
          userInActive: 'https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E4%B8%AA%E4%BA%BA%20%289%29.png',
          userActive: 'https://papaning.oss-cn-hangzhou.aliyuncs.com/images/%E4%B8%AA%E4%BA%BA%20%282%29.png'
      }
    };
  },
  methods: {
    /**
     * tab栏的切换
     */
    change() {
      if (this.active === 0) {
        this.$router.push({
          path: "/Home",
          replace: true
        });
      } else if (this.active === 1) {
        this.$router.push({
          path: "/company",
          replace: true
        });
      }
    }
  },
  created() {
    // 判断当前页面是否为home或newpersonal页面
    const CURRENTTABBAR = window.location.pathname.split("/")[1];
    if (CURRENTTABBAR === "home") {
      this.active = 0;
    } else if (CURRENTTABBAR === "company") {
      this.active = 1;
    }
  }
};
</script>
