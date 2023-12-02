import { defineStore } from 'pinia';
import { getCategories, addCategory, updateCategory, deleteCategory } from '@/api/api_cat_controller';
import { createCategoryTree } from '@/func/categoryTree';

export const useCategory = defineStore('category',{
    state: () => ({
        category: [],
        categoryTree: [],
        categoryNowKey: null,
        categoryNow: null,
        validCatInput: {  //валидация полей для добавления/обновления категории
            key: true,
            keyMSG: '',
            name: true,
            nameMSG: '',
            parent: true,
            parentMSG: ''
        },
        catNowClick: { children: []},
        msg: '',
        error: false
    }),

    getters: {
        categoryObjNow: (state) => {
            const foundCategory = state.category.find(category => category.key === state.categoryNow);
            console.log('Getter now cat - ', foundCategory);
            return foundCategory;
        },

        mapCategoryKey: (state) => {
            const catKeys = state.catNowClick.children.map(child => child.key);
            return catKeys;
        },
    },

    actions: {
        async getCategories() {
            try {
                const result = await getCategories();
                if (result.err) {
                    this.error = true;
                    this.msg   = result.msg;
                    return;
                }
                
                this.category = result.data;
                this.categoryTree = createCategoryTree(this.category);
        
                this.error = false;
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },
        async addCategory(cat) {
            try {
                cat.key = cat.key.toLowerCase();
                if (!this.validKey(cat.key)) {
                    
                    return false;
                }
                console.log('ADD CAT (IN STORAGE) - ', cat);
                const result = await addCategory(cat);
                if (result.err) {
                    this.error = true;
                    this.msg   = result.msg;
                    return;
                }
                console.log('RESPONSE (in CAT STORAGE) after ADD CAT - ', result);
                await this.getCategories();
                return result.data;
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },
        async updateCategory(cat) {
            try {
                if (!this.validKey(cat.key)) {
                 
                    return false;
                }
                const res = await updateCategory(cat);
                console.log('RESPONSE after UPDATE CAT - ', res);
                this.getCategories();
                return res;
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },
        async deleteCat(catKey) {
            try {
                const res = await deleteCategory(catKey);
                //console.log('RESPONSE after DELETE CAT - ', res, ' || CatKey = ', catKey);
                this.getCategories();
                return res;
            } catch(error) {
                this.error = true;
                this.msg   = error;
            }
        },

        validKey(key) {
            const regex = /^[a-z0-9_]+$/;
            if (!regex.test(key)) {
                this.validCatInput.key = false;
                this.validCatInput.keyMSG = 'Invalid category key. Use only lowercase Latin letters and numbers, no spaces.';
                return false;
            } else {
                this.validCatInput.key = true;
                this.validCatInput.keyMSG = '';
                return true;
            }
        }
    }
});