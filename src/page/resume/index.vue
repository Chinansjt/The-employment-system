<template>
  <div class="resume">
    <van-nav-bar :title="navTitle" left-text="返回"   @click-left="$router.go(-1)" left-arrow />
    <!-- 个人信息 -->
    <div class="resume_information padding_20">
      <van-divider :style="{ color: '#07c160', borderColor: '#07c160', padding: '0 20rpx' }">个人信息</van-divider>
      <van-uploader
        :after-read="afterRead"
        upload-text="上传头像"
        :max-count="1"
        v-model="fileList"
        multiple
      />
      <van-cell-group>
        <van-field
          class="padding_up"
          v-model="resumeObj.name"
          required
          clearable
          label="姓名"
          right-icon="question-o"
          placeholder="请输入姓名"
        />
        <van-field
          class="padding_up"
          v-model="resumeObj.phone"
          required
          clearable
          label="手机号"
          right-icon="question-o"
          placeholder="请输入手机号"
        />
        <van-field
          class="padding_up"
          v-model="resumeObj.email"
          required
          clearable
          label="邮箱"
          right-icon="question-o"
          placeholder="请输入邮箱"
        />
        <van-field
          class="padding_up"
          v-model="resumeObj.native"
          clearable
          label="籍贯"
          right-icon="question-o"
          placeholder="请输入籍贯"
        />
        <van-field
          class="padding_up"
          v-model="resumeObj.city"
          required
          clearable
          label="所在城市"
          right-icon="question-o"
          placeholder="请输入你所在城市"
        />
        <van-field
          class="padding_up"
          v-model="resumeObj.application"
          required
          clearable
          label="应聘类型"
          right-icon="question-o"
          placeholder="你中意的岗位类型"
        />
        <van-collapse v-model="activeName" class="padding_up" accordion>
          <van-collapse-item title="应聘方向" name="1">
            <van-checkbox-group v-model="result">
              <van-cell-group>
                <van-cell
                  v-for="(item, index) in list"
                  clickable
                  :key="item"
                  :title="`复选框 ${item}`"
                  @click="toggle(index)"
                >
                  <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </van-collapse-item>
        </van-collapse>
        <van-field
          class="padding_up"
          v-model="resumeObj.website"
          clearable
          label="个人网站"
          right-icon="question-o"
        />
        <van-field class="padding_up" v-model="resumeObj.blog" clearable label="个人博客" />
        <van-field
          class="padding_up"
          v-model="resumeObj.introduction"
          rows="3"
          autosize
          label="自我介绍"
          type="textarea"
          maxlength="200"
          placeholder="说说你自己吧，我们想听"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <!-- 教育背景 -->
    <div class="resume_education_background padding_20">
      <van-divider :style="{ color: '#07c160', borderColor: '#07c160', padding: '0 20rpx' }">教育背景</van-divider>
      <van-collapse v-model="activeEducation" class="padding_up" accordion>
        <van-collapse-item title="学历" name="1">
          <van-radio-group v-model="resumeObj.education">
            <van-cell-group>
              <van-cell
                v-for="item in educationList"
                :key="item"
                :title="item"
                clickable
                @click="resumeObj.education = item"
              >
                <van-radio slot="right-icon" :name="item" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </van-collapse-item>
      </van-collapse>
      <van-field
        class="padding_up"
        v-model="resumeObj.graduationTime"
        required
        clearable
        label="毕业时间"
        right-icon="question-o"
        placeholder="请输入你毕业的时间"
      />
      <van-field
        class="padding_up"
        v-model="resumeObj.school"
        required
        clearable
        label="毕业院校"
        right-icon="question-o"
        placeholder="请输入毕业院校"
      />
      <van-field
        class="padding_up"
        v-model="resumeObj.department"
        required
        clearable
        label="院系"
        right-icon="question-o"
        placeholder="请输入毕业院系"
      />
      <van-field
        class="padding_up"
        v-model="resumeObj.major"
        required
        clearable
        label="专业"
        right-icon="question-o"
        placeholder="请输入你的专业"
      />
      <van-collapse v-model="activeAchievement" class="padding_up" accordion>
        <van-collapse-item title="成绩" name="1">
          <van-radio-group v-model="resumeObj.achievement">
            <van-cell-group>
              <van-cell
                v-for="item in achievementList"
                :key="item"
                :title="item"
                clickable
                @click="resumeObj.achievement = item"
              >
                <van-radio slot="right-icon" :name="item" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </van-collapse-item>
      </van-collapse>
      <van-collapse v-model="activeEnglishLevel" class="padding_up" accordion>
        <van-collapse-item title="英语等级" name="1">
          <van-radio-group v-model="resumeObj.englishLevel">
            <van-cell-group>
              <van-cell
                v-for="item in englishLevel"
                :key="item"
                :title="item"
                clickable
                @click="resumeObj.englishLevel = item"
              >
                <van-radio slot="right-icon" :name="item" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </van-collapse-item>
      </van-collapse>
      <van-collapse v-model="activeName" class="padding_up" accordion>
        <van-collapse-item title="其他语言" name="1">
          <van-checkbox-group v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in list"
                clickable
                :key="item"
                :title="`复选框 ${item}`"
                @click="toggle(index)"
              >
                <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 活动经验 -->
    <div class="resume_activity_experience">
      <van-divider :style="{ color: '#07c160', borderColor: '#07c160', padding: '0 20rpx' }">活动经验</van-divider>
      <div class="resume_switch_box margin_40">
        <van-cell-group>
          <van-switch-cell class v-model="projectExperienceChecked" title="项目/活动经历" />
        </van-cell-group>
        <transition name="fade">
          <van-field
            v-if="projectExperienceChecked"
            class="border_1 padding_up"
            v-model="resumeObj.projectExperience"
            rows="3"
            clearable
            autosize
            type="textarea"
            maxlength="500"
            placeholder="来大展身手吧"
            show-word-limit
          />
        </transition>
      </div>
      <div class="resume_switch_box margin_40">
        <van-cell-group>
          <van-switch-cell v-model="internshipChecked" title="实习经历" />
        </van-cell-group>
        <transition name="fade">
          <van-field
            v-if="internshipChecked"
            class="border_1 padding_up"
            v-model="resumeObj.internship"
            rows="3"
            clearable
            autosize
            type="textarea"
            maxlength="500"
            placeholder="来大展身手吧"
            show-word-limit
          />
        </transition>
      </div>
      <div class="resume_switch_box margin_40">
        <van-cell-group>
          <van-switch-cell v-model="scholarshipChecked" title="奖学金获得情况" />
        </van-cell-group>
        <transition name="fade">
          <van-field
            v-if="scholarshipChecked"
            class="border_1 padding_up"
            v-model="resumeObj.scholarship"
            rows="3"
            clearable
            autosize
            type="textarea"
            maxlength="500"
            placeholder="来大展身手吧"
            show-word-limit
          />
        </transition>
      </div>
      <div class="resume_switch_box margin_40">
        <van-cell-group>
          <van-switch-cell v-model="competitionChecked" title="是否有竞赛的经历" />
        </van-cell-group>
        <transition name="fade">
          <van-field
            v-if="competitionChecked"
            class="border_1 padding_up"
            v-model="resumeObj.competition"
            rows="3"
            clearable
            autosize
            type="textarea"
            maxlength="500"
            placeholder="来大展身手吧"
            show-word-limit
          />
        </transition>
      </div>
      <div class="resume_switch_box margin_40">
        <van-cell-group>
          <van-switch-cell v-model="cadreChecked" title="学校担任过的职务" />
        </van-cell-group>
        <transition name="fade">
          <van-field
            v-if="cadreChecked"
            class="border_1 padding_up"
            v-model="resumeObj.cadre"
            rows="3"
            clearable
            autosize
            type="textarea"
            maxlength="500"
            placeholder="来大展身手吧"
            show-word-limit
          />
        </transition>
      </div>
      <div class="resume_switch_box margin_40">
        <van-cell-group>
          <van-switch-cell v-model="otherActivitiesChecked" title="其他活动经历" />
        </van-cell-group>
        <transition name="fade">
          <van-field
            v-if="otherActivitiesChecked"
            class="border_1 padding_up"
            v-model="resumeObj.cadre"
            rows="3"
            clearable
            autosize
            type="textarea"
            maxlength="500"
            placeholder="来大展身手吧"
            show-word-limit
          />
        </transition>
      </div>
      <van-button class="reset_but" @click="toReset" type="default">重新填</van-button>
      <van-button @click="toSubResume" class="resume_but">添加简历</van-button>
      <div style="height: 0; overflow: hidden;">
        <img src="http://cdn.qiyingfu.com/qyfcdn/2019/11/13/07_59_46_DAYlkCWRWwreFHKP.png!p80" />
      </div>
      <van-dialog v-model="showSucceed" :show-confirm-button="false" close-on-click-overlay>
        <div class="seucceed_box">
          <img src="http://cdn.qiyingfu.com/qyfcdn/2019/11/13/07_59_46_DAYlkCWRWwreFHKP.png!p80" />
          <div class="seucceed_box_title">
            <div>简历修改成功</div>
          </div>
          <div class="second">{{second}}秒后返回简历页面</div>
        </div>
      </van-dialog>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { notify, isPhone, isEmail, toast } from "@/plugins/utils";
