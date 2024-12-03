<template>
    <ul v-if="menu.length" class="main-menu">
        <li v-for="item in menu">
            <router-link :to="{name: item.name}">{{ item.name }}</router-link>
        </li>
    </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from "vue";

const router = useRouter()

const menu = computed(() => router.options.routes)
</script>

<style lang="scss">
.main-menu {
    display: flex;

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