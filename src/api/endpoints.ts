const TREE_NAME_PARAM = '?treeName=alex-llewton-tree';

export const API_RENAME_NODE_URL = `${
  import.meta.env.VITE_API_RENAME_NODE_URL
}${TREE_NAME_PARAM}`;
export const API_GET_TREE_URL = `${import.meta.env.VITE_API_GET_TREE_URL}
${TREE_NAME_PARAM}`;

export const API_DELETE_NODE_URL = `${
  import.meta.env.VITE_API_DELETE_NODE_URL
}${TREE_NAME_PARAM}`;

export const API_CREATE_NODE_URL = `${
  import.meta.env.VITE_API_CREATE_NODE_URL
}${TREE_NAME_PARAM}`;
