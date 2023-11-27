<script setup>
    import { ref, computed } from 'vue';
    import { defineProps } from 'vue';
    import { useCategory } from '@/stores/adminPanel/categoryStore';

    const categoryStore = useCategory();
    
    const props = defineProps({
        category: Object,
        type: String
    });

    const selectedParent = ref(props.category ? props.category.parent : null);
    let textBtn = computed(() => props.type === 'edit' ? 'Save Category' : 'Add new Category');

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
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label class="form-label" for="category-parent">Parent Category - selectedParent: {{ selectedParent }}</label>
            <select class="form-control" id="category-parent" name="category-parent" v-model="selectedParent">
                <option :value="null">None</option>
                <option v-for="category in categoryStore.category"
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
                    :value="props.category.key"
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
                    :value = "props.category.name" 
                    required>
                    <div v-if="!categoryStore.validCatInput.name" class="alert alert-danger">
                {{categoryStore.validCatInput.nameMSG}}
            </div>
        </div>
        <button type="submit" class="btn btn-primary">{{ textBtn }}</button>
    </form>
</template>