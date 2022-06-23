import { Grid, Loader, RealedViewCard } from 'views/components';
import { getJobsResult } from 'controllers';
import { addSearchHistory, getSearchResults, resetAllJobSearchResults } from 'models';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { renderAllJobsSeaction } from '..';
import './styles.scss';
import { Link } from 'react-router-dom';

interface Props {
  jobs: {
    searchJobsStatus: Status;
    searchJobsResults: {
      jobs: JobObject[];
      meta: MetaProps;
    };
    searchHistory: string[];
  };
}

export const Search = () => {
  const dispatch = useDispatch();
  const { searchJobsStatus, searchJobsResults, searchHistory } = useSelector((state: Props) => state.jobs || {});
  const [searchParams, _] = useSearchParams();
  const searchValueFromQuery = searchParams.get('query');

  useEffect(() => {
    dispatch(getSearchResults());
  }, []);

  useEffect(() => {
    if (searchValueFromQuery) dispatch?.(getJobsResult(searchValueFromQuery));
    if (searchJobsResults?.jobs?.length) {
      dispatch(addSearchHistory(searchValueFromQuery!));
    }
    return () => {
      dispatch?.(resetAllJobSearchResults());
    };
  }, [searchValueFromQuery]);

  const renderSearchHistorySection = () => (
    <RealedViewCard title="Search history">
      <ul className="mt-25">
        {searchHistory?.map((result: string) => (
          <li>
            <Link to={`/jobs/search?query=${result}`}>
              <p>{result}</p>
            </Link>
          </li>
        ))}
      </ul>
    </RealedViewCard>
  );

  const renderHeaderSection = () => {
    if (!searchJobsStatus.loading)
      return searchJobsResults?.meta?.count ? (
        <h1>
          {`“${searchValueFromQuery || 'No'}”`} Jobs ({searchJobsResults?.meta?.count})
        </h1>
      ) : (
        <h1>No Jobs Found</h1>
      );
  };

  return (
    <div id="search-page">
      <div className="container">
        {searchJobsStatus?.loading && <Loader />}
        {renderHeaderSection()}
        <Grid expanded row>
          <Grid className="grid-spaces" column sm={12} md={8} lg={8}>
            {renderAllJobsSeaction(searchJobsResults?.jobs)}
          </Grid>
          <Grid className="spaces-view-related-card" column sm={12} md={4} lg={4}>
            {renderSearchHistorySection()}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
