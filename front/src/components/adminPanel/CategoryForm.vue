<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        category: Object,
        type: String
    });

    let textBtn = 'Add new Category';
    if (props.type === 'edit') {
        textBtn = 'Save Category';
    }
</script>

<template>
    <form>
        <div class="mb-3">
            <label for="category-key" class="form-label">Category ID (key)</label>
            <input  type="email" 
                    class="form-control" 
                    name = "category-key"
                    id="category-key" 
                    aria-describedby="emailHelp"
                    :value = "props.category.key" required>
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Category Name</label>
            <input type="text" class="form-control" id="category-name" name="category-name" :value = "props.category.name" required>
        </div>
        <div class="mb-3">
            <label class="form-check-label" for="category-parent">Parrent Category</label>
            <input type="text" class="form-control" id="category-parent" name="category-parent" :value = "props.category.parent">
        </div>
        <button type="submit" class="btn btn-primary">{{ textBtn }}</button>
    </form>
</template>