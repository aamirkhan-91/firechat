import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingIcon from 'icons/LoadingIcon';
import { FC } from 'react';

type CommonProps = {
  variant: 'primary' | 'secondary' | 'text';
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children: string;
};

type ConditionalProps =
  | {
      type?: 'button';
      onClick: () => void;
    }
  | {
      type?: 'submit';
      onClick?: never;
    };

type Props = CommonProps & ConditionalProps;

const Button: FC<Props> = ({
  variant,
  type = 'button',
  fullWidth = false,
  children,
  disabled,
  className,
  loading = false,
  onClick,
}) => {
  const onClickHandler = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const classes = [
    'py-2 px-4 rounded-lg shadow-lg text-white transition-colors duration-200 flex justify-center font-bold',
  ];

  if (fullWidth) {
    classes.push('w-full');
  }

  if (loading) {
    switch (variant) {
      case 'primary':
        classes.push('bg-purple-dark cursor-not-allowed');
        break;

      case 'secondary':
        classes.push('bg-blue cursor-not-allowed');
    }
  } else if (disabled) {
    classes.push('bg-white-darker cursor-not-allowed');
  } else {
    switch (variant) {
      case 'primary':
        classes.push('bg-purple-dark cursor-pointer hover:bg-purple-hover');
        break;

      case 'secondary':
        classes.push('bg-blue cursor-pointer hover:bg-blue-hover');
        break;
    }
  }

  if (type === 'submit') {
    return (
      <button
        type={type}
        disabled={disabled}
        className={clsx(className, classes)}
        onClick={onClick}
      >
        <AnimatePresence initial={false} exitBeforeEnter>
          {loading ? (
            <motion.div
              key='loading'
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
            >
              <LoadingIcon className='animate-spin' />
            </motion.div>
          ) : (
            <motion.div
              key='content'
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(className, classes)}
      onClick={onClickHandler}
    >
      <AnimatePresence initial={false} exitBeforeEnter>
        {loading ? (
          <motion.div
            key='loading'
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
          >
            <LoadingIcon className='animate-spin' />
          </motion.div>
        ) : (
          <motion.div
            key='content'
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default Button;
