/*
 * @Author: 郭郭
 * @Date: 2025/12/22
 * @Description:
 */

export const buildTree = (flatData: any[], options: any = {}) => {
  const {
    idKey = 'id',
    parentKey = 'parentId',
    childrenKey = 'children',
    rootParentValue = null,
  } = options;

  // 1. 创建一个 map，以 id 为 key，值为节点对象（带 children）
  const map = new Map();
  const roots = [];

  // 初始化所有节点
  for (const item of flatData) {
    const id = item[idKey];
    map.set(id, { ...item, [childrenKey]: [] });
  }

  // 2. 遍历所有节点，挂载到父节点或根数组
  for (const item of flatData) {
    const id = item[idKey];
    const parentId = item[parentKey];
    const node = map.get(id);

    if (
      parentId === rootParentValue ||
      parentId === null ||
      !map.has(parentId) ||
      parentId === '0'
    ) {
      // 是根节点（parentId 为 null/undefined/指定值，或父节点不存在）
      roots.push(node);
    } else {
      // 找到父节点，添加到其 children
      const parent = map.get(parentId);
      parent[childrenKey].push(node);
    }
  }

  return roots;
};
