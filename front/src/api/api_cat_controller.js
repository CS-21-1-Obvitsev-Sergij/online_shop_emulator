const API_URL = process.env.VUE_APP_API_URL;

export const getCategorys = async () => {
    try {
        const response = await fetch(`${API_URL}/category`);
        if (!response.ok) {
            throw new Error(`err: ${response.status}`);
        }
        const data = await response.json();
        console.log('FRONT FETCH RESPONSE CAT - ', data.data);
        return data;
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
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
        return await response.json(); // Предполагается, что сервер возвращает какой-то ответ
    } catch (error) {
        console.error('Ошибка при добавлении категории:', error);
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