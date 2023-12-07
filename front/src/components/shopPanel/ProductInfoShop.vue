<script setup>
    
    import { useProduct } from '@/stores/adminPanel/productStore';
    import { useCategory } from '@/stores/adminPanel/categoryStore';

   
    const productStore    = useProduct();
    const categoryStore   = useCategory();
   

</script>
<template>
    <div class="container product-info">
        <div class="row">
            <div class="col-4 img-div">
                <img :src="productStore.productNow.imageUrl.replace('azurite', 'localhost')" width="200" height="200">
            </div>
            <div class="col-4">
                About: <br /><br />
                <span class="price">Price: <span>{{ productStore.productNow.price }} $</span> </span>
                <hr />
                <span class="cat">Category: <span>{{ categoryStore.category.find(category => category.key === productStore.productNow.cat).name }} </span> </span>
                
                
                <hr />

            </div>
        </div>
    </div>
</template>
<style>
    .product-info {
        margin-top: 50px;
    }
    .img-div {
        text-align:  center;
        margin: 20px;
        border-right: 1px solid gray;
    }
    .price span {
        font-size: 20px;
        color:chocolate;
    }
    .cat span{
        font-size: 16px;
        font-weight: bold;
    }
</style>
