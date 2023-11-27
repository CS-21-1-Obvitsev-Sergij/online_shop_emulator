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

    //const selectedParent2 = computed(() => {
    //    return categoryStore.category.some(cat => cat.key === props.category.parent);
    //});

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
            <label for="category-key" class="form-label">Category ID (key)</label>
            <input  type="text" 
                    class="form-control" 
                    name = "category-key"
                    id="category-key" 
                    :value = "props.category.key" 
                    :disabled="props.type === 'edit'"
                    required>
            <div id="category-key" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="category-name" class="form-label">Category Name</label>
            <input type="text" class="form-control" id="category-name" name="category-name" :value = "props.category.name" required>
        </div>
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
        </div>
        <button type="submit" class="btn btn-primary">{{ textBtn }}</button>
    </form>
</template>