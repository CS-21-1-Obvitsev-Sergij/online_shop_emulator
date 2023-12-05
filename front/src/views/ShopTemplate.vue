<script setup>
    import { onMounted } from 'vue';
    import { useCategory } from '@/stores/adminPanel/categoryStore';
    import { useProduct } from '@/stores/adminPanel/productStore';
    import CategoryListMarket from '@/components/shopPanel/CategoryListMarket.vue';
    import ProductListShop from '@/components/shopPanel/ProductListShop.vue';
import ProductInfoShop from '@/components/shopPanel/ProductInfoShop.vue';

    const categoryStore = useCategory();
    const productStore    = useProduct();

onMounted( async() => {
    productStore.products = [];
    await categoryStore.getCategories();
});   
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-2">
                <router-link to="/admin">Admin Panel</router-link> 
            </div>
            <div class="col-10"></div>
        </div>
        <hr />
        <h1 v-if="categoryStore.catNowClick.name">{{ categoryStore.catNowClick.name }}</h1>
        <h1 v-if="productStore.productNow.id">{{ productStore.productNow.name }}</h1>
        <h1 v-else>On-line Store</h1>
    </div>
    <div class="row">
        <div class="col-3">
           <CategoryListMarket />
        </div>
        <div class="col-8">
            <ProductListShop v-if="!productStore.productNow.id"/>
            <ProductInfoShop v-if="productStore.productNow.id" />
        </div>
    </div>
</template>

<style>
h1{
    text-align: center;
}
</style>