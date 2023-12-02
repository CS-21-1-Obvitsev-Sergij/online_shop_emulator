
import { defineStore } from 'pinia';

import {getProductInCat, getProductInCatArray, addProduct} from '@/api/api_prod_controller';

export const useProduct = defineStore('product',{
    state: () => ({
        products: [],
        msg: '',
        error: false,
        errorForm: false,
        msgForm: '',
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
        async addProduct(data) {
            try {
                console.log('ADD PRODUCT formData - ');
                
                // валидация параметров формы
                if (!data.name) {
                    this.errorForm = true;
                    this.msgForm = 'Name  - empty';
                    return;
                }
                if (!data.price || isNaN(data.price) || Number(data.price) <= 0) {
                    
                    this.errorForm = true;
                    this.msgForm = 'Price  -  must be not empty AND its must be integer ';
                    return;
                }
            
                // Проверка файла
                if (data.fileField.files.length === 0) {
                    this.errorForm = true;
                    this.msgForm = 'File  - its must be select';
                    return;
                }
            
                const file = data.fileField.files[0];
                const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!validImageTypes.includes(file.type)) {
                    this.errorForm = true;
                    this.msgForm = 'The file must be in IN format  (jpeg, png, gif)';
                    return;
                }
                // данные на отправку
                const formData = new FormData();
                formData.append('name', data.name);
                formData.append('price', data.price);
                formData.append('foto', data.fileField.files[0]);
                formData.append('cat', data.categoryKey);
               
                const result = await addProduct(formData);

                if (!result.err) {
                    this.errorForm = false;
                    console.log('Ответ от сервера - урл - ', result.data);
                } else {
                    this.error = true;
                    this.msg   = result.msg;
                }

                return;
            } catch(error) {
                this.error = true;
                this.msg   = error.message;
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


