import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import TicketBookingTable from './Components/TicketBooking/TicketBookingTable';
import TicketForm from './Components/TicketBooking/TicketForm';
import TrainTable from './Components/TrainManagement/TrainTable';
import TrainForm from './Components/TrainManagement/TrainForm';
import TraverlerTable from './Components/TraverlerManage/TraverlerTable';
import TraverlerForm from './Components/TraverlerManage/TraverlerForm';
import UserReg from './Components/UserManagement/UserReg';
import UserTable from './Components/UserManagement/UserTable';

function App() {
  return (
    <div className="App">
      <header>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/ticketBookingTable' element={<TicketBookingTable/>}/>
          <Route path='/ticketForm' element={<TicketForm/>}/>

          <Route path='/trainBookingTable' element={<TrainTable/>}/>
          <Route path='/trainForm' element={<TrainForm/>}/>

          <Route path='/travellearTable' element={<TraverlerTable/>}/>
          <Route path='/travelerForm' element={<TraverlerForm/>}/>
          
          <Route path='/userReg' element={<UserReg/>}/>
          <Route path='/userTable' element={<UserTable/>}/>
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
