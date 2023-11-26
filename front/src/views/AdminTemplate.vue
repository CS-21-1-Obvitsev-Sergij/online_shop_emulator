<script setup>
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 col-md-2 col-sm-3 menu-fixed sidebar">
                <router-link to="/">To On-line Market</router-link> |
               <h1> Admin Panel</h1>
               <ul>
                    <li>menu 1</li>
                    <li>menu 2</li>
               </ul>
            </div>
            <div className="col-10 col-md-10 col-sm-9 offset-md-2 offset-sm-3 content">
                <p> content</p>
            </div>
        </div>
    </div>
</template>
<style>
    .menu-fixed{
    position: fixed;
    top: 0px;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: block;
    padding: 30px 20px 50px 20px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #333;
    border-right: 1px solid #000;
    color: #fff;
    text-align: left;
    text-shadow: 0 1px 10px rgba(0, 0, 0, .5);
    }
    .content{
        color: #333;
        background-color: #fafafa;
        padding: 30px 30px 50px 30px;
    }
</style>