import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import {  MdOutlinePauseCircleOutline, MdOutlinePlayCircle } from "react-icons/md";
import { useParams } from "react-router-dom"
import Navbar from "../Navbar";
import { formatDate } from "../utils";

const StudentReport = () => {
    const {reportId} = useParams();
    const [report,setReportDetails] = useState([])
    const [isPlaying, setIsPlaying]= useState(false)
    const audioRef = useRef(new Audio())
    const originalText = 'A dam is a wall built across a river. When it rains, a lot of water goes down the river and into the sea. The dam stops the water. The water then becomes a big lake behind the dam. Later this water is let out into the fields. There it helps crops like rice to grow.';

    useEffect(()=>{
        axios.get(`http://localhost:3000/student/${reportId}`).then((res)=>{
            console.log(res.data)
            setReportDetails(res.data.studentReport)
        }).catch((err)=> {
            console.log(err)
        })
    },[])

    function handleTogglePlay(audioUrl){
        var audio = audioRef.current
        if(audio.src !== audioUrl){
            audio.src= audioUrl
            audio.play()
            setIsPlaying(true)
        }
        else{
            if(isPlaying){
               audio.pause()
               setIsPlaying(false)
            }
            else{
                audio.play()
                setIsPlaying(true)
            }
        }
    }

    function generateResultText(originalText, insDetails, delDetails,subsDetails){
        let originalWords= originalText.split(' ');
        let result = []


       const insWords = (insDetails || '').split(',').map(getIndexAndWords)
       const delWords = (delDetails || '').split(',').map(getIndexAndWords)
       const subsWords =  (subsDetails|| '').split(',').map(getIndexAndWords)
        
       originalWords.forEach((word,index)=> {
        let isModified = false


        isModified = modifyWords(insWords,index,'underline',"black",word,result,'insertion') || isModified
        isModified = modifyWords(delWords,index,'line-through',"null",word,result, 'deletion') || isModified
        isModified = modifyWords(subsWords,index, null,'yellow', word,result,'substitution') || isModified

         if(!isModified){
            result.push(<span style={{color:'green'}}>{word}</span>)
         }

         result.push(' ')

       })

        return result
    }


    function getIndexAndWords(item){
        const [indexStr, words]= item.split('-')
        const index = parseInt(indexStr)-1
        return {index,words}
    }

    function modifyWords(modification, index, textDecoration,color,word,result,modificationType){
        for (let i=0; i< modification.length; i++){
            if(modification[i].index === index){
                const [refText, modifiedText] = modification[i].words.split(':')
                result.push(<>
                    <span key={`${index}-${modificationType}`} style={{textDecoration: textDecoration,color: color}}>{modifiedText}</span>
                    {' '}
                    <span key={`${index}-${modificationType}-originalWord`} style={{color:modificationType =='insertion' ? 'green' : modificationType==='substitution' ? 'yellow': ''}}>
                    {modificationType === 'substitution' && `(${refText})`}
                    {modificationType === 'insertion' && refText}
                    </span>
                    </>
                )
                return true
            }
        }
        return false
    }

    

  return (
    <div className="recordings">
        <Navbar/>
        <div className="flex report-detail">
        <div className="flex">
        <span className="label">Student Name:</span>
        <span>{report?.student?.name}</span>
        </div>
        <div className="flex">
        <span className="label">Story Name:</span>
        <span>Dams</span>
        </div>
        <div className="flex">
        <span className="label">Report Time:</span>
        <span>{formatDate(report?.report?.createdAt)}</span>
        </div>
        </div>


        <div style={{fontFamily:'monospace', fontSize: '1.4em', padding: '1em 0em'}}>
        {report.report?._id!==undefined && generateResultText(originalText, report?.report?.insDetail,report?.report?.delDetail, report?.report?.subDetail).map((element, index) => (
        <React.Fragment key={index}>{element}</React.Fragment>
    ))}
        </div>

        <div className="flex" style={{padding: '1em 0em'}}>
        {isPlaying ? 
             <MdOutlinePauseCircleOutline size={30} onClick={()=> handleTogglePlay(report?.url)}/>
             :
             <MdOutlinePlayCircle size={30} onClick={()=> handleTogglePlay(report?.url)} /> 
        }
        <span className="label">Play Audio</span>
        </div>

        <table>
        <thead>
            <tr>
                <th>WCPM</th>
                <th>Speech Rate</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{report?.report?.wcpm}</td>
                <td>{report?.report?.speechRate}</td>
            </tr>
        </tbody>
        </table>


    </div>
  )
}

export default StudentReport