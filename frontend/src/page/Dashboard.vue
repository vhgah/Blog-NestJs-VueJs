<template>
    <PageComponent title="Dashboard">
        <div class="lg:flex md:flex xl:flex 2xl:flex gap-3 items-center">

        </div>
    </PageComponent>
</template>
<script setup>
import { computed } from 'vue';
import PageComponent from '../components/PageComponents.vue'
import store from '../store';


let d = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie =
        "Authentication=" + sessionStorage.getItem("TODO_APP_TOKEN") + ";" + expires + ";path=/posts";
// console.log(sessionStorage.getItem("TODO_APP_TOKEN"))
store.dispatch('getPosts')
    .then((success) => {
        // console.log(success)
    }).catch(err => {
        // console.log(err)
    })

</script>