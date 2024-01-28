import { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';

import { fetchPizzas } from '../../redux/slices/pizzaSlice';
import { setCategoryId, setCurrentPage, setFilters } from '../../redux/slices/filterSlice';
import Categories from '../../components/Categories/Categories';
import Sort, { listMenu } from '../../components/Sort/Sort';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Pagination from '../../components/Pagination/Pagination';
import { SearchContext } from '../../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);
  const sortType = sort.sort;
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useContext(SearchContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const handlerChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    );
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // Если был первый рендер, то проверяем URL параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = listMenu.find((obj) => obj.sort === params.sort);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((pizza) => (
    <Link to={`/pizza/${pizza.id}`}>
      <PizzaBlock key={pizza.id} {...pizza} />
    </Link>
  ));
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить пиццы. Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={handlerChangePage} />
    </div>
  );
};

export default Home;
