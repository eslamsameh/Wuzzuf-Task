import { Card, Grid, SearchBar } from 'views/components';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSearchParams, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { debounce } from 'utils';
import { AllJobs } from './all-jobs';
import { Search } from './search';
import { SingleJob } from './single-job';
import './styles.scss';

export const Jobs: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const searchValueFromQuery = searchParams.get('query');

  const onReciveSearchText = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      if (e.target.value.length > 3) {
        navigate({ pathname: '/jobs/search', search: createSearchParams({ query: e.target.value }).toString() });
      }
      if (!e.target.value.length) navigate('/jobs');
    }, 200),
    []
  );

  const renderSearchBoxSection = () => (
    <div className="search-container">
      <Grid expanded row>
        <Grid column sm={12} md={2}></Grid>
        <Grid column sm={12} md={8}>
          <SearchBar value={searchValue || searchValueFromQuery || ''} onChange={onReciveSearchText} />
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div id="jobs-pages">
      {renderSearchBoxSection()}
      <Routes>
        <Route path="/" element={<AllJobs />} />
        <Route path=":id" element={<SingleJob />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </div>
  );
};

export const renderAllJobsSeaction = (data: any[] = []) => (
  <Grid expanded row>
    {data.map((v: any) => (
      <Grid className="grid-spaces" column sm={12} md={6} lg={6}>
        <Card className="mb-30" key={v.id} header={<h2 className="card-header">{v.attributes.title}</h2>}>
          <p className="card-sub-header">Related Skills:</p>

          <div>
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
