import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';

type Props = {
  label: string;
  type?: string;
  icon?: JSX.Element | null;
  value: string;
  error: FieldError | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = ({
  label,
  value,
  type,
  error = null,
  icon = null,
  onChange,
}) => {
  const [focussed, setFocussed] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error && error.message) {
      setErrorMessage(error.message);
    }
    // else {
    //   setTimeout(() => {
    //     setErrorMessage(null);
    //   }, 75);
    // }
  }, [error]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: updatedValue } = e.target;
    if (updatedValue) {
      setHasText(true);
    } else {
      setHasText(false);
    }

    onChange(e);
  };

  const inputClasses: string[] = [
    'w-full rounded-lg border-2 border-solid border-border p-2 outline-none transition-colors duration-150',
  ];

  const labelClasses: string[] = [
    'absolute origin-top-left transition duration-150 top-1/2 -translate-y-1/2 bg-white px-1 user-select-none cursor-text',
  ];

  if (focussed && error === null) {
    inputClasses.push('border-blue text-blue');
  }

  if (error !== null) {
    inputClasses.push('border-red text-error');
  }

  if (focussed || hasText) {
    labelClasses.push(
      'transform translate-y-[-33px] -translate-x-[8px] scale-[0.85]'
    );
  }

  return (
    <div className='relative w-full'>
      {icon !== null ? (
        <span
          className={clsx('transfor absolute top-1/2 left-2 -translate-y-1/2', {
            'text-secondary': !focussed && error === null,
            'text-blue': focussed && error === null,
            'text-error': error !== null,
          })}
        >
          {icon}
        </span>
      ) : null}
      <label
        htmlFor={label}
        className={clsx(labelClasses, {
          'text-secondary': !focussed && error === null,
          'text-error': error !== null,
          'text-blue': focussed && error === null,
          'left-4': icon === null,
          'left-8': icon !== null,
        })}
      >
        {label}
      </label>
      <input
        id={label}
        autoComplete='off'
        value={value}
        type={type}
        className={clsx(inputClasses, {
          'indent-1': icon === null,
          'indent-6': icon !== null,
        })}
        onFocus={() => setFocussed(true)}
        onBlur={() => setFocussed(false)}
        onChange={onChangeHandler}
      />
      <AnimatePresence>
        {error !== null && (
          <motion.p
            initial={{
              opacity: 0,
              y: '-50%',
            }}
            exit={{
              opacity: 0,
              y: '-50%',
            }}
            animate={{
              opacity: 1,
              y: '0%',
            }}
            transition={{
              ease: 'easeInOut',
              duration: 0.15,
            }}
            className='absolute top-[calc(100%+3px)] text-xs text-error'
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
