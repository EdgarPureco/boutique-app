
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Login from './Pages/Login'
import Compte from './Pages/Compte'
import Home from './Pages/Home';
import Cart from './Pages/Cart'
import Profil from './Pages/Profil';


function App() {
  return(
    <Router>
    <Routes>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/register' element={<Compte/>}/>
          <Route exact path='/profil' element={<Profil/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
  </Router>
  );
  
}

export default App;
