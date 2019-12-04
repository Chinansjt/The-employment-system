import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"

Vue.use(Vuex)

const state = {
    isLoading: false,
    popupUrl: "",
    popupShow: false,
	popupType: "clear",
	resumeObj: {
		img: 'https://img.yzcdn.cn/vant/leaf.jpg',
		name: "宁柏森",
		phone: "17816096297",
		email: "chinansjt@163.com",
		native: '广西平南',
		city: '杭州',
		application: 'web前端',
		direction: '计算机岗位',
		website: 'www.papaning.com',
		blog: '啪啪宁',
		introduction: '我很牛逼',
		education: '博士',
		graduationTime: '2020年7月',
		school: '杭州电子科技大学信息工程学院',
		department: '电子信息工程学院',
		major: '电子信息工程',
		achievement: "其他",
		englishLevel: '英语四级',
		otherLanguage: '无',
		projectExperience: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。', //项目经历
		internship: '阿里巴巴网络技术有限公司（简称：阿里巴巴集团或阿里巴巴）是以曾担任英语教师的马云为首的18人于1999年在浙江杭州创立的公司。 [1-2] 阿里巴巴集团经营多项业务，另外也从关联公司的业务和服务中取得经营商业生态系统上的支援。业务和关联公司的业务包括：淘宝网、天猫、聚划算、全球速卖通、阿里巴巴国际交易市场、1688、阿里妈妈、阿里云、蚂蚁金服、菜鸟网络等。 [3] 2014年9月19日，阿里巴巴集团在纽约证券交易所正式挂牌上市，创造了史上最大IPO记录，股票代码“BABA”，创始人为马云。2019年11月26日，阿里巴巴港股上市，总市值超4万亿，登顶港股成为港股“新股王” [4-5]  。', //实习经历
		scholarship: '国家一等奖学金，国家一等励志奖学金，校级一等奖学金，定向一等奖学金', //奖学金
		competition: '大学生挑战杯是“挑战杯”全国大学生系列科技学术竞赛的简称，是由共青团中央、中国科协、教育部和全国学联共同主办的全国性的大学生课外学术实践竞赛。“ [1]  挑战杯”竞赛在中国共有两个并列项目，一个是“挑战杯”中国大学生创业计划竞赛，另一个则是“挑战杯”全国大学生课外学术科技作品竞赛。这两个项目的全国竞赛交叉轮流开展，每个项目每两年举办一届。 [1]', //竞赛，
		cadre: '学生会最高负责人，学生代表大会的召集人。学生会实行主席负责制，学生会主席对学校党政、学生代表大会和学生会负责。学生会主席分为校学生会主席和年级学生会主席。',  //干部经历
		otherActivities: '很多', //其他活动
	}
}

const actions = {

	//修改简历
	modifyResume(context,newResumeObj) {
		context.commit("modifyResume",newResumeObj)
	},
    // 全局loading窗口
	showLoading(context){
		context.commit("showLoading")
	},
	hideLoading(context){
		context.commit("hideLoading")
    },
    // 全局弹出页面框，用于加载外部第三方页面
	openOuterPage(context,url){
		context.commit("openOuterPage",url)
	},
	closeOuterPage(context){
		context.commit("closeOuterPage")
    }
}

const getters = { //实时监听state值的变化(最新状态)

};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
