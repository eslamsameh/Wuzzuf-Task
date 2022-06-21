import React from 'react';
import './styles.scss';
interface Props {
  className?: string;
}
export const Loader = ({ className }: Props) => {
  return <div className={`loader ${className}`}></div>;
};
