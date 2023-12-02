<script setup>
    import {  computed } from 'vue';
    import { defineProps } from 'vue';
    import { useCategory } from '@/stores/adminPanel/categoryStore';

    const categoryStore = useCategory();
    
    const props = defineProps({
        category: Object,
        type: String
    });

    //const selectedParent = ref(props.category ? props.category.parent : null);
    let textBtn = computed(() => props.type === 'edit' ? 'Save Category' : 'Add new Category');
    const parentCategories = computed(() => {
        return categoryStore.category.filter(category => category.parent === null);
    });

    const DeleteBtnClick = async () => { // delete now click cat
        try {
            const result = await categoryStore.deleteCat(categoryStore.catNowClick.key);
            if (result.err) {
                categoryStore.error = true;
                categoryStore.msg = result.msg;
            } else {
                categoryStore.error = false;
                categoryStore.catNowClick = {parent: null}
            }
        } catch(err) {
            categoryStore.error = true;
            categoryStore.msg = err.message;
        }
        
    }

    const handleSubmit = async () => {

        if (props.type === 'edit') {
            await categoryStore.updateCategory({
            key: document.getElementById('category-key').value,
            name: document.getElementById('category-name').value,
            parent: document.getElementById('category-parent').value
            });
        } else {
            await categoryStore.addCategory({
            key: document.getElementById('category-key').value,
            name: document.getElementById('category-name').value,
            parent: document.getElementById('category-parent').value
            });
        }
        
    };
</script>

<template>
    <button v-if="categoryStore.catNowClick.key" class="btn btn-danger" @click="DeleteBtnClick">Delete this Category</button>
    <span v-else>Create new Category</span>
    <hr/>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label class="form-label" for="category-parent">Parent Category</label>
            <select class="form-control" 
                    id="category-parent" 
                    name="category-parent" 
                    v-model="categoryStore.catNowClick.parent"
                    :disabled="props.type === 'edit' && categoryStore.catNowClick.parent == 'null'">
                <option :value="null">None</option>
                <option v-for="category in parentCategories"
                        :key="category.key" 
                        :value="category.key">
                    {{ category.name }}
                </option>
            </select>
            <div v-if="!categoryStore.validCatInput.parent" class="alert alert-danger">
                {{categoryStore.validCatInput.parentMSG}}
            </div>
        </div>
        <div class="mb-3">
            <label for="category-key" class="form-label">Category ID (key)</label>
            <input  type="text" 
                    class="form-control" 
                    :class="!categoryStore.validCatInput.key?'is-invalid':''"
                    name = "category-key"
                    id="category-key" 
                    :disabled="props.type === 'edit'"
                    :value="categoryStore.catNowClick.key"
                    required>
            <div id="category-key" class="form-text">
                    Text in Latin letters, written in one word
                    <b>Example:</b> <i>category_name_unique</i>
            </div>
            <div v-if="!categoryStore.validCatInput.key" class="alert alert-danger">
                {{categoryStore.validCatInput.keyMSG}}
            </div>
        </div>
        <div class="mb-3">
            <label for="category-name" class="form-label">Category Name</label>
            <input type="text" class="form-control"
                    :class="!categoryStore.validCatInput.name?'is-invalid':''"
                    id="category-name" name="category-name" 
                    :value = "categoryStore.catNowClick.name" 
                    required>
                    <div v-if="!categoryStore.validCatInput.name" class="alert alert-danger">
                {{categoryStore.validCatInput.nameMSG}}
            </div>
        </div>
        <div class="row">
            <div class="col-5">
                <button type="submit" class="btn btn-primary">{{ textBtn }}</button>
            </div>
            <div class="col-5">
                
            </div>
        </div>
    </form>
</template>