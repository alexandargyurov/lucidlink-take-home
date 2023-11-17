import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SidebarNode.module.css";
import { TreeNode } from "../../lib/buildTree";

type Props = {
  node: TreeNode;
};

export function SidebarNode({ node }: Props): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const [childrenOpen, setChildrenOpen] = useState(false);

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    if (e.detail === 2) {
      return; // Return early if it's a double click
    }

    e.stopPropagation();
    setChildrenOpen(!childrenOpen);
  }

  function handleDoubleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.stopPropagation();
    navigate(node.path);
  }

  return (
    <button
      className={styles.sidebarNode}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div>
        <ion-icon
          name={
            childrenOpen ? "chevron-down-outline" : "chevron-forward-outline"
          }
        />
        <span
          style={{ color: location.pathname === node.path ? "blue" : "black" }}
        >
          {node.label}
        </span>
      </div>

      {childrenOpen &&
        node.children?.map((child, index) => (
          <SidebarNode key={index} node={child} />
        ))}
    </button>
  );
}
