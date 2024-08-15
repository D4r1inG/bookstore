import { uid } from '@/utils/functions';
import { message } from '@/UI';
import { CloseIcon } from '../icons';

interface IProps {
  key?: string;
  msg?: string;
}

const GMessage = ({ key, msg }: IProps) => {
  return (
    <div className="flex items-center gap-x-[8px]">
      <span>{msg}</span>
      <CloseIcon
        className="text-xl hover:cursor-pointer bg-gray-300 rounded-[50%] text-white"
        onClick={() => {
          message.destroy(key);
        }}
      />
    </div>
  );
};

const DEFAULT_MESSAGE_DURATION = 3;
message.config({
  duration: DEFAULT_MESSAGE_DURATION,
  maxCount: 5, // Tối đa hiện 5 message
});

export const showMessage = {
  success: (msg) => {
    const key = uid(6);
    message.success({ key, content: GMessage({ key, msg }), className: 'message-custom' });
  },
  info: (msg) => {
    const key = uid(6);
    message.info({ key, content: GMessage({ msg }) });
  },
  warn: (msg) => {
    const key = uid(6);
    message.warning({
      key,
      content: GMessage({
        key,
        msg,
      }),
      className: 'message-custom',
    });
  },
  error: (msg) => {
    const key = uid(6);
    message.error({ key, content: GMessage({ key, msg }), className: 'message-custom' });
  },
  loading: (msg) => {
    const key = uid(6);
    message.loading({ key, content: GMessage({ key, msg }), className: 'message-custom' });
  },
};
