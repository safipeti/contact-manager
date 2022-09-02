import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";
import ContactForm from "../views/contact/ContactForm";
import ContactUpdate from "../views/contact/ContactUpdate";
import ContactDetails from "../views/contact/ContactDetails";
import ContactList from "../views/contact/ContactList";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import ForgotPassword from "../views/auth/ForgotPassword";
import ResetPassword from "../views/auth/ResetPassword";
import store from "../store/index";

const routes = [
    {
        path: "/",
        name: "ContactList",
        component: ContactList,
        props: true,
        meta: {
            auth: true,
        },
    },
    {
        path: "/add",
        name: "ContactCreate",
        component: ContactForm,
        meta: {
            auth: true,
        },
    },
    {
        path: "/edit/:id",
        name: "ContactUpdate",
        component: ContactUpdate,
        props: true,
        meta: {
            auth: true,
        },
    },
    {
        path: "/details/:id",
        name: "ContactDetails",
        component: ContactDetails,
        props: true,
        meta: {
            auth: true,
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            unAuth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            unAuth: true,
        },
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
        meta: {
            unAuth: true,
        },
    },
    {
        path: "/reset/:token",
        name: "ResetPassword",
        component: ResetPassword,
        meta: {
            unAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.URL),
    routes,
});

router.beforeEach(function(to, from, next) {
    if (to.meta.auth && !store.getters.isLoggedIn) {
        next({ name: "Login" });
    } else if (to.meta.unAuth && store.getters.isLoggedIn) {
        next({ name: "ContactList" });
    } else {
        next();
    }
});

export default router;
