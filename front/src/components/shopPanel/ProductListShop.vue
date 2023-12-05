<script setup>
import { useProduct } from '@/stores/adminPanel/productStore';


const productStore = useProduct();


const btnDetailsClick = (product) => {
    productStore.productNow = product;
}
</script>

<template>
    <div class="alert alert-info" v-if="productStore.products.length === 0">
        <p>
            No products found in this category <br>
            Please select another category from the menu on the left
        </p>
    </div>
    <div class="row" v-else>
        <div class="col-md-4" v-for="product in productStore.products" :key="product.id">
            <div class="card" style="width: 100%;">
                <img :src="product.imageUrl" 
                     class="card-img-top" 
                     :alt="product.name">
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">{{ product.price }} $</p>
                    <button class="btn btn-outline-info" @click="btnDetailsClick(product)">Details ...</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .card-img-top {
        max-width: 200px; 
        height: 150px; 
        display: block; 
        margin: auto;
        border: 1px solid gray;
        border-radius: 20%;
        margin-top: 10px;
    }
</style>
