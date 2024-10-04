import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// import React from 'react';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <h1>Hello, Wedding Invitation!</h1>
//     </div>
//   );
// };

// export default App;