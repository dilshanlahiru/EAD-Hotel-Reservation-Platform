import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import TicketBookingTable from './Components/TicketBooking/TicketBookingTable';
import TicketForm from './Components/TicketBooking/TicketForm';

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
        </Routes>
      </main>
    </div>
  );
}

export default App;
