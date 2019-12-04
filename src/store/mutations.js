
export default {

    //更改简历
    modifyResume(state,newResumeObj) {
        console.log(newResumeObj,'这是mutations');
        state.resumeObj = newResumeObj
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
