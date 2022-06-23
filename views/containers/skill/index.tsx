import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Grid, Loader, RealedViewCard } from 'views/components';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleSkill } from 'controllers';
import { resetSkill } from 'models';
import 'styles.scss';

interface Props {
  skill: {
    skillStatus: Status;
    skill: {
      skill: SkillObject;
      meta: MetaProps;
    };
    searchHistory: string[];
  };
}
export const Skills = () => {
  const dispatch = useDispatch();
  const { skill, skillStatus } = useSelector((state: Props) => state.skill || {});
  const params = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getSingleSkill(params.id!));
    return () => {
      dispatch(resetSkill());
    };
  }, [params.id]);

  const renderRelatedJobsSection = (job: JobObject) => (
    <div className="related-job-container" key={`${job.id}`}>
      <h2>
        <Link className="h2 bold" to={`/job/${job.id}`}>
          {job?.attributes?.title}
        </Link>
      </h2>
    </div>
  );

  const renderRelatedSkillsSection = () => (
    <RealedViewCard title="Related Skills">
      <ul className="mt-25">
        {skill?.skill?.relationships?.skills?.map((skill: SkillObject, index: number) => (
          <li key={`${skill.id}-${index}`}>
            <Link to={`/skill/${skill.id}`}>
              <p>{skill.attributes?.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </RealedViewCard>
  );

  const renderSkillCard = () => (
    <Card header={<h2>Description:</h2>}>
      <div className="mt-25">
        {skill?.skill?.attributes?.type && (
          <p>
            {skill?.skill?.attributes?.type} at {skill?.skill?.attributes?.name}
          </p>
        )}
      </div>
      <div className="mt-50">
        <h2>Related Jobs:</h2>
        {skill?.skill?.relationships?.jobs?.map((v: JobObject) => renderRelatedJobsSection(v))}
      </div>
    </Card>
  );

  return (
    <div id="singl-skill-page" className="container position-relative">
      {skillStatus?.loading && <Loader />}
      {!skillStatus?.loading && (
        <>
          <h1>{skill?.skill?.attributes?.name}</h1>
          <Grid row expanded>
            <Grid column md={8} lg={8} sm={12}>
              {renderSkillCard()}
            </Grid>

            <Grid column md={4} lg={4} sm={12}>
              {renderRelatedSkillsSection()}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};
