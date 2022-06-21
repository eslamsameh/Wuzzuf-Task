import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import SearchIcon from 'static/images/Search_Icon.png';
import './styles.scss';

interface Props {
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const SearchBar: React.FC<Props> = ({ onChange, value }: Props) => {
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => onChange?.(e);

  return (
    <div id="search-bar-component">
      <div className="position-relative search-box-container">
        <input
          type="search"
          placeholder="search keyward"
          className="border border-radius-5 autocomplete"
          autoComplete="off"
          onChange={onChangeInput}
          value={value}
          autoFocus
        />
        <img src={SearchIcon} alt="search-icon" />
      </div>
    </div>
  );
};
