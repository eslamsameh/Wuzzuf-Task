import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import SearchIcon from 'static/images/Search_Icon.png';
import './styles.scss';

interface Props {
  data?: any[];
  onChange?: (value: string) => void;
}

export const SearchBar: React.FC<Props> = ({ data, onChange }: Props) => {
  const [currentFocus, setCurrentFocus] = useState<number>(-1);
  const [openSuggestList, setOpenSuggestList] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement> | string) => {
    const value = (typeof e === 'string' ? e : e.target.value) as string;
    value.length > 2 && onChange?.(value);
    const event = listRef.current?.children;
    if (event) {
      removeActiveClasses();
      setCurrentFocus(0);
      event?.[0]?.classList.add('autocomplete-active');
    }
  };

  const removeActiveClasses = () => {
    const event = listRef.current?.children || [];
    for (let index = 0; index < event.length; index++) event[index].classList.remove('autocomplete-active');
  };

  const addActiveClass = (currentIndex: number) => {
    const event = listRef.current?.children;
    if (!event) return;
    removeActiveClasses();
    if (currentIndex >= event.length) {
      setCurrentFocus(0);
      event?.[0]?.classList.add('autocomplete-active');
    }
    if (currentIndex < 0) {
      setCurrentFocus(event.length - 1);
      event?.[event.length - 1]?.classList.add('autocomplete-active');
    }
    /* add class "autocomplete-active":*/
    event?.[currentIndex]?.classList.add('autocomplete-active');
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode == 40) {
      /*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
      setCurrentFocus((_counter: number) => _counter + 1);
      /*and and make the current item more visible:*/
      addActiveClass(currentFocus + 1);
    } else if (event.keyCode == 38) {
      /*If the arrow UP key is pressed, decrease the currentFocus variable:*/
      setCurrentFocus((_counter: number) => _counter - 1);
      /*and and make the current item more visible:*/
      addActiveClass(currentFocus - 1);
    } else if (event.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      event.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        setOpenSuggestList(false);
        onChangeInput(event?.[currentFocus].children[0]?.innerHTML as string);
        setCurrentFocus(-1);
      }
    }
  };

  useEffect(() => {
    if (openSuggestList && listRef.current?.children.length) {
      const event = listRef.current?.children;
      setCurrentFocus(0);
      event?.[0]?.classList.add('autocomplete-active');
    }
  }, [openSuggestList, listRef.current?.children]);

  useMemo(() => {
    if (data && data.length) setOpenSuggestList(true);
  }, [data]);

  return (
    <div id="search-bar-component">
      <div className="position-relative search-box-container">
        <input
          type="search"
          placeholder="search keyward"
          className="border border-radius-5 autocomplete"
          autoComplete="off"
          onChange={onChangeInput}
          onKeyDown={handleKeyDown}
        />
        <img src={SearchIcon} alt="search-icon" />
        {openSuggestList && (
          <div className="autocomplete-items" ref={listRef}>
            {data?.map((_, i) => (
              <div key={i}>
                <p>Suggest item</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
