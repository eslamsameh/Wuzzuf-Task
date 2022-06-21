import { setErrorMessage } from 'helpers';
import { axiosInstance } from './interceptor';

interface ResponseProps {
  error?: Error | string;
  response?: string;
  data?: any;
}
export const getJobsService = async (page: number, limit: number): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/jobs?cursor=${page}&limit=${limit}`);
    return { data: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const searchJobsService = async (params: string) => {
  try {
    const { data } = await axiosInstance.get(`/jobs/search?query=${params}`);
    return { response: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const getSingleJobService = async (id: number): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/jobs/${id}`);
    return { response: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const getSingleSkillService = async (id: number): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/skill/${id}`);
    return { response: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

export const getArrayOfSkillsService = async (arrayOfIds: any[]): Promise<ResponseProps> => {
  try {
    const data = await Promise.all(arrayOfIds.map((v) => axiosInstance.get(`/skill/${v.id}`)));
    return { data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};
