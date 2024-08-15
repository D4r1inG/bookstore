import { Modal as GModal } from '@/UI';
import { ReactNode } from 'react';
import { SizeType } from '@/UI/lib/config-provider/SizeContext';
import { CloseIcon } from '@/components/icons';
import classNames from 'classnames';

interface IProps {
  children: ReactNode;
  size?: SizeType;
  visible?: boolean;
  width?: string;
  title?: string;
  onOk?: () => void;
  onCancel?: () => void;
  footer?: ReactNode;
  centered?: boolean;
  className?: string;
}

const Modal = ({
  children,
  title = 'Modal',
  visible,
  width,
  footer,
  onCancel,
  onOk,
  centered,
  className,
}: IProps) => {
  const modalTitle = (
    <div className="relative text-white flex items-center justify-center">
      <CloseIcon className="absolute right-0 text-[18px] cursor-pointer" onClick={onCancel} />
      <p className="m-0 text-[18px] text-center">{title}</p>
    </div>
  );

  return (
    <GModal
      closable={false}
      width={width}
      className={classNames('custom-modal', className)}
      open={visible}
      footer={footer}
      title={modalTitle}
      onCancel={onCancel}
      destroyOnClose
      onOk={onOk}
      centered={centered}
    >
      {children}
    </GModal>
  );
};

export default Modal;
