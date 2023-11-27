import { defineStore } from 'pinia';
import { getCategorys, addCategory, updateCategory } from '@/api/api_controller';
import { createCategoryTree } from '@/func/categoryTree';

export const useCategory = defineStore('category',{
    state: () => ({
        category: [],
        categoryTree: [],
        categoryNowKey: null,
        categoryNow: null,
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
        async addCategory(cat) {
            try {
                
                const res = await addCategory(cat);
                console.log('RESPONSE after ADD CAT - ', res);
                this.getCategorys();
                return res;
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },
        async updateCategory(cat) {
            try {
                const res = await updateCategory(cat);
                console.log('RESPONSE after ADD CAT - ', res);
                return res;
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },
    }
});