export type UserSlice = {
  user: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean, user?: User) => void;
};

export type User = {
  displayName: string | null;
  uid: string;
  email: string | null;
  photoURL: string | null;
};
