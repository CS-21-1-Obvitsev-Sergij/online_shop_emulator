<script setup>
import CategoryItem from './CategoryItem.vue';
import { defineProps } from 'vue';

    const props = defineProps({
      categoryTree: null
    });
</script>

<template>
    <ul class="category-ul">
      <category-item 
        v-for="category in props.categoryTree" 
        :key="category.key" 
        :category="category" 
      />
    </ul>
  </template>
  
 