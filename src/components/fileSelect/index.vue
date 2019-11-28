<template>
    <div class="upload-file">
        <Button v-if="type == 1" class="upload-btn" @click="handleClick">上传文件</Button>

        <div v-if="type == 2" class="upload-wrap" @click="handleClick">
            <template v-if="!isUpload">
                <i class="iconfont icon-upload"/>
                <p class="upload-text">点击上传文件</p>
            </template>
            <template v-else>
                <i class="iconfont icon-right"></i>
                <p class="upload-text">点击修改文件</p>
                <p class="upload-filename ellipsis-one">{{filename}}</p>
            </template>
            <p class="upload-tip">请添加{{format}}格式的文件, 大小不超过{{size}}M</p>
        </div>

        <input
            type="file"
            ref="file"
            style="display: none"
            @change="changeImage"
        />
    </div>
</template>
<script>
import Api from "@/plugins/api"
import { notify } from "@/plugins/utils"

export default {
    props: ["type", "format", "size"],
    data () {
        return {
            filename: "",
            isUpload: false,
        }
    },
    methods: {
        handleClick(){
            this.$refs.file.click()
        },
        // 文件上传
        changeImage(e){
            let file = e.target.files[0]

            // 文件大小限制在2M以内
            if(file.size > this.size * 1024 * 1024){
                notify.error("文件大小不可以超过"+this.size+"M~")
                return
            }
            
            this.filename = file.name
            this.isUpload = true

            this.$emit("getFile", file)
            this.$refs.file.value = ""
        },
    },
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
    .upload-file{
        .upload-name{
            margin-top: 5px;
        }
        .upload-btn{
            width: 120px;
            margin-right: 10px;
        }
        .upload-wrap{
            width: 100%;
            height: 200px;
            border: 1px dashed #ccc;
            text-align: center;
            padding: 45px 20px 0;
            border-radius: 4px;
            font-size: 13px;
            cursor: pointer;
            &:hover{
                border-color: $mainColor
            }
            .icon-upload{
                color: $mainColor;
                font-size: 26px;
            }
            .icon-right{
                font-size: 34px;
                color: #19be6b;
            }
            .upload-filename{
                .iconfont{
                    margin-right: 3px;
                }
            }
            .upload-text{
                font-weight: 600;
                line-height: 30px;
            }
            .upload-tip{
                color: $mainColor;
                line-height: 26px;
            }
        }
    }
</style>
