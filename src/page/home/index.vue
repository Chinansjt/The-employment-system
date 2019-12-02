<template>
    <div class="page">
      <h1></h1>
    </div>
</template>

<script>
import Api from "@/plugins/api"
import { notify } from "@/plugins/utils"
import { mapState } from "vuex"
import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar).use(TabbarItem);
 
export default{
    data() {
        return {
            
        }
    },

}
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

</style>