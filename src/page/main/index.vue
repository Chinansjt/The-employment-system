<template>
	<Layout style="height: 100%" class="main">
        <!-- 顶部导航 -->
        <Header class="header-con clearfix">
            <div class="fl collapsed-logo" :class="collapsed ? 'collapsed-logo fl':'spread-logo fl'">
                <img :src="collapsed ? companyInfo.collapsedLogoUrl : companyInfo.logoUrl" />
            </div>
            <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
                <user :company-info="companyInfo"/>
            </header-bar>
        </Header>

		<Layout>
            <!-- 侧边栏 -->
            <Sider hide-trigger collapsible :width="220" :collapsed-width="64" v-model="collapsed" class="left-sider">
                <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
                </side-menu>
            </Sider>

            <!-- 内容 -->
			<Content class="main-content-con">
				<Layout class="main-layout-con">
                    <template v-if="companyInfo">
                        <Content class="content-wrapper">
                            <router-view/>
                            <ABackTop :height="100" :bottom="80" :right="30" container=".content-wrapper"/>
                        </Content>
                    </template>
				</Layout>
                <!-- 内容loading -->
                <div v-if="this.$store.state.isLoading" class="loading">
                    <Spin fix>
                        <Icon type="ios-loading" size=30 class="spin-icon-load"/>
                    </Spin>
                </div>
			</Content>
		</Layout>
	</Layout>
</template>

<script>
import SideMenu from "./components/side-menu"
import HeaderBar from "./components/header-bar"
import User from "./components/user"
import ABackTop from "./components/a-back-top"
import { mapMutations, mapActions } from "vuex"
import routers from "../../router/router"
import "./index.scss"

export default {
    name: "Main",
    components: {
        SideMenu,
        HeaderBar,
        User,
        ABackTop
    },
    data () {
        return {
            collapsed: false,
        }
    },
    computed: {
        companyInfo () {
            return this.$store.state.companyInfo
        },
        menuList () {
            return this.$store.getters.menuList
        }
    },
    methods: {
        ...mapMutations([
            "setBreadCrumb",
            "setHomeRoute",
        ]),
        ...mapActions([
            "getCompanyInfo",
        ]),
        turnToPage (route) {
            let { name, params, query } = {}
            if (typeof route === "string") {
                name = route
            }else {
                name = route.name
                params = route.params
                query = route.query
            }
            if (name.indexOf("isTurnByHref_") > -1) {
                window.open(name.split("_")[1])
                return
            }
            this.$router.push({
                name,
                params,
                query
            })
        },
        handleCollapsedChange (state) {
            this.collapsed = state
        },
    },
    watch: {
        "$route" (newRoute) {
            const { name, query, params, meta } = newRoute
            this.setBreadCrumb(newRoute)
            this.$refs.sideMenu.updateOpenName(newRoute.name)
        }
    },
    created () {
        let year = new Date().getFullYear() + ""
        this.getCompanyInfo(year)
        this.setHomeRoute(routers)
        const { name, params, query, meta } = this.$route
        this.setBreadCrumb(this.$route)
    }
}
</script>
