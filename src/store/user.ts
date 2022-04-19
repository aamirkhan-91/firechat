import { StoreSlice } from 'store';
import { User, UserSlice } from 'types/user';

const createUserSlice: StoreSlice<UserSlice> = (set) => ({
  user: null,
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated, user) =>
    set((state) => {
      if (isAuthenticated) {
        return { isAuthenticated, user: user ? user : state.user };
      }

      return {
        isAuthenticated: false,
        user: null,
      };
    }),
  setUser: (user: User) =>
    set(() => ({
      user,
    })),
});

export default createUserSlice;
