import clsx from 'clsx';
import { FC } from 'react';
import { SvgProps } from 'types/common';

const InfoIcon: FC<SvgProps> = ({ size = 'md', className }) => {
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
        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
        clipRule='evenodd'
      />
    </svg>
  );
};

export default InfoIcon;
