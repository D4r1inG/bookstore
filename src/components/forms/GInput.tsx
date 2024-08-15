import { Input as GInput } from '@/UI';
import { SizeType } from '@/UI/lib/config-provider/SizeContext';
import classNames from 'classnames';

interface IProps {
  border?: 'line' | 'box';
  size?: SizeType;
  iconPlacement?: 'left' | 'right';
  label?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  onChange?: () => void;
  pressEnter?: () => void;
  type?: string;
  showCount?: boolean;
  prefix?: any;
  maxlength?: number;
  defaultValue?: string;
  className?: string;
  suffix?: any;
}

export default function Input(props: IProps) {
  const classInput = classNames(
    'rounded leading-6 px-3 py-2 h-[40px]',
    { rightIcon: props.iconPlacement === 'right', 'ant-input-line': props.border === 'line' },
    props.className
  );
  return (
    <div className="input-group">
      {props.label && <p className="m-0 mb-1 text-sm font-medium input-label">{props.label}</p>}
      <GInput
        className={classInput}
        disabled={props.disabled}
        size={props.size}
        placeholder={props.placeholder}
        name={props.name}
        type={props.type}
        defaultValue={props.defaultValue}
        maxLength={props.maxlength}
        prefix={props.prefix}
        showCount={props.showCount}
        onChange={props.onChange}
        onPressEnter={props.pressEnter}
        suffix={props.suffix}
      />
    </div>
  );
}
