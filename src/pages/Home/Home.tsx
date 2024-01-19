import { useEffect, useState } from 'react';

import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import { useOutletContext } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [searchValue, setSearchValue] = useOutletContext();

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.sort.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sort.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://65a56ba652f07a8b4a3f13b0.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </div>
  );
};

export default Home;
