const API_URL = process.env.VUE_APP_API_URL;

export const getCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/category`);
        if (!response.ok) {
            throw new Error(`err: ${response.status}`);
        }
        const data = await response.json();
        //console.log('FRONT FETCH RESPONSE CAT - ', data);
        return data;
    } catch (error) {
        return {err: true, msg:`Error in send GET-CAT request:  ${error.message}`};
    }
/*
    const categorys = [
        {
            key: 'mobile_electronics',
            name: 'Mobile Electronics',
            parent: null
        },
        {
            key: 'smart_phones',
            name: 'SmartPhones',
            parent: 'mobile_electronics'
        },
      */
};

export const addCategory = async (cat) => {
    try {
        const response = await fetch(`${API_URL}/category`, {
            method: 'POST',
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
        console.error('Ошибка при обновлении категории:', error);
    }
};

export const deleteCategory = async (catKey) => {
    try {
        console.log('FRONT API DELETE . catKey - ', catKey);
        const response = await fetch(`${API_URL}/category/${encodeURIComponent(catKey)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Ошибка при delete категории:', error);
    }
};