import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import './scss/app.scss';
import { createContext, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export const SearchContext = createContext('');

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Provider store={store}>
          <Header />
          <div className="content">
            <Outlet />
          </div>
        </Provider>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
