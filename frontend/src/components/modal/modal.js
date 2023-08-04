/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import ReactModal from 'react-modal';
import { styles, customStyles } from '../styles/modal/modal.style.js';

function Modal({ isOpen, closeModal, children, ...props }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'unset');
  });

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      style={customStyles}
      closeTimeoutMS={2000}
      onRequestClose={closeModal}
      {...props}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;

export const CloseButton = ({ onClick, size, color, ...props }) => {
  return (
    <button sx={styles.button} onClick={onClick} {...props}>
      <GrClose size={size ?? '24px'} color={color ?? color} />
    </button>
  );
};