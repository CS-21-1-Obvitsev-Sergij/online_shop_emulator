<script setup>
import CategoryList from '@/components/adminPanel/CategoryList..vue';
import { useCategory } from '@/stores/adminPanel/categoryStore';
import { onMounted } from 'vue';

const categoryStore = useCategory();

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
            {{ categoryStore.catNowClick }}
            <div class="alert alert-info" v-if="!categoryStore.catNowClick">
                <p>No category selected</p>
            </div>
            <div v-else>
                <h4>{{ categoryStore.catNowClick.name }}</h4>
            </div>
            
        </div>
    </div>
</template>