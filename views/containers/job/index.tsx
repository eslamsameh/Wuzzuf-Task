import { getSingleJob } from 'controllers';
import { resetSingleJob } from 'models/job.reducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, Grid, Loader, RealedViewCard } from 'views/components';
import './styles.scss';

interface Props {
  job: {
    job: {
      job: JobObject;
    };
    jobStatus: Status;
  };
}
export const SingleJob = () => {
  const dispatch = useDispatch();
  const { job, jobStatus } = useSelector((state: Props) => state.job || {});
  const params = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getSingleJob(params.id!));
    return () => {
      dispatch(resetSingleJob());
    };
  }, [params.id]);

  const renderRelatedSkillsSection = (skill: SkillObject) => (
    <div className="related-job-container" key={`${skill.id}`}>
      <h2>
        <Link className="h2 bold" to={`skill/${skill.attributes?.name}`}>
          {skill?.attributes?.name}
        </Link>
      </h2>

      <div>
        {skill.attributes?.type && (
          <p>
            {skill.attributes?.type} at {skill.attributes?.name}
          </p>
        )}
      </div>

      <div className="d-flex">
        <p className="bold m-inline-end-117-with-aspact-ratio">
          Importance: <span className="normal">{skill?.attributes?.importance}</span>
        </p>
        <p className="bold m-inline-end-117-with-aspact-ratio">
          Level: <span className="normal">{skill?.attributes?.level}</span>
        </p>
      </div>
    </div>
  );

  const renderJobCard = () => (
    <Card>
      <div className="mt-50">
        <h2>Related Skils:</h2>
        {job?.job?.relationships?.skills?.map((v: SkillObject) => renderRelatedSkillsSection(v))}
      </div>
    </Card>
  );

  const renderRelatedJobsSection = () => (
    <RealedViewCard title="Related Jobs">
      <ul className="mt-25">
        {job?.job?.relationships?.jobs?.map((job: JobObject, index: number) => (
          <li key={`${job.id}-${index}`}>
            <Link to={`/job/${job.id}`}>
              <p>{job.attributes?.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </RealedViewCard>
  );

  return (
    <div id="singl-job-page" className="container position-relative">
      {jobStatus?.loading && <Loader />}
      {!jobStatus?.loading && (
        <>
          <h1>{job?.job?.attributes?.title}</h1>
          <Grid row expanded>
            <Grid column md={8} lg={8} sm={12}>
              {renderJobCard()}
            </Grid>

            <Grid column md={4} lg={4} sm={12}>
              {renderRelatedJobsSection()}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};
