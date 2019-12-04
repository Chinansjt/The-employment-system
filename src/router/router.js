
const Main = r => require.ensure([], () => r(require("../page/main")), "main")

const Home = r => require.ensure([], () => r(require("../page/main/components/home")), "home")

const Company = r => require.ensure([], () => r(require("../page/main/components/company")), "company")

const User = r => require.ensure([], () => r(require("../page/main/components/user")), "user") //个人中心页面

const Resume = r => require.ensure([], () => r(require("../page/resume")), "resume") //宣讲会页面

const Login = r => require.ensure([], () => r(require("../page/login")), "login")

const Details = r => require.ensure([], () => r(require("../page/details")), "details")  //职位详情页面

const Coming = r => require.ensure([], () => r(require("../page/coming ")), "coming") //来校招聘页面

const Preach = r => require.ensure([], () => r(require("../page/preach")), "preach") //宣讲会页面

const PreachDetails = r => require.ensure([], () => r(require("../page/preachDetails")), "preachDetails") //宣讲会详情

const Election = r => require.ensure([], () => r(require("../page/election")), "election")  //双选会页面

const Error = r => require.ensure([], () => r(require("../page/error")), "user")

export default [
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            title: "登录",
            hideInMenu: true
        },
    },
    {
        path: '/details',
        name: 'details',
        component: Details,
        meta: {
            title: "职位详情"
        }
    },
    {
        path: '/coming',
        name: "coming",
        component: Coming,
        meta: {
            title: "来校招聘"
        }
    },
    {
        path: '/election',
        name: 'election',
        component: Election,
        meta: {
            title: "双选会"
        }
    },
    {
        path: "/preach",
        name: 'preach',
        component: Preach,
        meta: {
            title: '宣讲会'
        },
    },
    {
        path: "/preach/details",
        name: "preachDetails",
        component: PreachDetails,
        meta: {
            title: "宣讲会详情"
        }
    },
    {
        path: "/user/resume",
        name: "resume",
        component: Resume,
        meta: {
                title: "简历"
        }
    },
    {
        path: "/",
        name: "main",
        component: Main,
        children: [
            {
                path: "/home",
                name: "home",
                component: Home,
                meta: {
                    title: "首页",
                }
            },
            {
                path: "company",
                name: "company",
                component: Company,
                meta: {
                    title: "公司"
                }
            },
            {
                path: "User",
                name: "user",
                component: User,
                meta: {
                    title: "个人中心"
                }
            },
        ]
    },
]
