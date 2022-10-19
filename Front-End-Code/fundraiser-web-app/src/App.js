

import {Home} from './Home';
import { ViewFundraiserModal } from './ViewFundraiserModal';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route exact path='/test-fundraiser' element={<ViewFundraiserModal />} />
          </Routes>
  </BrowserRouter>
  );
}

export default App;
