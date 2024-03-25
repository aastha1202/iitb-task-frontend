import { useLocation, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className="navbar">

        <div className="flex gap">
        <img src='https://absgsfesf.my.canva.site/cross-dev-task-report-card-viewer-for-teachers/images/dd3f7bb33cb3cade29f7e8785163a9f6.svg' width={50} height={50}/>
        <p className="page-header">Amazon School of Languages</p>
        </div>

        <div className={location.pathname.startsWith('/report/') ? "hidden" : 'flex flex-gap'}>
        <span className={location.pathname==='/' ? 'underline' : ''}  onClick={()=> navigate('/')}>Recordings</span>
        <span className={location.pathname==='/report' ? 'underline' : ''} onClick={()=> navigate('/report')}>Reports</span>
        </div>

       <img src='https://absgsfesf.my.canva.site/cross-dev-task-report-card-viewer-for-teachers/images/cbea8623e3422b5147c702feffc0e29c.svg' width={50} height={50} />
        </div>
  )
}

export default Navbar