import axios from 'axios'
import Navbar from '../Navbar'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const AddStudent = () => {
const [name,setName] = useState('')
const [rollNo, setRollno] = useState(null)
function handleSubmit(e){
    e.preventDefault()
    console.log(e)
    axios.post('https://iitb-task-backend.onrender.com/student/add',{
        name: name,
        rollNumber: rollNo
    }).then((res)=> {
        setName('')
        setRollno('')
        toast.success('Successfully added student',{id:2})
        console.log(res.data)
    }).catch((err)=>{
        toast.error('Error',{id:2})
        console.log('Error while adding a student: ',err)
    })
}
  return (
    <div className='container'>
    <Navbar/>

    <form onSubmit={handleSubmit} className='form-container'>
        <input type='text' value={name} placeholder='Add Student name' onChange={(e)=> setName(e.target.value)}/>
        <input type='number' value={rollNo} placeholder='Add Student Roll no.' onChange={(e)=>setRollno(e.target.value)}/>
        <button type='submit'>Add a Student</button>
    </form>
   <Toaster/>
    </div>
  )
}

export default AddStudent