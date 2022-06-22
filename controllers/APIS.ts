import { setErrorMessage } from 'helpers';
import { axiosInstance } from './interceptor';

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

export const getSingleSkillAPI = async (id: number): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/skill/${id}`);
    return { data: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const getArrayOfSkillsAPI = async (arrayOfIds: any[] = []): Promise<ResponseProps> => {
  try {
    const data = await Promise.all(arrayOfIds.map(async (v) => getSingleSkillAPI(v.id)));
    return { data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const getArrayOfJobsAPI = async (arrayOfIds: any[] = []): Promise<ResponseProps> => {
  try {
    const data = await Promise.all(arrayOfIds.map((v) => getSingleJobAPI(v.id)));
    return { data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};
