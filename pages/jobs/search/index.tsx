import { Card, Grid, Loader } from 'components';
import { getJobsResult } from 'controllers';
import { resetAllJobs, resetAllJobSearchResults } from 'models';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { renderAllJobsSeaction } from '..';

export const Search = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.jobs || {});
  const [searchParams, _] = useSearchParams();
  const searchValueFromQuery = searchParams.get('query');

  useEffect(() => {
    searchValueFromQuery && dispatch?.(getJobsResult(searchValueFromQuery));
    return () => {
      dispatch?.(resetAllJobSearchResults());
    };
  }, [searchValueFromQuery]);

  return (
    <div id="jobs-page">
      <div className="container">
        {data?.searchJobsStatus?.loading && <Loader />}
        <h1>All Jobs ({data.searchJobsResults?.meta?.count})</h1>
        {renderAllJobsSeaction(data?.searchJobsResults?.jobs)}
      </div>
    </div>
  );
};
