<script setup>
import { defineProps } from 'vue';
import { useCategory } from '@/stores/adminPanel/categoryStore';
import { useProduct } from '@/stores/adminPanel/productStore';

const categoryStore = useCategory();
const productStore = useProduct();
const props = defineProps({
  category: Object
});

const handleCategoryClick = () => {
  categoryStore.catNowClick = props.category;
  categoryStore.categoryNow = props.category.key;
  productStore.isProductEdit = false;
  //console.log(props.category.key);
};
</script>

<template>
    <li @click.stop="handleCategoryClick">
      {{ category.name }}
      <ul v-if="category.children.length">
        <category-item 
          v-for="child in category.children" 
          :key="child.key" 
          :category="child"
        />
      </ul>
    </li>
  </template>
  
  