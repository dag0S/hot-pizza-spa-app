import { useEffect, useRef, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSort } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

type SortItem = {
  name: string;
  sort: string;
};

type PopupClick = MouseEvent & {
  composedPath: () => Node[];
};

export const listMenu: SortItem[] = [
  { name: 'популярности ↑', sort: 'rating' },
  { name: 'популярности ↓', sort: '-rating' },
  { name: 'цене ↑', sort: 'price' },
  { name: 'цене ↓', sort: '-price' },
  { name: 'алфавиту ↑', sort: 'title' },
  { name: 'алфавиту ↓', sort: '-title' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.filter.sort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [isVisiblePopup, setIsVisiblePopup] = useState<boolean>(false);

  const handlerCloseAndSelect = (obj: SortItem) => {
    setIsVisiblePopup((prev) => !prev);
    dispatch(setSort(obj));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setIsVisiblePopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisiblePopup((prev) => !prev)}>{sort.name}</span>
      </div>
      {isVisiblePopup && (
        <div className="sort__popup">
          <ul>
            {listMenu.map((obj, index) => (
              <li
                className={obj.sort === sort.sort ? 'active' : ''}
                onClick={() => handlerCloseAndSelect(obj)}
                key={index}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
