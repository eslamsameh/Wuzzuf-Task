import React, { ReactElement } from 'react';
import './styles.scss';
interface Props {
  title: string;
  children: ReactElement | ReactElement[];
}
export const RealedViewCard: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <div id="related-view-card-component">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};
