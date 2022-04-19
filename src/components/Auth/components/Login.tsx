import Button from 'components/core/Button';
import FormInput from 'components/core/FormInput';
import { User } from 'firebase/auth';
import { motion } from 'framer-motion';
import useNotificaiton from 'hooks/useNotification';
import LockIcon from 'icons/LockIcon';
import UserIcon from 'icons/UserIcon';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { loginUser, requestVerificationEmail } from 'services/auth';
import { useStore } from 'store';
import { NotificationAction } from 'types/notifications';

type FormFields = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { control, handleSubmit, reset } = useForm<FormFields>();

  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const { createNotification } = useNotificaiton();

  const requestNewVerificationEmail = async (user: User) => {
    const response = await requestVerificationEmail(user);

    if (response.ok) {
      // reset();

      createNotification({
        message:
          'A new verification email has been sent to your provided email address.',
        title: 'Success',
        type: 'success',
        duration: 6000,
      });
    } else {
      const { message } = response.error;

      createNotification({
        message,
        title: 'Error',
        type: 'error',
      });
    }
  };

  const onSubmit = async ({ email, password }: FormFields) => {
    setIsLoading(true);

    const response = await loginUser({ email, password });
    setIsLoading(false);

    if (response.ok) {
      const { user } = response.data;
      const { emailVerified } = user;

      if (!emailVerified) {
        const action: NotificationAction = {
          text: 'Resend email?',
          onClick: () => requestNewVerificationEmail(user),
        };

        createNotification({
          action,
          message:
            'Please verify your account by following the instructions sent via email to the provided email address',
          title: 'Email not verified',
          type: 'info',
          persistent: true,
        });
      } else {
        createNotification({
          message: 'You have logged in successfully!',
          title: 'Success',
          type: 'success',
        });

        setIsAuthenticated(true, {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        });
      }
    } else {
      let action: NotificationAction = null;
      const { message, name } = response.error;

      if (name === 'UserNotConfirmedException') {
        action = {
          text: 'Verify now?',
          onClick: () => navigate('/auth/verify'),
        };
      }

      createNotification({
        action,
        message,
        title: 'Error',
        type: 'error',
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
      <p className='mb-6 text-center text-2xl font-bold text-blue'>Login</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-6'>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{
              required: {
                value: true,
                message: 'Your email is required',
              },
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
              required: {
                value: true,
                message: 'A password is required',
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
        </div>
        <Button
          loading={isLoading}
          className='mt-8'
          fullWidth
          variant='secondary'
          type='submit'
        >
          Login
        </Button>
      </form>
      <div className='mt-4 flex items-center justify-center'>
        <span className='text-secondary'>Don&apos;t have an account?</span>
        <Link className='ml-1 font-bold text-blue' to='/auth/signup'>
          Register now.
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;
