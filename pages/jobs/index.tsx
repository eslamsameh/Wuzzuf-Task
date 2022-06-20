import { Card, Grid, SearchBar } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';
import 'styles.scss';

export const Jobs = () => {
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
      {[1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, , 1, 1, 1, 1, , 1].map((v, i) => (
        <Grid className="grid-spaces" column sm={12} md={6} lg={6}>
          <Card className="mb-30" key={i} header={<h2 className="card-header">4th Grade Math Teacher</h2>}>
            <p className="card-sub-header">Related Skills:</p>
            <Grid row>
              {[1, 1, 1, 1, 1, 1].map((_, i) => (
                <Grid key={i} column md={6} sm={12} lg={4} className="mb-10 grid-spaces-skill">
                  <button className="btn btn-light">operation monitoring</button>
                </Grid>
              ))}
            </Grid>
            <div className="card-link">
              <Link to="/jobs/1">View Job details</Link>
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
        <h1>All Jobs (255)</h1>
        {renderAllJobsSeaction()}
      </div>
    </div>
  );
};
