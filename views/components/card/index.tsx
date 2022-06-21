import React, { ReactElement } from 'react';
import './styles.scss';

type Props = {
  children: ReactElement | ReactElement[];
  header?: ReactElement | string;
  footer?: ReactElement | string;
  className?: string;
};

type CardHeaderProps = {
  children: ReactElement | string;
};

type CardFooterProps = {
  children: ReactElement | string;
};

export const Card: React.FC<Props> = ({ className, header, footer, children }: Props) => {
  return (
    <div id="card-componenet" className={`${className}`}>
      <div>
        {header && <CardHeader>{header}</CardHeader>}
        <div>{children}</div>
        {footer && <CardFooter>{footer}</CardFooter>}
      </div>
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ children }: CardHeaderProps) => {
  let childrenComponent = children;
  if (typeof children === 'string') {
    childrenComponent = <h2>{children}</h2>;
  }
  return <div>{childrenComponent}</div>;
};

const CardFooter: React.FC<CardFooterProps> = ({ children }: CardFooterProps) => {
  let childrenComponent = children;
  if (typeof children === 'string') {
    childrenComponent = <p className="Box-title pr-3">{children}</p>;
  }
  return <div>{childrenComponent}</div>;
};
