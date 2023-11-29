<script setup>
import { watch, onMounted, ref } from 'vue';
import CategoryList from '@/components/adminPanel/CategoryList..vue';
import { useCategory } from '@/stores/adminPanel/categoryStore';
import { useProduct } from '@/stores/adminPanel/productStore';

const categoryStore = useCategory();
const productStore  = useProduct();
const viewAddForm   = ref(false);

watch(
    () => categoryStore.catNowClick,
    async (newCategory) => {
        if (newCategory.children && newCategory.children.length == 0 ) {
            console.log('one CAT')
            productStore.getProductsInCat(newCategory.key);
        } else {
            console.log('MANY MANY CAT');
            //const catKeys = await productStore.mapCategoryKey(newCategory);
            //const catKeys = newCategory.children.map(child => child.key);
            //console.log('KEYS - ', catKeys);
            productStore.getProductsInCatArray(categoryStore.mapCategoryKey);
           
        }
    },
    { immediate: true }
);

const btnAddClick = ()=>{
    viewAddForm.value = !viewAddForm.value;
}

onMounted( async() => {
   await categoryStore.getCategorys();
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
                    <form>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="name">Product Name </label>
                            <input type="text" class="form-control" id="name" name="name">
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="price">Price $</label>
                            <input type="text" class="form-control" id="price" name="price">
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="foto">File (foto)</label>
                            <input type="file" class="form-control" id="foto" name="foto">
                        </div>
                        <input type="hidden" name="cat" :value="categoryStore.categoryNow.key">
                        <input type="submit" class="btn btn-info" value="Send Product">
                    </form>
                </div>
            </div>
            <hr />
            {{ categoryStore.catNowClick }} 
            <br />
            Cat Keys - {{ categoryStore.mapCategoryKey }}
            <div class="alert alert-info" v-if="!categoryStore.catNowClick">
                <p>No category selected</p>
            </div>
            <div v-else>
                <h4>{{ categoryStore.catNowClick.name }}</h4>
                <div class="alert alert-warning" v-if="productStore.products.length === 0">
                    <p>Not serach product in this category</p>
                </div>
                <div v-else v-for="product in productStore.products" :key="product.div" class="row">
                    <div class="col-7">
                        {{ product.name }}
                    </div>
                    <div class="col-2">
                        <button class="btn btn-warning">Edit</button>
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