import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TreeNode } from "../../lib/buildTree";

type Props = {
  node: TreeNode;
};

export function SidebarNode({ node }: Props): React.JSX.Element {
  const navigate = useNavigate();

  const [childrenOpen, setChildrenOpen] = useState(false);

  function handleClick(): void {
    setChildrenOpen(!childrenOpen);
  }

  function handleDoubleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    navigate(node.path);
  }

  return (
    <>
      <button onClick={handleClick} onDoubleClick={handleDoubleClick}>
        {node.label}
      </button>

      {childrenOpen &&
        node.children?.map((child, index) => (
          <SidebarNode key={index} node={child} />
        ))}
    </>
  );
}
