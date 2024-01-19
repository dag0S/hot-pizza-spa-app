import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import './scss/app.scss';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Outlet context={[searchValue, setSearchValue]} />
      </div>
    </div>
  );
}

export default App;
