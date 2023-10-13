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
import ScheduleTable from './Components/TrainManagement/ScheduleTable';
import ScheduleForm from './Components/TrainManagement/ScheduleForm';
import LoginForm from './Components/LoginForm';
import NavBar from './Components/NavBar';
import TravelAgentHome from './Components/TravelAgentHome';
import ViewBookingDetails from './Components/TicketBooking/ViewBookingDetails';

function App() {
  return (
    <div className="App">
      <header>
        <NavBar></NavBar>
      </header>
      <main>
        <Routes>
          <Route path='/backOfficeHome' element={<Home/>}/>
          <Route path='/' element={<LoginForm/>}/>
          <Route path='/travelAgenteHome' element={<TravelAgentHome/>}/>

          <Route path='/ticketBookingTable' element={<TicketBookingTable/>}/>
          <Route path='/bookingDetails/:resId' element={<ViewBookingDetails/>}/>
          <Route path='/ticketForm' element={<TicketForm/>}/>
          <Route path='/ticketForm/:resId' element={<TicketForm/>}/>

          <Route path='/trainTable' element={<TrainTable/>}/>
          <Route path='/trainForm' element={<TrainForm/>}/>
          <Route path='/trainForm/:trainId' element={<TrainForm/>}/>
          <Route path='/scheduleTable/:trainId' element={<ScheduleTable/>}/>             {/* view */}
          <Route path='/scheduleForm/:trainId' element={<ScheduleForm/>}/>               {/* create */}
          <Route path='/scheduleForm/:trainId/:scheduleId' element={<ScheduleForm/>}/>   {/* update */}


          <Route path='/travellearTable' element={<TraverlerTable/>}/>
          <Route path='/travelerForm' element={<TraverlerForm/>}/>
          <Route path='/travelerForm/:userId' element={<TraverlerForm/>}/>
          
          <Route path='/userReg' element={<UserReg/>}/>
          <Route path='/userReg/:userId' element={<UserReg/>}/>
          <Route path='/userTable' element={<UserTable/>}/>
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
