import { createWebHistory, createRouter } from "vue-router";
import Calendar from "../views/planner/Planner.view.vue"
import Characters from "../views/Characters.view.vue"
import Colony from "../views/colony/Colony.view.vue";
import Hero from "../views/Hero.view.vue";
import Link from "../views/link/Link.view.vue";
import System from "../views/System.view.vue";
import { PagesLinks } from './routes'

const routes = [
    {
        path: "/",
        name: PagesLinks.Colony,
        component: Colony,
    },
    {
        path: "/planner",
        name: PagesLinks.Planner,
        component: Calendar,
    },
    {
        path: "/characters",
        name: PagesLinks.Characters,
        component: Characters,
    },
    {
        path: "/hero",
        name: PagesLinks.Hero,
        component: Hero,
    },
    {
        path: "/link",
        name: PagesLinks.Link,
        component: Link,
    },
    {
        path: "/system",
        name: PagesLinks.System,
        component: System,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;