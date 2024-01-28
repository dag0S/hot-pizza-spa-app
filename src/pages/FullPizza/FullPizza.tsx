import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://65a56ba652f07a8b4a3f13b0.mockapi.io/items/' + id);
        setPizza(data);
      } catch (err) {
        alert('Ошибка при получении данных о пицце :(');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка ...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi qui officia in provident!
        Aliquam illo, tenetur hic sapiente reprehenderit libero incidunt aperiam ea molestias,
        magnam quia! Voluptates, a! Saepe, enim.
      </p>
      <h4>{pizza.price} руб</h4>
    </div>
  );
};

export default FullPizza;
