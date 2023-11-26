export const createCategoryTree = (categories) => {
    let map = {}, node, roots = [], i;
  
    for (i = 0; i < categories.length; i += 1) {
      map[categories[i].key] = i; 
      categories[i].children = [];
    }
  
    for (i = 0; i < categories.length; i += 1) {
      node = categories[i];
      if (node.parent !== null) {
       
        categories[map[node.parent]].children.push(node);
      } else {
        roots.push(node); 
      }
    }
    return roots;
  }