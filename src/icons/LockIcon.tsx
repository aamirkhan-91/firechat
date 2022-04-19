import clsx from 'clsx';
import { FC } from 'react';
import { SvgProps } from 'types/common';

const LockIcon: FC<SvgProps> = ({ size = 'md', className }) => {
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
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
      />
    </svg>
  );
};

export default LockIcon;
