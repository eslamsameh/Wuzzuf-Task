import { Card, Grid, SearchBar, Loader } from 'components';
import { getAllJobs } from 'controllers';
import { resetAllJobs } from 'models';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'styles.scss';

export const Jobs = () => {
  const [query, setQuery] = useState<{ limit: number; page: number }>({ limit: 12, page: 0 });

  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.jobs || {});

  const handleLoadMore = async () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight && data.jobs?.meta?.next) {
      await dispatch?.(getAllJobs({ ...query, page: query.page + 1 }));
      setQuery({ ...query, page: query.page + 1 });
    }
  };

  useEffect(() => {
    dispatch?.(getAllJobs({ ...query }));
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

  const renderSearchBoxSection = () => (
    <div className="search-container">
      <Grid expanded row>
        <Grid column sm={12} md={2}></Grid>
        <Grid column sm={12} md={8}>
          <SearchBar />
        </Grid>
      </Grid>
    </div>
  );

  const renderAllJobsSeaction = () => (
    <Grid expanded row>
      {data?.jobs?.jobs?.map((v: any) => (
        <Grid className="grid-spaces" column sm={12} md={6} lg={6}>
          <Card className="mb-30" key={v.id} header={<h2 className="card-header">{v.attributes.title}</h2>}>
            <p className="card-sub-header">Related Skills:</p>

            <div className="">
              {v.relationships.skills?.map((s: any) => (
                <button key={s.id} className="btn btn-light grid-spaces-skill">
                  <Link to={`/skill/${s.id}`} className="text-decoration-none">
                    {s.attributes?.name}
                  </Link>
                </button>
              ))}
            </div>

            <div className="card-link">
              <Link to={`/jobs/${v.id}`}>View Job details</Link>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div id="jobs-page">
      {renderSearchBoxSection()}
      <div className="container">
        {data?.jobStatus?.loading && <Loader />}
        <>
          <h1>All Jobs ({data.jobs?.meta?.count * query.limit || ''})</h1>
          {renderAllJobsSeaction()}
        </>
      </div>
    </div>
  );
};
