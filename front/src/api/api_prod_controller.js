const API_URL = process.env.VUE_APP_API_URL;

export const getProductInCat = async (catKey) => {
    try {
        const response = await fetch(`${API_URL}/product/${catKey}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        return {err: true, msg:`Error in get Product in Cat request:  ${error.message}`};
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
        return products;
    } catch (error) {
        return {err: true, msg:`Error in get Product in Cat request:  ${error.message}`};
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
        return {err: true, msg:`Error in add Product request:  ${error.message}`};
    }
};

export const updateProduct = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/product`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json(); 
    } catch (error) {
        return {err: true, msg:`Error in update Product request:  ${error.message}`};
    }
};