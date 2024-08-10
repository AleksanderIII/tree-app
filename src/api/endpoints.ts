const TREE_NAME_PARAM = '?treeName=alex-llewton-tree';

function createApiUrl(baseUrl: string): string {
  return `${baseUrl}${TREE_NAME_PARAM}`;
}

export const API_RENAME_NODE_URL = createApiUrl(
  import.meta.env.VITE_API_RENAME_NODE_URL
);
export const API_GET_TREE_URL = createApiUrl(
  import.meta.env.VITE_API_GET_TREE_URL
);
export const API_DELETE_NODE_URL = createApiUrl(
  import.meta.env.VITE_API_DELETE_NODE_URL
);
export const API_CREATE_NODE_URL = createApiUrl(
  import.meta.env.VITE_API_CREATE_NODE_URL
);
