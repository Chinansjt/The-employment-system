<template>
  <div class="form">
    <div class="form-box">
      <van-field
        v-model="value"
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />
      <van-field
        clearable
        class="form-item"
        label="专业"
        left-icon="contact"
        v-model="value"
        placeholder="请输入专业"
      />
      <van-field
        clearable
        class="form-item"
        label="班级"
        left-icon="contact"
        v-model="value"
        placeholder="请输入班级"
      />
      <van-field
        clearable
        class="form-item"
        label="用户名"
        left-icon="contact"
        v-model="value"
        placeholder="请输入用户名"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Field, CellGroup } from "vant";

Vue.use(Field).use(CellGroup);
export default {
  data() {
    return {
      value: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.form {
  .form-box {
    margin-top: 50rpx;
    .form-item {
    }
  }
}
</style>