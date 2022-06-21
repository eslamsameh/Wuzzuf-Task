import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from 'helpers';
import { axiosInstance } from './interceptor';

interface ActionProps {
  limit: number;
  page: number;
}

const getJobsService = async (page: number, limit: number): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/jobs?cursor=${page}&limit=${limit}`);
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

const getSearchResultSerivce = async (value: string): Promise<ResponseProps> => {
  try {
    const { data } = await axiosInstance.get(`/jobs/search?query=${value.toLowerCase()}`);
    return { data: data.data };
  } catch (error: any) {
    return setErrorMessage(error);
  }
};

const mergeSkillsWithJobs = async (data: any) => {
  const newJobs = (data.jobs || []) as any[];

  for (const job of newJobs) {
    const skill = await getArrayOfSkillsService(job.relationships.skills);
    job.relationships.skills = skill.data.map((s: any) => s.data.data.skill);
  }
  return newJobs;
};

export const getAllJobs = createAsyncThunk('fetchJobs', async ({ page, limit }: ActionProps) => {
  const { data, error } = await getJobsService(page, limit);
  if (!error) {
    const newJobs = await mergeSkillsWithJobs(data);
    return { ...data, jobs: newJobs, error: null, loading: false };
  } else {
    return { jobs: [], error, loading: false };
  }
});

export const getJobsResult = createAsyncThunk('fetchJobSearch', async (value: string) => {
  const { data, error } = await getSearchResultSerivce(value);
  if (!error) {
    const newJobs = await mergeSkillsWithJobs(data);
    return { ...data, jobs: newJobs, error: null, loading: false };
  } else {
    return { jobs: [], error, loading: false };
  }
});
