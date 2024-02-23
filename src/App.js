import './App.css';
import { Navbar } from './components/Navbar';
import Sidebar from './components/Sidebar';
import AllRoutes from './routes/AllRoutes';
// import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  return (
    <div>
     <AllRoutes/>
     {/* <PrivateRoutes/> */}
    </div>
  );
}

export default App;
