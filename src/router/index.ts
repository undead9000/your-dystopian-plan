import { createWebHistory, createRouter } from "vue-router";
import Calendar from "../views/Calendar.view.vue"
import Characters from "../views/Characters.view.vue"
import Colony from "../views/Colony.view.vue";
import Hero from "../views/Hero.view.vue";
import Link from "../views/link/Link.view.vue";
import System from "../views/System.view.vue";
import InGameMenu from "../views/InGameMenu.view.vue";
import MainMenu from "../views/MainMenu.view.vue"
const routes = [
    {
        path: "/",
        name: "Main Menu",
        component: MainMenu,
    },
    {
        path: "/calendar",
        name: "Calendar",
        component: Calendar,
    },
    {
        path: "/colony",
        name: "Colony",
        component: Colony,
    },
    {
        path: "/characters",
        name: "Characters",
        component: Characters,
    },
    {
        path: "/hero",
        name: "Hero",
        component: Hero,
    },
    {
        path: "/link",
        name: "Link",
        component: Link,
    },
    {
        path: "/system",
        name: "System",
        component: System,
    },
    {
        path:"/game",
        name:"Game",
        component: InGameMenu
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
