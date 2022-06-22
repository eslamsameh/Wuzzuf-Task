declare module '*.png';

declare type Status = {
  loading: boolean;
  error?: GlobalError;
  success?: boolean;
};

declare type ResponseProps = {
  error?: Error | string;
  response?: string;
  data?: any;
};
