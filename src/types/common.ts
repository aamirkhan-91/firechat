export type SvgProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};

type ApiErrorResponse<U> = {
  ok: false;
  error: U;
};

type ApiOkResponse<T> = {
  ok: true;
  data: T;
};

export type ApiResponse<T, U> = ApiErrorResponse<U> | ApiOkResponse<T>;
