<script setup>
import { onMounted, ref } from 'vue';
import { useCategory } from '@/stores/adminPanel/categoryStore';
import { useProduct } from '@/stores/adminPanel/productStore'; 


const activeCategoryKey = ref(null);

const categoryStore = useCategory();
const productStore  = useProduct();

const catClickParent = async (category) => {
    productStore.productNow = {};
    productStore.products = [];
    categoryStore.catNowClick = category;
    activeCategoryKey.value = category.key;
    productStore.getProductsInCatArray(categoryStore.mapCategoryKey);
};

const catClickChild = async (category) => {
    productStore.productNow = {};
    productStore.products = [];
    categoryStore.catNowClick = category;
    activeCategoryKey.value = category.key;
    productStore.getProductsInCat(category.key);
};

onMounted( async() => {
   await categoryStore.getCategories();
});
</script>

<template>
    <ul class="list-group list-group-flush">
        <li class="list-group-item" 
            v-for="category in categoryStore.categoryTree" 
            :key="category.key" 
            @click="catClickParent(category)"
            :class="{ active: activeCategoryKey === category.key }">

            {{ category.name }}

            <ul v-if="category.children.length > 0" class="list-group list-group-flush">
                <li class="list-group-item" 
                    v-for="child in category.children" 
                    :key="child.key"
                    @click.stop="catClickChild(child)"
                    :class="{ active: activeCategoryKey === child.key }">
                    {{ child.name }}
                </li>
            </ul>
        </li>
    </ul>
</template>

<style>
    li {
        cursor: pointer;
    }
</style>