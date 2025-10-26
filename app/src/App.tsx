import ErrorPage from '@/pages/ErrorPage'

import { Routes, Route } from 'react-router-dom'

import AuthLayout from '@/layouts/AuthLayout'

function App() { 
  return (
    <>
      <Routes>
        <Route element = { <AuthLayout role="visitor"/> }>
        </Route>
        <Route element = { <AuthLayout role="student"/> }>
        </Route>
      </Routes>
    </>
  );
}

export default App;
