import React from "react";

import styles from "./Modal.module.css";

type Props = {
  children: React.JSX.Element;
  onClose: () => void;
};

export function Modal({ children, onClose }: Props): React.JSX.Element {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button onClick={onClose}>
          <ion-icon name="close-circle-outline" />
        </button>

        {children}
      </div>
    </div>
  );
}
