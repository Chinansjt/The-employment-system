
const Home = r => require.ensure([], () => r(require("../page/home")), "home")

const Login = r => require.ensure([], () => r(require("../page/login")), "login")

const Error = r => require.ensure([], () => r(require("../page/error")), "user")



export default[{
    path: "/login",
    name: "login",
    component: Login,
    meta: {
        title: "登录",
        hideInMenu: true
    },
}]
