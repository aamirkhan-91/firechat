import Button from 'components/core/Button';
import FormInput from 'components/core/FormInput';
import { motion } from 'framer-motion';
import useNotificaiton from 'hooks/useNotification';
import LockIcon from 'icons/LockIcon';
import UserIcon from 'icons/UserIcon';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signupUser } from 'services/auth';
import { AuthErrorCodes } from 'types/auth';
import { NotificationAction } from 'types/notifications';

type FormFields = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createNotification } = useNotificaiton();

  const location = useLocation();
  const navigate = useNavigate();

  const { control, getValues, handleSubmit, reset } = useForm<FormFields>();

  const onSubmit = async ({ email, displayName, password }: FormFields) => {
    setIsLoading(true);

    const response = await signupUser({ displayName, password, email });
    setIsLoading(false);

    if (response.ok) {
      // reset();

      const action: NotificationAction = {
        text: 'Done verifying? Login now.',
        onClick: () => navigate('/auth/login'),
      };

      createNotification({
        action,
        message:
          'An email has been sent to the provided email with instructions to verify your account.',
        title: 'Verify your email',
        type: 'info',
        persistent: true,
      });
    } else {
      let action: NotificationAction = null;
      const { message, name, code } = response.error;

      if (code === AuthErrorCodes.EMAIL_EXISTS) {
        action = {
          text: 'Login instead?',
          onClick: () => navigate('/auth/login'),
        };
      }

      createNotification({
        message,
        action,
        title: 'Error',
        type: 'error',
        persistent: true,
      });
    }
  };

  let exitAnimation: {
    opacity: number;
    scale?: number;
    x?: string;
  } = {
    opacity: 0,
    scale: 0,
  };

  if (location.pathname === '/auth/verify') {
    exitAnimation = {
      opacity: 0,
      x: '-100%',
    };
  }

  return (
    <motion.div
      exit={exitAnimation}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      initial={{
        opacity: 0,
        scale: 0,
      }}
      className='z-[10] min-w-[300px] rounded-md bg-white p-6 shadow-lg'
    >
      <p className='mb-6 text-center text-2xl font-bold text-blue'>
        Create an account
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-7'>
          <Controller
            name='displayName'
            control={control}
            defaultValue=''
            rules={{
              required: 'Your full name is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInput
                icon={<UserIcon size='sm' />}
                value={value}
                label='Full Name'
                onChange={onChange}
                error={error || null}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{
              required: 'Your email is required',
              pattern: {
                value:
                  // eslint-disable-next-line no-useless-escape
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Provided email is invalid',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInput
                icon={<UserIcon size='sm' />}
                value={value}
                label='Email'
                onChange={onChange}
                error={error || null}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            defaultValue=''
            rules={{
              required: 'A password is required',
              pattern: {
                value:
                  // eslint-disable-next-line no-useless-escape
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])\S{8,99}$/,
                message:
                  'A valid password must be at least 8 characters, contain at least one of a number, a special character, an uppercase character and 1 lowercase letter',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInput
                icon={<LockIcon size='sm' />}
                value={value}
                label='Password'
                type='password'
                error={error || null}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name='confirmPassword'
            control={control}
            defaultValue=''
            rules={{
              validate: {
                matchesPassword: (value) => {
                  const { password } = getValues();

                  return password === value || 'Passwords must match';
                },
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInput
                icon={<LockIcon size='sm' />}
                value={value}
                label='Confirm Password'
                type='password'
                error={error || null}
                onChange={onChange}
              />
            )}
          />
        </div>
        <Button
          loading={isLoading}
          className='mt-8'
          fullWidth
          variant='secondary'
          type='submit'
        >
          Sign Up
        </Button>
      </form>
      <div className='mt-4 flex items-center justify-center'>
        <span className='text-secondary'>Already have an account?</span>
        <Link className='ml-1 font-bold text-blue' to='/auth/login'>
          Login.
        </Link>
      </div>
    </motion.div>
  );
};

export default Signup;
