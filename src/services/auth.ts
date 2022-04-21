import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  // eslint-disable-next-line import/named
  User,
  // eslint-disable-next-line import/named
  UserCredential,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import {
  AuthErrorCodes,
  AuthResponse,
  FirebaseAuthError,
  SignUpRequest,
} from 'types/auth';

import firebaseApp from '../firebase';

export const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

setPersistence(auth, browserLocalPersistence);

const authErrorMap: { [key in AuthErrorCodes]?: string } = {
  [AuthErrorCodes.EMAIL_EXISTS]: 'The provided email is already in use.',
  [AuthErrorCodes.USER_DELETED]: "The provided email address wasn't found.",
  [AuthErrorCodes.INVALID_PASSWORD]: 'The provided password is incorrect.',
};

const getErrorMessage = (code: AuthErrorCodes): string => {
  const message = authErrorMap[code];

  if (message) {
    return message;
  } else return 'An error occurred. Please try again.';
};

export const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse<UserCredential>> => {
  return new Promise((resolve) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        resolve({
          ok: true,
          data: response,
        });
      })
      .catch((error: FirebaseAuthError) => {
        resolve({
          ok: false,
          error: {
            code: error.code,
            message: getErrorMessage(error.code),
            name: error.name,
          },
        });
      });
  });
};

export const signupUser = ({
  displayName,
  email,
  password,
}: SignUpRequest): Promise<AuthResponse<UserCredential>> => {
  return new Promise((resolve) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const { user } = response;

        updateProfile(user, {
          displayName,
        });

        sendEmailVerification(user);

        setDoc(doc(firestore, 'users', user.uid), {
          displayName,
          uid: user.uid,
          email: user.email,
        });

        // setDoc(doc(firestore, 'contacts', user.uid), {
        //   list: [],
        // });

        resolve({
          ok: true,
          data: response,
        });
      })
      .catch((error: FirebaseAuthError) => {
        // debugger;
        resolve({
          ok: false,
          error: {
            code: error.code,
            message: getErrorMessage(error.code),
            name: error.name,
          },
        });
      });
  });
};

export const requestVerificationEmail = (
  user: User
): Promise<AuthResponse<void>> => {
  return new Promise((resolve) => {
    sendEmailVerification(user)
      .then((response) => {
        resolve({
          ok: true,
          data: response,
        });
      })
      .catch((error: FirebaseAuthError) => {
        resolve({
          ok: false,
          error: {
            code: error.code,
            message: error.message,
            name: error.name,
          },
        });
      });
  });
};

export const logout = () => {
  return new Promise((resolve) => {
    signOut(auth)
      .then((response) => {
        resolve({
          ok: true,
          data: response,
        });
      })
      .catch((error: FirebaseAuthError) => {
        resolve({
          ok: false,
          error: {
            code: error.code,
            message: error.message,
            name: error.name,
          },
        });
      });
  });
};
