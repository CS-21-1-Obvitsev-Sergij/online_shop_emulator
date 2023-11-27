export const createCategoryTree = (categories) => {
    let map = {}, node, roots = [], i;
    console.log ('in create TREE 1');
    for (i = 0; i < categories.length; i += 1) {
      map[categories[i].key] = i; 
      categories[i].children = [];
    }
    console.log ('in create TREE 2');
  
    for (i = 0; i < categories.length; i += 1) {
      node = categories[i];
      if (node.parent == 'null') {
        node.parent = null;
      }
      if (node.parent !== null) {
       
        categories[map[node.parent]].children.push(node);
      } else {
        roots.push(node); 
      }
    }
    console.log ('in create TREE 3');
    return roots;
  }