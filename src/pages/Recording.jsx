import { useEffect, useState } from "react"
import axios from 'axios'
import Navbar from "../Navbar"
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils";
import toast, { Toaster } from 'react-hot-toast';

const Recording = () => {
    const [students, setStudentDetails] = useState([])
    const [refetchData, setRefetchData] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(()=> {
        async function getStudentDetails(){
            await axios.get('https://iitb-task-backend.onrender.com/student/').then((res)=>
            {
                setLoading(false)
                toast.success('successfully loaded data',{id:4})
                console.log(res.data)
                setStudentDetails(res.data.students)
            }).catch((err)=>
                console.log('Error fetching student: ',err)
            )    
        }

        getStudentDetails()
    },[refetchData])

     function handleUploadAudio(studentId,e){
        const audio = e.target.files[0]
        var reader = new FileReader();
            reader.onload= function(event){
            const base64audio= event.target.result
            console.log(base64audio)
            toast.loading('Uploading',{id:1})
            axios.post('https://iitb-task-backend.onrender.com/recording/add',{
                audio: base64audio,
                id: studentId
            }).then((res)=>{
                setRefetchData(prev => !prev)
                toast.success('Successfully uploaded audio',{id:1})
                console.log(res.data)
            }).catch((err)=> {
                toast.error('Error',{id:1})
                console.log('Error uploading audio: ',err)
            })
        }
        reader.readAsDataURL(audio)
    }

    function handleGenerateReport(recordingId){
        toast.loading('Generating report',{id:2})
        axios.post('https://iitb-task-backend.onrender.com/report/generate',{
           recordingId: recordingId 
        }).then((res)=> {
            setRefetchData(prev => !prev)
            toast.success('Successfully generated report',{id:2})
            console.log(res.data)
        }).catch((err)=>{
            toast.error('Error',{id:2})
            console.log('Error generating report: ',err)
        })
    }

    function handleLoading(){
        toast.loading('loading student data',{id:4})
    }

    if(loading){
        handleLoading()
    }

    

  return (
    <div className="container">
        <Navbar/>
        
        <div style={{display:'grid', gap: '10px'}}>
        <div className="student-grid"> 
          <div className="header">Student Name</div>
          <div className="header">Story Read</div>
          <div className="header">Audio File</div>
          <div className="header">Report</div>

          </div>


          {!loading && students?.map((student)=>(
          <div key={student._id} className="student-grid">
          <div className="student-name">{student.name} </div>
          <div className="detail">Dams</div>
          <div className="detail" style={{display:'flex',flexDirection:'column'}}>
          <span>{student.recording ?  student?.recording?.report ? "": 'Audio uploaded' :'No Audio Uploaded'} </span>
          <label htmlFor={`audio-upload-${student._id}`} className="underline">
          {student.recording ?  student?.recording?.report ? "Upload New": 'Upload Again' :'Upload'}
          </label>
          <input id={`audio-upload-${student._id}`} type="file" accept="audio/*" onChange={(e)=>handleUploadAudio(student._id,e)}/>
          </div>
          <div className="detail " style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
          {(student.recording===undefined || student.recording===null) && <BiError size={30} color='red'/>}
          {student.recording ? student.recording?.report ? 
          <>
          <span className="underline"><Link className='link-style' to={`/report/${student?.recording?.report?._id}`}> View Latest Report</Link></span> 
          <span className="underline"> {formatDate(student?.recording?.report?.createdAt)}</span>
          </>
          : 
          <span className="underline" onClick={()=>handleGenerateReport(student?.recording?._id)}>Generate Report</span> : "Please upload Audio First" }</div>
          </div>
          ))}
        </div>
        <Toaster/>
        </div>
  )
}

export default Recording