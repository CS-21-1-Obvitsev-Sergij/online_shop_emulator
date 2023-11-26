<script setup>

</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-2">
                <router-link to="/admin">Admin Panel</router-link> |
                Menu
            </div>
            <div class="col-10"> product list </div>
            <router-view/>
        </div>
        
    </div>
</template>

<style>
</style>