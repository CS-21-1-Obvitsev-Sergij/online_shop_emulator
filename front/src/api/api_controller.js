export const getCategorys = async () => {
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
        {
            key: 'buttons_mobile_phone',
            name: 'Buttons Mobile Phone',
            parent: 'mobile_electronics'
        },
        {
            key: 'tablets',
            name: 'Tablets',
            parent: 'mobile_electronics'
        },
        {
            key: 'computers',
            name: 'Computers',
            parent: null
        },
        {
            key: 'notebooks',
            name: 'Notebooks',
            parent: 'computers'
        },
        {
            key: 'personal_computers',
            name: 'Personal Computers',
            parent: 'computers'
        },
        {
            key: 'monitors',
            name: 'Monitors',
            parent: 'computers'
        },
       
    ];
    return categorys;
};