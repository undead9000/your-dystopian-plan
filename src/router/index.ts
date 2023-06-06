import { createWebHistory, createRouter } from "vue-router";
import Calendar from "../views/Calendar.view.vue"
import Characters from "../views/Characters.view.vue"
import Colony from "../views/Colony.view.vue";
import Hero from "../views/Hero.view.vue";
import Link from "../views/Link.view.vue";
import System from "../views/System.view.vue";

const routes = [
    {
        path: "/",
        name: "Colony",
        component: Colony,
    },
    {
        path: "/calendar",
        name: "Calendar",
        component: Calendar,
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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;