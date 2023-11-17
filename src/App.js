import React, { Suspense } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { ExcelTestRouter } from './config/router/router';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator'

function App() {


  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div className="App">
        <RouterProvider router={ExcelTestRouter()} />
      </div>
    </Suspense>
  );
}

export default App;
