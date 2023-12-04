<script setup>

import { useProduct } from '@/stores/adminPanel/productStore';

const productStore = useProduct();

</script>

<template>
    <div    class="alert alert-success" 
                            v-if="!productStore.errorForm && productStore.msgForm.length > 0"
                            > 
                                Add new product is ... DONE
                    </div>
                    <div    class="alert alert-warning" 
                            v-if="productStore.errorForm"
                            > 
                                <h5>Error</h5>
                                <p>{{ productStore.msgForm }}</p>
                </div>
</template>