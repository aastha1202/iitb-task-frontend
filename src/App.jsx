import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Recording from './pages/Recording';
import Report from './pages/Report';
import StudentReport from './pages/StudentReport';
import AddStudent from './pages/AddStudent';


function App() {

  return (
    <>
    <Router>
    <Routes>
    <Route exact path='/' element={<Recording/>} > </Route>
    <Route exact path='/report' element={<Report/>} > </Route>
    <Route exact path='/report/:reportId' element={<StudentReport/>} > </Route>
    <Route exact path='/add/student' element={<AddStudent/>} > </Route>


    </Routes>
    </Router>
      
    </>
  )
}

export default App
