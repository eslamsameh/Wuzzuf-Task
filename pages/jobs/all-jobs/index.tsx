import { Loader } from 'components';
import { getAllJobs } from 'controllers';
import { resetAllJobs } from 'models';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderAllJobsSeaction } from '..';

export const AllJobs = () => {
  const pageSize = 12;
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.jobs || {});

  const handleLoadMore = async () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight && data.jobs?.meta?.next) {
      await dispatch?.(getAllJobs({ limit: pageSize, page: page + 1 }));
      setPage(page + 1);
    }
  };

  useEffect(() => {
    dispatch?.(getAllJobs({ limit: pageSize, page: page + 1 }));
    return () => {
      dispatch?.(resetAllJobs());
    };
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleLoadMore);
    return () => {
      document.removeEventListener('scroll', handleLoadMore);
    };
  }, [data]);

  return (
    <div id="jobs-page">
      <div className="container">
        {data?.jobStatus?.loading && <Loader />}
        <h1>All Jobs ({(page + 1) * pageSize})</h1>
        {renderAllJobsSeaction(data?.jobs?.jobs)}
      </div>
    </div>
  );
};
