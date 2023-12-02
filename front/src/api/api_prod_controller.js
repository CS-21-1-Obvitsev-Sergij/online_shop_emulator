const API_URL = process.env.VUE_APP_API_URL;

export const getProductInCat = async (catKey) => {
    try {
        const response = await fetch(`${API_URL}/product/${catKey}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const products = await response.json();
        console.log('FRONT FETCH RESPONSE Products - ', products);
        return products;
    } catch (error) {
        console.error('Ошибка при получении products list:', error);
    }
}

export const getProductInCatArray = async (catKeys) => {
    try {
        const response = await fetch(`${API_URL}/product/parent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catKeys)
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const products = await response.json();
        console.log('FRONT FETCH RESPONSE Products - ', products);
        return products;
    } catch (error) {
        console.error('Ошибка при получении products list:', error);
    }
}


export const addProduct = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/product`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json(); 
    } catch (error) {
        return {err: true, msg:`Error in add CAT request:  ${error.message}`};
    }
};

export const updateCategory = async (cat) => {
    try {
        const response = await fetch(`${API_URL}/category`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cat)
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json(); 
    } catch (error) {
        return {err: true, msg:`Error in add CAT request:  ${error.message}`};
    }
};