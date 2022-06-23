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

declare type JobObject = {
  id: string;
  type: 'job';
  attributes: {
    title: string;
  };
  relationships: {
    skills: SkillProps[];
    jobs: JobObject[];
  };
};

declare type SkillObject = {
  id: string;
  type: 'skill';
  attributes: {
    name: string;
    type: string;
    importance: string;
    level: string;
  };
  relationships: {
    skills: SkillObject[];
    jobs: JobObject[];
  };
};

declare type MetaProps = {
  next: number;
  count: number | undefined;
};
