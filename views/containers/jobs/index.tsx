import { Card, Grid, SearchBar } from 'views/components';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { createSearchParams, Route, Routes, useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';
import { AllJobs } from './all-jobs';
import { SearchJobs } from './search-jobs';
import loadsh from 'lodash';
import './styles.scss';

export const Jobs: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, _] = useSearchParams();
  const searchValueFromQuery = searchParams.get('query');

  const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trimStart();
    setSearchValue(query);
    if (query.length > 3) debounceHandleNavigation(query);
    if (!query.length) navigate('/jobs');
  };

  const debounceHandleNavigation = useCallback(
    loadsh.debounce((query: string) => {
      navigate({ pathname: '/jobs/search', search: createSearchParams({ query }).toString() });
    }, 1000),
    []
  );

  useEffect(() => {
    if (location.pathname === '/jobs') {
      setSearchValue('');
    }
  }, [location.pathname]);

  const renderSearchBoxSection = () => (
    <div className="search-container">
      <Grid expanded row>
        <Grid column sm={12} md={2}></Grid>
        <Grid column sm={12} md={8}>
          <SearchBar value={searchValue || searchValueFromQuery || ''} onChange={textChangeHandler} />
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div id="jobs-pages">
      {renderSearchBoxSection()}
      <Routes>
        <Route path="/" element={<AllJobs />} />
        <Route path="search" element={<SearchJobs />} />
      </Routes>
    </div>
  );
};

export const renderAllJobsSeaction = (data: JobObject[] = []) => (
  <div className="mt-10">
    <Grid expanded row>
      {data.map((job: JobObject) => (
        <Grid className="grid-spaces" column sm={12} md={6} lg={6}>
          <Card className="mb-30" key={job.id} header={<h2 className="card-header">{job.attributes.title}</h2>}>
            <p className="card-sub-header">Related Skills:</p>

            <div>
              {job.relationships.skills?.map((skill: SkillObject) => (
                <button key={skill.id} className="btn btn-light grid-spaces-skill">
                  <Link to={`/skill/${skill.id}`} className="text-decoration-none">
                    {skill.attributes?.name}
                  </Link>
                </button>
              ))}
            </div>

            <div className="card-link">
              <Link to={`/job/${job.id}`}>View Job details</Link>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);
