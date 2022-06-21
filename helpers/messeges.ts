export const setErrorMessage = (error: any) => {
  const err = {
    error: error.response?.data?.errors?.message || error.response?.data?.errors || error.message,
  };
  return err;
};
