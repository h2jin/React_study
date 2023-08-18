import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
import routes from './routes';
import Toast from './components/Toast';
import useToast from './hooks/toast';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';

function App() {
  const toasts = useSelector(state => state.toast.toasts);
  const {deleteToast} = useToast(); // 모든 데이터가 리덕스에 있기 때문에 값이 나오지 않음.
  
  return (
    <Router>
      <Navbar />
      <Toast 
        toasts={toasts}
        deleteToast={deleteToast}
      />
      {/* 태그를 배열로 표현할 수 있다. */}
        {/* {[
        <div>1</div>,
        <div>2</div>
        ]} */}
        <div className='container mt-3'>
         <Switch>
          {routes.map((route) => {
              return <Route 
                        key={route.path} 
                        exact 
                        path={route.path} 
                        component={route.component}>
                      </Route>})}
         </Switch>
        </div>
    </Router>
    
  );
}

export default App;
