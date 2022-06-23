import { Loader } from 'views/components';
import { getAllJobs } from 'controllers';
import { resetAllJobs } from 'models';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderAllJobsSeaction } from '..';

interface Props {
  jobs: {
    jobs: {
      jobs: JobObject[];
      meta: MetaProps;
    };
    jobStatus: Status;
  };
}

export const AllJobs = () => {
  const pageSize = 12;
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch();
  const { jobs, jobStatus } = useSelector((state: Props) => state.jobs || {});

  const handleLoadMore = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 10 && jobs?.meta?.next) {
      setPage(page + 1);
    }
  };

  useMemo(() => {
    page && dispatch?.(getAllJobs({ limit: pageSize, page }));
  }, [page]);

  useEffect(() => {
    dispatch?.(getAllJobs({ limit: pageSize, page }));
    return () => {
      dispatch?.(resetAllJobs());
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleLoadMore);
    return () => {
      window.removeEventListener('scroll', handleLoadMore);
    };
  }, [jobs]);

  return (
    <div id="jobs-page">
      <div className="container">
        {jobStatus?.loading && <Loader />}
        {jobStatus?.success && <h1>All Jobs ({(page + 1) * pageSize})</h1>}
        {renderAllJobsSeaction(jobs?.jobs)}
      </div>
    </div>
  );
};
