import { ReactNode } from 'react';
import { DatePicker as GDatePicker } from '@/UI';
import classNames from 'classnames';
import { ArrowDownIcon } from '@/components/icons';

interface IProps {
  className?: string;
  placement?: any;
  placeholder?: string;
  suffixIcon?: ReactNode;
  label?: string;
}

const DatePicker = (props: IProps) => {
  return (
    <div className="custom-datepicker w-full">
      {props.label && <p className="m-0 mb-1 text-sm font-medium select-label">{props.label}</p>}
      <GDatePicker
        className={classNames('w-full', props.className)}
        placement={props.placement}
        placeholder={props.placeholder}
        suffixIcon={<ArrowDownIcon />}
      ></GDatePicker>
    </div>
  );
};

export default DatePicker;
