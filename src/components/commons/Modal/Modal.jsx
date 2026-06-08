import Button from '../Button/Button';
import ModalClose from './ModalClose';
import ModalDescription from './ModalDescription';
import ModalMain from './ModalMain';
import ModalTitle from './ModalTitle';

const Modal = Object.assign(ModalMain, {
  Close: ModalClose,
  Title: ModalTitle,
  Desc: ModalDescription,
  Button: Button,
});

export default Modal;
