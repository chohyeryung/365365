import './App.scss';
import { Suspense } from 'react';
import LandingPage from './components/views/LandingPage/LandingPage';
import Navbar from './components/views/Navbar/Navbar';
import Sidebar from './components/views/Sidebar/Sidebar';

function App() {
  return (
    <Suspense fallback = {( <div>Loading...</div> )}>
      <div style={{ position: 'absolute', top:0, left: 0, width: '100%', height: '100%', backgroundColor: '#008156' }}>
        <Navbar />
        <div style={{ display: 'flex', height: '100%' }}>
          <Sidebar />
          <LandingPage />
        </div>
      </div>
      
    </Suspense>
  );
}

export default App;
