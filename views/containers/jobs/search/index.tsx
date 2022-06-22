import { Grid, Loader, RealedViewCard } from 'views/components';
import { getJobsResult } from 'controllers';
import { addSearchHistory, getSearchResults, resetAllJobSearchResults } from 'models';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { renderAllJobsSeaction } from '..';
import './styles.scss';
import { Link } from 'react-router-dom';

export const Search = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.jobs || {});
  const [searchParams, _] = useSearchParams();
  const searchValueFromQuery = searchParams.get('query');

  useEffect(() => {
    dispatch(getSearchResults());
  }, []);

  useEffect(() => {
    searchValueFromQuery && dispatch?.(getJobsResult(searchValueFromQuery));
    return () => {
      dispatch?.(resetAllJobSearchResults());
    };
  }, [searchValueFromQuery]);

  useMemo(() => {
    if (data?.searchJobsResults?.jobs?.length) {
      dispatch(addSearchHistory(searchValueFromQuery!));
    }
  }, [data?.searchJobsResults?.jobs?.length]);

  const renderSearchHistorySection = () => (
    <RealedViewCard title="Search history">
      <ul className="mt-25">
        {data?.searchHistory?.map((v: string) => (
          <li>
            <Link to={`/jobs/search?query=${v}`}>
              <p>{v}</p>
            </Link>
          </li>
        ))}
      </ul>
    </RealedViewCard>
  );

  return (
    <div id="search-page">
      <div className="container">
        {data?.searchJobsStatus?.loading && <Loader />}
        <h1>
          {`“${searchValueFromQuery}”`} Jobs ({data.searchJobsResults?.meta?.count})
        </h1>
        <Grid expanded row>
          <Grid className="grid-spaces" column sm={12} md={8} lg={8}>
            {renderAllJobsSeaction(data?.searchJobsResults?.jobs)}
          </Grid>
          <Grid className="spaces-view-related-card" column sm={12} md={4} lg={4}>
            {renderSearchHistorySection()}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
