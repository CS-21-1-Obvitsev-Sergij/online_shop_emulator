<script setup>
// Category ADMIN PAGE
import CategoryForm from '@/components/adminPanel/CategoryForm';
import CategoryList from '@/components/adminPanel/CategoryList..vue';
import { useCategory } from '@/stores/adminPanel/categoryStore';
import { onMounted } from 'vue';

const categoryStore = useCategory();

onMounted( async() => {
   await categoryStore.getCategorys();
});

const addBtn_click = () => {
    categoryStore.categoryNow = null;
    categoryStore.validCatInput.key = true;
    categoryStore.validCatInput.name = true;
    categoryStore.validCatInput.parent = true;
}
</script>

<template>
    <h1>Category Control Page</h1>
    <hr />
    <div class="row">
        <div class="col-3">
            <h4>Categorys list</h4>
            <CategoryList :categoryTree="categoryStore.categoryTree"/>
            
        </div>
        <div class="col-7">
            <h4>Add / Edit Category</h4>
            <div class="alert alert-light">
                <CategoryForm  v-if="categoryStore.categoryNow"
                    type="edit" 
                    :category = categoryStore.categoryObjNow
                    />
                <CategoryForm v-else
                    type="add" 
                    :category = {}
                    />
            </div>
        </div>
        <div class="col-2">
            <button class="btn btn-success" @click="addBtn_click">Add Cat</button>
        </div>
    </div>
</template>

<style>
    .category-ul li {
        cursor: pointer;
    }
</style>@/stores/categoryStore