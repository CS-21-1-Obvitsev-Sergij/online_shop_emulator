require('dotenv').config();
const connectionString = "UseDevelopmentStorage=true";
const tableName = process.env.TABLE_NAME_CATEGORY;
const { TableClient, odata } = require("@azure/data-tables");
const client = TableClient.fromConnectionString(connectionString, tableName);

//const res = {
//    err: false,
//    msg: '',
//    data: null
//};

const getCategories = async ()=> {
    try {
        let entitiesIter = client.listEntities();
        const catArray = [];
        for await (const entity of entitiesIter) {
            //console.log(`Entity${i}: Name: ${entity.Name} RowKey: ${entity.rowKey}`);
            const item = {
                key: entity.rowKey,
                name: entity.Name,
                parent: entity.ParentCategory
            }
            catArray.push(item);
        }
        //console.log('all cat - ', catArray);
        return { err: false,
                msg: '',
                data: catArray
            };

    } catch(err) {
        return { err: true,
            msg: err.message
        };
    }
    
}

const getOneEntity = async (keys) => {
    try {
        const entity = await client.getEntity(keys.partitionKey, keys.rowKey);
        return { err: false,
            msg: '',
            data: entity
       };
    } catch(err) {
        if (err.statusCode === 404) {
            return { err: false, msg: 'Not Found', data:{} };
        } else {
            
            return { err: true, msg: err.message };
        }
    }
}

const addCategory = async (cat) => {
    try {
        
        if (cat.parent == 'None' || cat.parent == '') {
            cat.parent = 'null';
        }
        const testEntity = {
            PartitionKey: "category",
            RowKey: cat.key,
            Name: cat.name,
            ParentCategory: cat.parent
          };
        await client.createEntity(testEntity);

        return { err: false,
                 msg: '',
                 data: cat
        };

    } catch(err) {
        return { err: true,
                 msg: err.message
       };
    }
}

const updateCategory = async (cat) => {
    try {

        if (cat.parent == 'None') {
            cat.parent = 'null';
        }

        const testEntity = {
            partitionKey: "category",
            rowKey: cat.key,
            Name: cat.name,
            ParentCategory: cat.parent
          };
        await client.updateEntity(testEntity, "Replace"); //Marge

        return { err: false,
            msg: '',
            data: null
   };
    } catch(err) {
        return { err: true,
            msg: err.message
        };
    }
}

const deleteCategory = async (catKeys) => {
    try { 
        // catKey.partitionKey catKey.rowKey
        // удалить можно нижнюю категорию, а можно заглавную (с подкатегориями)
        // в категории могут быть товары, а могут не быть

        // 1 - прочитать данные про катгеорию с таблицы +

        // 2 - если parent ==null Значить заглавная категория
            // 2 - а получить список подкатегорий
            // 2 - б удалить все подкатегории  deleteCategory()
            // 2 - с удалить все товары с этими категориями

        // 3 - если парент что тесть - значит  не заглавная
            // 3 - а удалить все товары для этой категории ?!?
        return { err: false,
                msg: '',
                data: catKeys
        };
       
    } catch(error) {
        return { err: true,
                 msg: err.message
        };
    }
};
// get categories whit this parent category
const getCategoriesWhithParent = async (parentKey) => {
    try {
        const filter = odata`ParentCategory eq ${parentKey}`; 
        const childCats = [];
        //console.log(filter);
    
        const entities = client.listEntities({
            queryOptions: { filter: filter }
        });

        for await (const entity of entities) {
            childCats.push(entity);
        } 
       return {err:false, data: childCats};
    } catch(err) {
        return { err: true,
                 msg: err.message
        };
    }
    

};
// delete category 
const deleteOneCategory = async (catKey) => { 
    try {
        const resDel = await client.deleteEntity('category', catKey);
        return {err:false}
    } catch(err) {
        return { err: true,
                msg: err.message
        };
    }
};

  module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getOneEntity,
    getCategoriesWhithParent,
    deleteOneCategory
};