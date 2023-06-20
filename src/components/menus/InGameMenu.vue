<template>
  <div class="panel panel-left">
    <ul>
        <router-link class="button" :to="{name:'Calendar'}">Calendar</router-link>
        <router-link class="button" :to="{name:'Characters'}">Characters</router-link>
        <router-link class="button" :to="{name:'Colony'}">Colony</router-link>
        <router-link class="button" :to="{name:'Hero'}">Hero</router-link>
        <router-link class="button" :to="{name:'Link'}">Link</router-link>
        <router-link class="button" :to="{name:'System'}">System</router-link>
    </ul>
  </div>
  <div class="panel panel-right">
    <router-view></router-view>
  </div>
</template>
