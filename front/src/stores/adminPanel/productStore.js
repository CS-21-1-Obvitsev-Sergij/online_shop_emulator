
import { defineStore } from 'pinia';

import {getProductInCat, getProductInCatArray, addProduct} from '@/api/api_prod_controller';

export const useProduct = defineStore('product',{
    state: () => ({
        products: [],
        msg: '',
        error: false,
        errorForm: false,
        msgForm: '',
        isProductEdit: false,
        nowEditProduct: {},
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
                if (!products.err) {
                    this.error = false;
                    this.products = products.data;
                    console.log(this.products);
                } else {
                    this.error = true;
                    this.msg   = products.msg;
                    this.products = [];
                }
                return;
            } catch(error) {
                this.error = true;
                this.msg   = error.message;
            }
        },
        async getProductsInCatArray(catKeys) {
            try {
                const products = await getProductInCatArray(catKeys);
                if (!products.err) {
                    this.error = false;
                    this.products = products.data;
                } else {
                    this.error = true;
                    this.msg   = products.msg;
                    this.products = [];
                }
                return;
            } catch(error) {
                this.error = true;
                this.msg   = error.message;
            }
        },
        async addProduct(data) {
            this.msgForm = '';
            this.errorForm = false;
            try {
                console.log('ADD PRODUCT formData - ', data);
                
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
                    this.msgForm   = 'Product is add success!';
                   
                } else {
                    console.log('error in add');
                    this.errorForm = true;
                    this.msgForm   = result.msg;
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


