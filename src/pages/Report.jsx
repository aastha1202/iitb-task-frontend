import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {  MdOutlinePlayCircle } from 'react-icons/md'
import { MdOutlinePauseCircleOutline } from "react-icons/md";
import Navbar from "../Navbar";
import { convertMillisecondToSecond, formatDate, handleTogglePlay } from "../utils";


const Report = () => {

    const [students, setStudentDetails] = useState([])
    const [currentAudio,setCurrentAudio] = useState(null)
    const [isPlaying, setIsPlaying]= useState(false)
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const audioRef = useRef(new Audio(currentAudio))
    useEffect(()=> {
        console.log(students)
        async function getStudentDetails(){
            await axios.get('http://localhost:3000/student/report').then((res)=>
            {
                console.log(res.data)
                setStudentDetails(res.data.studentReport)
            }).catch((err)=>
                console.log('Error fetching report',err)
            )    
        }

        getStudentDetails()
    },[])

    function handleChange(e){
        // console.log(e.target.value)
        // console.log(fromDate,toDate)
        const filterName = e?.target?.value
        let query= ''
        if(filterName){
            if(fromDate && toDate){
                query= `name=${filterName}&fromDate=${fromDate}&toDate=${toDate}`
            }
            else {
                query= `name=${filterName}`
            }
        }
        else if(fromDate && toDate){
            query=`fromDate=${fromDate}&toDate=${toDate}`
        }
        axios.get(`http://localhost:3000/student/query?${query}`).then((res)=>{
            console.log(res.data)
            setStudentDetails(res.data.students)
        }).catch((err)=>
        console.log('Error fetching filtered report',err)
    )  
    }




  return (
    <div className="recordings">
    <Navbar/>
   
    <div className="flex filter-wrapper">
    <span>Filter Report Generated:</span>
    <div className="date-wrapper flex">
    <input id="from-date" type = 'date' onChange={(e)=> {
        setFromDate(e.target.value)
        }}/>
    <label htmlFor="from-date" className="filter-input">{fromDate ? fromDate : 'From'} </label>
    </div>
    <div className="date-wrapper flex">
    <input type="date" onChange={(e)=>{ 
        setToDate(e.target.value)
        handleChange()
        }}/>
    <label className="filter-input">{toDate ? toDate : 'To'}</label>
    </div>

    <span>Filter Student Name :</span>
    <input type="text" className='filter-input' defaultValue={'All'} onChange={handleChange}/>
    </div>

    <div style={{display: 'grid', gridGap: '10px'}}>
    <div className="student-report-grid"> 
          <div className="header">Student Name</div>
          <div className="header">Story Read</div>
          <div className="header">Audio File</div>
          <div className="header">API call time</div>
          <div className="header">API response time</div>
          <div className="header">Report</div>

        </div>
          {students?.map((student)=>(
          <div key={student._id}  className="student-report-grid" >
          <div className="student-name">{student?.audio?.student?.name}</div>
          <div className="detail">Dams</div>
          <div className="detail">
          { currentAudio === student?.audio?.url && isPlaying ? 
             <MdOutlinePauseCircleOutline size={30} onClick={()=> handleTogglePlay(student?.audio?.url,currentAudio,setCurrentAudio,audioRef, setIsPlaying,isPlaying)}/>
             :
             <MdOutlinePlayCircle size={30} onClick={()=> handleTogglePlay(student?.audio?.url,currentAudio,setCurrentAudio,audioRef, setIsPlaying,isPlaying)} /> 
          }
         
          </div>
          <div className="detail">{formatDate(student?.audio?.createdAt)}</div>
          <div className="detail">{convertMillisecondToSecond(student?.audio?.responseTime)}s</div>
          <div className="detail underline">
          <Link className='link-style' to={`/report/${student?._id}`}>View Report
          <div>{formatDate(student?.createdAt)}</div>
          </Link>
          </div>
          </div>
          ))}
        </div>
        </div>
  )
}

export default Report