import {
  Field,
  CellGroup,
  Dialog,
  Icon,
  NavBar,
  Uploader,
  Divider,
  Switch,
  Collapse,
  RadioGroup,
  Button,
  Radio,
  CollapseItem,
  Checkbox,
  Cell,
  SwitchCell,
  CheckboxGroup,
  Toast
} from "vant";

Vue.use(Field)
  .use(Button)
  .use(Dialog)
  .use(RadioGroup)
  .use(Radio)
  .use(Switch)
  .use(CellGroup)
  .use(NavBar)
  .use(Uploader)
  .use(Divider)
  .use(Cell)
  .use(Collapse)
  .use(Checkbox)
  .use(SwitchCell)
  .use(CheckboxGroup)
  .use(CollapseItem)
  .use(Icon);
export default {
  data() {
    return {
      directionList: [""], //应聘方向列表，
      educationList: ["大专", "本科", "研究生", "硕士", "博士"], //学历列表
      activeEducation: "0", //默认是否打开选择框， 0 关闭，1打开

      achievementList: ["前5%", "前10%", "前20%", "其他"], //成绩列表,
      activeAchievement: "0", //默认是否打开选择框， 0 关闭，1打开
      englishLevel: [
        "未参加",
        "未通过",
        "英语四级",
        "英语六级",
        "专业四级",
        "专业八级"
      ], //英语等级
      activeEnglishLevel: "0", //默认是否打开选择框， 0 关闭，1打开
      otherLanguage: [], //其他语言列表
      activeName: "2",
      fileList: [{ url: "" }], //头像
      list: [1, 2, 3, 4],
      result: [],
      navTitle: '修改简历', //头部标题

      projectExperienceChecked: false, //项目开关
      internshipChecked: false, //实习开关
      scholarshipChecked: false, //奖学金开关
      competitionChecked: false, //竞赛开关
      cadreChecked: false, //在校职务开关
      otherActivitiesChecked: false, //其他活动开关
      showSucceed: false, //提交成功弹框
      second: 4, //倒计时关闭
      resumeObj: this.$store.state.resumeObj //简历对象
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    state: state => state.resumeObj
  }),
  created() {
    this.initialization();
  },
  methods: {
    ...mapActions([
      // `mapActions` 也支持载荷：
      "modifyResume" // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    initialization() {
      //判断简历是否为空。为空就不初始化简历
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //学历选择
    educationLists(index) {
      this.$refs.educationCheck[index].toggle();
    },
    toSubResume() {
      let newResumeObj = this.resumeObj;
      if (newResumeObj.name == "") {
        notify.error("姓名不能为空噢！");
        return;
      }
      if (newResumeObj.phone == "") {
        notify.error("手机号不能为空噢！");
        return;
      }
      if (!isPhone(newResumeObj.phone)) {
        notify.error("手机号格式错误噢！");
        return;
      }
      if (newResumeObj.email == "") {
        notify.error("邮箱不能为空噢！");
        return;
      }
      if (!isEmail(newResumeObj.email)) {
        notify.error("邮箱格式错误噢！");
        return;
      }
      if (newResumeObj.city == "") {
        notify.error("所在城市不能为空噢！");
        return;
      }
      if (newResumeObj.application == "") {
        notify.error("应聘类型不能为空噢！");
        return;
      }
      if (newResumeObj.graduationTime == "") {
        notify.error("毕业时间不能为空噢！");
        return;
      }
      if (newResumeObj.school == "") {
        notify.error("毕业院校不能为空噢！");
        return;
      }
      if (newResumeObj.major == "") {
        notify.error("专业不能为空噢！");
        return;
      }
      Dialog.confirm({
        title: "确认",
        message: "您确定要修改简历吗"
      })
        .then(() => {
          this.modifyResume(newResumeObj);
          this.second = 4;
          const timer = setInterval(() => {
            this.showSucceed = true;
            this.second--;
            if (!this.second) {
              clearInterval(timer);
              this.showSucceed = false;
              this.$router.go(-1)
            }
          }, 1000);
        })
        .catch(() => {});
    },

    //重置表单
    toReset() {
      Dialog.confirm({
        title: "确认",
        message: "您确定要重新填写简历吗"
      })
        .then(() => {
          let resumeObj = this.resumeObj;
          Object.keys(resumeObj).forEach(function(key) {
            resumeObj[key] = "";
            Toast.success("重置成功");
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.padding_20 {
  padding: 0 20rpx;
  margin-top: 20rpx;
}
.padding_up {
  margin: 20rpx 0rpx;
}
.margin_40 {
  margin: 40rpx 0rpx;
}
.border_1 {
  border: 4rpx solid #f5f5f5;
  border-radius: 20rpx;
}
.resume {
  font-size: 40rpx !important;
  .resume_activity_experience {
    .resume_switch_box {
      font-size: 40rpx;
    }
  }
  .resume_but {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20rpx;
    width: 99%;
    font-size: 40rpx;
    color: #f5f5f5;
    height: 96rpx;
    background-color: #07c160;
    border-radius: 10rpx;
    border-color: #07c160;
  }
  .reset_but {
    margin-top: 30rpx;
    position: relative;
    left: 20rpx;
    bottom: 50rpx;
    width: 40%;
    font-size: 30rpx;
    height: 70rpx;
    line-height: 70rpx;
    border-radius: 10rpx;
  }
  .seucceed_box {
    width: 100%;
    padding: 50rpx 0;

    img {
      padding: 50rpx 0;
      width: 25%;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }

    .seucceed_box_title {
      color: #999999;
      text-align: center;

      div:first-child {
        font-size: 30rpx;
        padding-bottom: 10rpx;
      }

      div:last-child {
        font-size: 25rpx;
      }
    }

    .second {
      text-align: center;
      height: 100rpx;
      line-height: 100rpx;
    }
  }
}
/deep/ .van-uploader {
  left: 50%;
  transform: translateX(-50%);
}
/deep/ .van-uploader__preview-image {
  width: 300rpx;
  height: 300rpx;
  border-radius: 50%;
}
/deep/ .van-dialog {
  width: 80%;
  overflow: hidden;
  font-size: 0.35556rem;
  background-color: #fff;
  border-radius: 12rpx;
}

/deep/ .van-cell::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0.35556rem;
  border-bottom: 0.02222rem solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>