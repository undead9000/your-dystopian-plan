<template>
    <ul v-if="menu.length" class="main-menu">
        <li v-for="item in menu">
            <router-link :to="{name: item.name}">{{ item.title }}</router-link>
        </li>
    </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from "vue";
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const menu = computed(() => router.options.routes.map(route => ({
    ...route,
    title: t('titles.' + route.name.toLowerCase())
})))
</script>

<style lang="scss">
.main-menu {
    display: flex;
    margin: 0 0 20px;

    li:not(:last-child) {
        margin: 0 12px 0 0;
        padding: 0 12px 0 0;
    }

    a {
        color: #fff;
        text-decoration: none;

        &.router-link-active {
             text-decoration: underline;
        }
    }
}
</style>