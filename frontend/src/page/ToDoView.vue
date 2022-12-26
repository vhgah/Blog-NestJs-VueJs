<template>
    <main>
        <div class="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8">
            <label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Todo</label>
            <input type="text" v-model="todo"
                class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">

            <button type="button" @click="saveTodo"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button>
        </div>
    </main>
</template>
<script setup>
import { ref } from 'vue';
import store from '../store';

let todo = ref('');

function saveTodo() {
    if (!todo.value) return;
    store.dispatch('saveTodo', { todo: todo.value }).then((success) => {
        console.log(success)
    }).catch((error) => {
        console.log(error);
    })
}
</script>