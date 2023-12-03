<script setup>
import { watch, onMounted, ref } from 'vue';
import CategoryList from '@/components/adminPanel/CategoryList..vue';
import { useCategory } from '@/stores/adminPanel/categoryStore';
import { useProduct } from '@/stores/adminPanel/productStore';

const categoryStore = useCategory();
const productStore  = useProduct();
const viewAddForm   = ref(false);       // признак что надо открыть форму добавления товара

const clearAddForm = () => {
    const nameForm = document.getElementById('nameForm');
    const priceForm = document.getElementById('priceForm');
    const fileInput = document.querySelector('input[type="file"]');
    const catForm = document.getElementById('catForm');

    if (nameForm) nameForm.value = '';
    if (priceForm) priceForm.value = '';
    if (fileInput) fileInput.value = '';
    if (catForm) catForm.value = '';
}

watch(
    () => categoryStore.catNowClick,
    async (newCategory) => {

        //  сменили категорию - обнуляем форму
        productStore.errorForm = false;
        productStore.msgForm = '';
        clearAddForm();

        if (newCategory.children && newCategory.children.length == 0 ) {
            console.log('one CAT')
            productStore.getProductsInCat(newCategory.key);
        } else {
            viewAddForm.value = false;
            productStore.getProductsInCatArray(categoryStore.mapCategoryKey);
           
        }
    },
    { immediate: true }
);

const handleSubmitAddForm = async () => {
    
    const data = {
        name: document.getElementById('nameForm').value,
        price: document.getElementById('priceForm').value,
        fileField: document.querySelector('input[type="file"]'),
        categoryKey: document.getElementById('catForm').value,
    } 

    await productStore.addProduct(data);

    if (!productStore.errorForm) {
        console.log('done form');
        productStore.getProductsInCat(categoryStore.catNowClick.key);
        clearAddForm();
    } else {
        console.log('not DONE form');
    }
};

const btnAddClick = ()=>{
    viewAddForm.value = !viewAddForm.value;
}
const btnEditProduct = (product) => {
    productStore.isProductEdit = true;
    productStore.nowEditProduct = product;
}

onMounted( async() => {
    productStore.products = [];
    await categoryStore.getCategories();
});
</script>

<template>
    <h1>Product Control Page</h1>
    <hr />
    <div class="row">
        <div class="col-3">
            <CategoryList :categoryTree="categoryStore.categoryTree"/>
        </div>
        <div class="col-9">
            <div class="row">
                <div class="col-2">
                    <button class="btn btn-primary" 
                            @click="btnAddClick" 
                            v-if="categoryStore.catNowClick.parent">
                            <span v-if="!viewAddForm">Add Product</span>
                            <span v-else>Hide form</span> 
                    </button>
                </div><br/><br/>
                <div class="alert alert-light" v-if="viewAddForm">
                    <b>Add product</b>
                    <div    class="alert alert-success" 
                            v-if="!productStore.errorForm && productStore.msgForm.length > 0"
                            > 
                                Add new product is ... DONE
                    </div>
                    <div    class="alert alert-warning" 
                            v-if="productStore.errorForm"
                            > 
                                <h5>Error</h5>
                                <p>{{ productStore.msgForm }}</p>
                    </div>
                    <form @submit.prevent="handleSubmitAddForm">
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="catNameForm">Category </label>
                            <input type="text" class="form-control" id="catNameForm" name="catNameForm" v-model="categoryStore.catNowClick.name" disabled>
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="nameForm">Product Name </label>
                            <input type="text" class="form-control" id="nameForm" name="nameForm">
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="priceForm">Price $</label>
                            <input type="text" class="form-control" id="priceForm" name="priceForm">
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="fotoForm">File (foto)</label>
                            <input type="file" class="form-control" id="fotoForm" name="fotoForm">
                        </div>
                        <input type="hidden" name="catForm" id="catForm" :value="categoryStore.catNowClick.key">
                        <input type="submit" class="btn btn-info" value="Send Product">
                    </form>
                    <hr />
                </div>
            </div>
            
            <br />
           
            <div class="alert alert-info" v-if="!categoryStore.catNowClick">
                <p>No category selected</p>
            </div>
            <div v-else>
                <h4>{{ categoryStore.catNowClick.name }}</h4>
                <div class="alert alert-warning" v-if="productStore.products.length === 0">
                    <p>Not serach product in this category</p>
                </div>
                <div v-else v-for="product in productStore.products" :key="product.div" class="row product-row">
                    <div class="col-2">
                       <img :src= "product.imageUrl" width = "80" height = "80"/>
                    </div>
                    <div class="col-4">
                        <b>{{ product.name }}</b><br />
                        <b>Price: </b> {{ product.price }} $
                    </div>
                    <div class="col-2">
                        <button class="btn btn-warning" @click="btnEditProduct(product)" >Edit</button>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-danger">Delete</button>
                    </div>
                    <hr />
                </div>
            </div>
            
        </div>
    </div>
</template>
<style>
.product-row {
  
    margin-bottom: 20px;
}
.product-row hr {
    margin-top: 15px;
}
</style>