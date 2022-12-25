<script setup></script>
<template>
    <div>
        <h3>Login</h3>
        <form action="/register">
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" id="username" placeholder="Username">
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="password">
            </div>
            <div class="form-footer">
                <button>Login</button>
            </div>
        </form>
    </div>
</template>