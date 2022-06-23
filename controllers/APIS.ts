import { axiosInstance } from './interceptor';

const setErrorMessage = (error: any) => {
  const err = {
    error: error.response?.data?.errors?.message || error.response?.data?.errors || error.message,
  };
  return err;
};

interface ResponseProps {
  error?: Error | string;
  response?: string;
  data?: any;
}
export const getJobsAPI = async (page: number, limit: number): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/jobs?cursor=${page}&limit=${limit}`);
    return { data: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const searchJobsAPI = async (params: string): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/jobs/search?query=${params.toLowerCase()}`);
    return { data: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const getSingleJobAPI = async (id: string): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/job/${id}`);
    return { data: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const getSingleSkillAPI = async (id: string): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/skill/${id}`);
    return { data: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const getSkillAPI = async (value: string): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/skill/${value}`);
    return { data: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const getArrayOfSkillsAPI = async (arrayOfIds: SkillObject[] = []): Promise<ResponseProps> => {
  try {
    const data = await Promise.all(arrayOfIds.map(async ({ id }) => getSingleSkillAPI(id)));
    return { data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const getArrayOfJobsAPI = async (arrayOfIds: JobObject[] = []): Promise<ResponseProps> => {
  try {
    const data = await Promise.all(arrayOfIds.map(({ id }) => getSingleJobAPI(id)));
    return { data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};
