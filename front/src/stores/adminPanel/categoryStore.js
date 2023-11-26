import { defineStore } from 'pinia';
import { getCategorys } from '@/api/api_controller';
import { createCategoryTree } from '@/func/categoryTree';

export const useCategory = defineStore('category',{
    state: () => ({
        category: [],
        categoryTree: null,
        categoryNowKey: null,
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
        async getCategorys() {
            try {
                this.category = await getCategorys();
                console.log('Get category - ', this.category);
                this.categoryTree = createCategoryTree(this.category);
                console.log('Modify to categoryTREE - ', this.categoryTree);
                this.error = false;
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },
    }
});