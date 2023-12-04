<script setup>
    
    import { useCategory } from '@/stores/adminPanel/categoryStore';
    import { useProduct } from '@/stores/adminPanel/productStore';
    const productStore  = useProduct();
    const categoryStore  = useCategory();
    
    const handleSubmitEditForm = async () => {
        const data = {
            name: document.getElementById('nameEditForm').value,
            price: document.getElementById('priceEditForm').value,
            fileField: document.querySelector('input[type="file"]'),
            categoryKey: document.getElementById('catEditForm').value,
            id: document.getElementById('idEditForm').value,
            imageUrl: document.getElementById('imageUrlEditForm').value, 
            thumbUrl: document.getElementById('thumbUrlEditForm').value,
        } 
        console.log('START update in storage ');
        await productStore.updateProduct(data);

        if (!productStore.errorForm) {
            console.log('done form');
            productStore.getProductsInCat(document.getElementById('catEditForm').value);
            productStore.isProductEdit = false;
        } else {
            console.log('not DONE form');
        }
    }
    
</script>

<template>
    <div class="alert alert-danger" v-if="productStore.errorForm">{{ productStore.msgForm }}</div>
    <form @submit.prevent="handleSubmitEditForm" >
        <div class="input-group mb-3">
            <label class="input-group-text" for="catNameEditForm">Category </label>
            <input type="text" ref="editForm" class="form-control" id="catNameEditForm" name="catNameEditForm" v-model="categoryStore.catNowClick.name" disabled>
        </div>
        <div class="input-group mb-3">
            <label class="input-group-text" for="nameEditForm">Product Name </label>
            <input type="text" class="form-control" id="nameEditForm" name="nameEditForm" v-model="productStore.nowEditProduct.name">
        </div>
        <div class="input-group mb-3">
            <label class="input-group-text" for="priceEditForm">Price $</label>
            <input type="text" class="form-control" id="priceEditForm" name="priceEditForm" v-model="productStore.nowEditProduct.price">
        </div>
        
        <div class="input-group mb-3">
            <img :src="productStore.nowEditProduct.imageUrl" width="50" height="50" />    
            <label class="input-group-text" for="fotoEditForm">New Foto</label>
            <input type="file" class="form-control" id="fotoEditForm" name="fotoEditForm">
        </div>
        <input type="hidden" name="catEditForm" id="catEditForm" v-model="productStore.nowEditProduct.cat">
        <input type="hidden" name="idEditForm" id="idEditForm" v-model="productStore.nowEditProduct.id">
        <input type="hidden" name="imageUrlEditForm" id="imageUrlEditForm" v-model="productStore.nowEditProduct.imageUrl">
        <input type="hidden" name="thumbUrlEditForm" id="thumbUrlEditForm" v-model="productStore.nowEditProduct.thumbUrl">
        <input type="submit" class="btn btn-info" value="Update Product">
    </form>
</template>