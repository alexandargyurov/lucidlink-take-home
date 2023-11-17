export type TreeNode = {
  label: string;
  path: string;
  children?: TreeNode[];
};

/**
 * This function builds a tree structure from a list of paths. Each path is split into its components,
 * and a tree node is created for each component if it doesn't already exist. The tree nodes are nested
 * according to the structure of the paths.
 *
 * Each tree node contains a label (the name of the directory), a path (the full path to the directory),
 * and a list of children (subdirectories).
 */
export function buildTree(paths: string[]): TreeNode[] {
  const root: TreeNode = { label: "/", path: "/", children: [] };

  for (const path of paths) {
    let currentNode = root;
    const components = path.split("/").filter(Boolean);

    for (const component of components) {
      let childNode = (currentNode.children || []).find(
        (child) => child.label === component
      );

      if (!childNode) {
        const newPath = `${currentNode.path}${component}/`;
        childNode = { label: component, path: newPath, children: [] };
        currentNode.children = [...(currentNode.children || []), childNode];
      }

      currentNode = childNode;
    }
  }

  return root.children || [];
}
