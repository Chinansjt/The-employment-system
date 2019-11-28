<template>
    <Tree 
        class="vue-tree" 
        :data="treeList" 
        :render="treeRender"
    />
</template>

<script>
export default{
    props: ["treeData", "id", "isTwo"],
    computed: {
        treeList: {
            get(){
                let list = [], data = []
                if(this.treeData && this.treeData.length){
                    if(this.isTwo){
                        data = this.addAttr(this.treeData)
                        list = this.getTreeList(data, this.id)
                    }else{
                        list = this.getTreeList(this.treeData, this.id)
                    }
                }
                return list
            },
            set(){}
        }
    },
    methods: {
        // 如果是两层树结构，在顶层增加一个isGroup属性，主要用来区分角色、角色组的编辑
        addAttr(data1){
            let data = data1
            data && data.length && data.map(item => {
                item.isGroup = true
            })
            return data
        },
        // 树形结构自定义渲染，包括自定义图标，点击事件
        treeRender(h, { root, node, data }){
            return h("span", {
                class: data.id === this.id ? "tree-selected tree-title ellipsis-one" : "tree-title ellipsis-one",
                on: {
                    click: (e) => {
                        this.$emit("onSelect", data)      
                    }
                }
            }, [
                h("i", {
                    class: data.expand ? " iconfont iconfont-arrow icon-down " : "iconfont iconfont-arrow icon-right ",
                }),
                h("i", {
                    class: "iconfont " + data.iconType,
                }),
                h("span", { class: "ellipsis-one"}, data.label)
            ])
        },
        // 数据列表处理，判断是否展开
        getTreeList(data, id){
            let treeData = []
            if (data.length == 0) {
                return data;
            }
            let ids = this.getParentIds(data, id)
            let rev = (data) => {
                data && data.length && data.map(item => {
                    if (ids.indexOf(item.id) > -1) {
                        item.expand = true
                    }else {
                        item.expand = false
                    }
                    if (item.children) {
                        rev(item.children)
                    }
                })
                return data
            }
            treeData = rev(data);
            return treeData;
        },
        // 获取某一树节点的所有父节点
        getParentIds(data, id){
            let arrRes = []
            if (data.length == 0) {
                if (id) {
                    arrRes.unshift(id)
                }
                return arrRes;
            }
            let rev = (item, nodeId) => {
                for (var i = 0; i < item.length; i++) {
                    let node = item[i];
                    if (node.id === nodeId) {
                        arrRes.unshift(nodeId)
                        rev(data, node.parentId);
                        break;
                    }else {
                        if (node.children) {
                            rev(node.children, nodeId);
                        }
                    }
                }
                return arrRes;
            };
            arrRes = rev(data, id);
            return arrRes;
        }
    }
}
</script>

<style lang="scss">
.vue-tree {
    overflow: hidden;
    .ivu-tree-children{
        font-size: 14px;
        height: 100%;
        li{
            margin: 4px 0;
            .ivu-tree-arrow{
                display: none;
            }
        }
    }
    .tree-title{
        display: block;
        vertical-align: -10px;
        padding: 2px 5px;
        cursor: pointer;
        .iconfont{
            color: #aee3f9;
            margin-right: 10px;
        }
        .iconfont-arrow{
            font-size: 12px;
            color: #777;
            margin-right: 5px;
            vertical-align: text-top;
        }
    }
    .tree-selected{
        background-color: #2d8cf0;
        color: #fff;
        .iconfont{
            color: #fff;
        }
    }
}
</style>


