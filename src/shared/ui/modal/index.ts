export { Modal } from './components/Modal';
export { ModalHeader } from './components/ModalHeader';
export { ModalBody } from './components/ModalBody';
export { ModalFooter } from './components/ModalFooter';
export { ConfirmModal } from './components/ConfirmModal';

export { useModal, useKeyboardHandler, useFocusTrap } from './hooks/useModal';
export { useModalContext } from './context/ModalContext';

export { buttonStyles } from './styles/modalStyles';

export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalSize,
  ModalVariant,
  ModalContextType,
} from './types';