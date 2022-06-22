import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from 'helpers';
import { axiosInstance } from './interceptor';

const getSingleJobService = async (value: string): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/job/${value}`);
    return { data: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

const getArrayOfSkillsService = async (arrayOfIds: any[]): Promise<ResponseProps> => {
  try {
    const data = await Promise.all(arrayOfIds.map((v) => axiosInstance.get(`/skill/${v.id}`)));
    return { data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

const getArrayOfJobsService = async (arrayOfIds: any[]): Promise<ResponseProps> => {
  try {
    const data = await Promise.all(arrayOfIds.map((v) => axiosInstance.get(`/job/${v.id}`)));
    return { data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

const mergeSkillsWithJobs = async (data: any) => {
  const newData = (data.job || {}) as any;

  const skills = await getArrayOfSkillsService(newData.relationships.skills);
  const jobs = await getArrayOfJobsService(newData.relationships.jobs);

  newData.relationships.skills = skills?.data?.map((s: any) => s.data.data.skill) || [];
  newData.relationships.jobs = jobs?.data?.map((j: any) => j.data.data.job) || [];

  return newData;
};

export const getSingleJob = createAsyncThunk('fetchSingleJob', async (id: string) => {
  const { data, error } = await getSingleJobService(id);
  if (!error) {
    const newJob = await mergeSkillsWithJobs(data);
    return { ...data, job: newJob, error: null, loading: false };
  } else {
    return { job: {}, error, loading: false };
  }
});
