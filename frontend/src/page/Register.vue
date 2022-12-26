<template>
    <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Đăng ký</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <router-link :to="{ name: 'Register' }" class="font-medium text-indigo-600 hover:text-indigo-500">Đăng nhập
                ngay</router-link>
        </p>

    </div>
    <form class="mt-8 space-y-6" @submit="register">
        <div v-if="errorMessage" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
            {{ errorMessage }}
            <span @click="errorMessage = ''"
                class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </span>
        </div>
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
            <div>
                <label for="email-address" class="sr-only">Tên đăng nhập</label>
                <input id="email-address" name="username" type="username" autocomplete="username"
                    v-model="user.username"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Tên đăng nhập" />
            </div>
            <div>
                <label for="password" class="sr-only">Mật khẩu</label>
                <input id="password" name="password" type="password" autocomplete="current-password"
                    v-model="user.password"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Mật khẩu" />
            </div>
        </div>
        <div>
            <button type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"
                        stroke="currentColor" width="2.3em" height="2.3em">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                        </path>
                    </svg>
                </span>
                Đăng ký
            </button>
        </div>
    </form>
</template>
<script setup>
import { useRouter } from 'vue-router';
import store from '../store';
import { ref } from 'vue';
const router = useRouter();
const user = {
    username: '',
    password: '',
}
const errorMessage = ref('');
function register(ev) {
    ev.preventDefault();
    store.dispatch('register', user)
        .then(() => {
            router.push({
                name: 'Dashboard'
            })
        }).catch(err => {
            console.log(err)
            let error = err.response?.data?.message;
            if (error) {
                errorMessage.value = error;
            }
        })
}
</script>