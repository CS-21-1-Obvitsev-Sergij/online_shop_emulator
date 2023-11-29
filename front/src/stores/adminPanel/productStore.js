
import { defineStore } from 'pinia';

import {getProductInCat, getProductInCatArray} from '@/api/api_prod_controller';

export const useProduct = defineStore('product',{
    state: () => ({
        products: [],
        msg: '',
        error: false
    }),

    getters: {
        categoryObjNow: (state) => {
            const foundCategory = state.category.find(category => category.key === state.categoryNow);
            console.log('Getter now cat - ', foundCategory);
            return foundCategory;
        },

    },

    actions: {
        async getProductsInCat(catKey) {
            try {
                const products = await getProductInCat(catKey);
                this.products = products;
                this.error = false;
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },
        async getProductsInCatArray(catKeys) {
            try {
                const products = await getProductInCatArray(catKeys);
                this.products = products;
                this.error = false;
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },
        async addProduct() {
            try {
                console.log('add');
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },
        async updateProduct() {
            try {
                console.log('update');
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },

        async deleteProduct() {
            try {
                console.log('delete');
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },
        
    }
});


