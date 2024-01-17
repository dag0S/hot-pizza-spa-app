import { useState } from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const handlerOnClickCategory = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            className={activeIndex === index ? 'active' : ''}
            onClick={handlerOnClickCategory.bind(null, index)}
            key={index}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
