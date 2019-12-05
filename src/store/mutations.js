import Store from './index'
export default {
    //更改简历
    modifyResume(state,newResumeObj) {
        state.resumeObj = newResumeObj;
        if(newResumeObj !== '') { //当每次更爱简历或者添加简历的时候，只要简历对象不为空，就计算一下简历完成度
            let fraction = 0;
            Object.keys(newResumeObj).forEach((key) => {
                if(newResumeObj[key] !== '') {
                    fraction += 4;  //每一项4分，满分100分
                }
            })
            console.log('到这里了1')
            Store.dispatch('modifyResumeComplete',fraction)
        }
    },
    //修改简历完成度
    modifyResumeComplete(state,newResumeComplete){
        console.log('到这里了')
       state.resumeComplete = newResumeComplete;
    },
	showLoading(state){
		state.isLoading = true
	},
	hideLoading(state){
		state.isLoading = false
    },
    // 全局弹出页面框，用于加载外部第三方页面
	openOuterPage(state,url){
        if(window.base_channel === "WX") {
            // 微信内直接跳转外部页面
            location.href = url;
        } else if (url !== state.popupUrl) {
            state.popupType = "clear";
            state.popupShow = true;
            state.popupUrl = "";
            // 防止切换页面，卡顿看到之前的不同的页面
            setTimeout(() => {

                state.popupType = window.mobileType;
                state.popupUrl = url;

            }, 10);
        } else {
            state.popupShow = true;
            state.popupType = window.mobileType;
        }
    },
    
	closeOuterPage(state){
        state.popupShow = false;
    }
}
