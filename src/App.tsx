import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import './scss/app.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <div className="wrapper">
      <Provider store={store}>
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </Provider>
    </div>
  );
}

export default App;
