import { Routes, Route } from 'react-router-dom'

// pages 
import ErrorPage from '@/pages/ErrorPage'
import SignUpPage from '@/pages/SignUpPage'
import SignInPage from '@/pages/SignInPage'
import HomePage from '@/pages/HomePage'
import ExamPage from '@/pages/ExamPage'
import QuizPage from '@/pages/QuizPage'

// layouts 
import AuthLayout from '@/layouts/AuthLayout'
import SignLayout from '@/layouts/SignLayout'
import HomeLayout from '@/layouts/HomeLayout'
import SideLayout from '@/layouts/SideLayout'

function App() { 
  return (
    <>
      <Routes>
        <Route>
          <Route path="*" element={<ErrorPage/>}/>
        </Route>
        <Route element={<SignLayout/>}>
          <Route path="/" element={<SignUpPage/>}/>
          <Route path="/login" element={<SignInPage/>}/>
        </Route>
        <Route element={<AuthLayout role="student"/>}>
          <Route element={<HomeLayout/>}>
            <Route path="/home" element={<HomePage/>}/>
            <Route element={<SideLayout/>}>
              <Route path="/exams" element={<ExamPage/>}/>
            </Route>
            <Route path="/quiz" element={<QuizPage/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
