import clsx from 'clsx';
import { FC } from 'react';
import { SvgProps } from 'types/common';

const LogoutIcon: FC<SvgProps> = ({ size = 'md', className }) => {
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
        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
      />
    </svg>
  );
};

export default LogoutIcon;
