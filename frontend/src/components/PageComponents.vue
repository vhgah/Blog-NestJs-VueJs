<template>
    <header class="bg-white shadow">
        <div
            class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 2xl:flex xl:flex lg:flex md:flex sm:flex justify-between items-center">
            <h1 class="font-bold text-gray-900 text-1xl lg:text-3xl sm:text-2xl pb-3">
                {{ title }}
            </h1>
            <slot name="header">
                <router-link 
                :to="{ name: 'TodoCreate' }"
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Them
                    moi</router-link>
            </slot>
        </div>
    </header>
    <main>
        <div class="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8">
            <!-- Replace with your content -->
            <div class="px-4 py-2">
                <slot></slot>
            </div>
            <!-- /End replace -->
        </div>
    </main>
</template>
<script setup>
const props = defineProps({
    title: String,
})
</script>
