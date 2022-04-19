import clsx from 'clsx';
import { FC } from 'react';
import { SvgProps } from 'types/common';

const CheckIcon: FC<SvgProps> = ({ size = 'md', className }) => {
  let classes = ['h-6 w-6'];

  if (size === 'sm') {
    classes = ['h-5 w-5'];
  } else if (size === 'lg') {
    classes = ['h-8 w-8'];
  } else if (size === 'xl') {
    classes = ['h-12 w-12'];
  } else if (size === 'xxl') {
    classes = ['h-16 w-16'];
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={clsx(classes, className)}
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path
        fillRule='evenodd'
        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
        clipRule='evenodd'
      />
    </svg>
  );
};

export default CheckIcon;
