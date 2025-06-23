import React from 'react'
import { Link ,useLocation,useNavigate} from 'react-router-dom';
const NavBar = () => {
  let date = new Date();
  const navigate = useNavigate();

  // handle logout
  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    navigate('/login')
  }
  let location = useLocation();
    return (
      <>
        <nav className="navbar navbar-dark sticky-top bg-opacity-75 navbar-expand-lg bg-dark text-center">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold ms-lg-3 me-0 " to= {localStorage.getItem('token')!== null ?"/":"/login"}><span className='text-danger '>G</span>YM <span className='text-danger'>F<span className='text-white'>AC</span>TORY </span> </Link>
          <h6 className='text-end pt-1 mb-0 fw-bold  d-lg-none text-danger'>DATE:  <span> {(date.getDate()<10?'0'+date.getDate():date.getDate())+'/'+ ((date.getMonth()+1) < 10?'0'+(date.getMonth()+1):(date.getMonth()+1))+"/"+date.getFullYear()}</span>  </h6>
          {localStorage.getItem('token')!== null ?<button className="navbar-toggler" id="toggleBtn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>:""}
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {localStorage.getItem('token')!== null ?
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <Link  to="/subscriptedClient" className={`btn text-danger mx-2 btnlogIn btn-sm fw-bold ${ location.pathname==="/subscriptedClient"?"active": ""}`}> Subscription Client</Link>
              </li>
              <li className="nav-item">
              <Link  to="/addnew" className={`btn text-danger mx-2 btnlogIn btn-sm fw-bold ${ location.pathname==="/addnew"?"active": ""}`}> Add New Client</Link>
              </li>

             {JSON.parse(localStorage.getItem('user')).superadmin===true?<li className="nav-item">
              <Link  to="/addnewUser" className={`btn text-danger mx-2 btnlogIn btn-sm fw-bold ${ location.pathname==="/addnewUser"?"active": ""}`}> Add New User</Link>
              </li>:""}

              <li className="nav-item">
              <Link  to="/createGymPlan" className={`btn text-danger mx-2 btnlogIn btn-sm fw-bold ${ location.pathname==="/createGymPlan"?"active": ""}`}> Add GYM PLAN</Link>
              </li>
              <li className="nav-item">
              <Link  to="/setting" className={`btn text-danger mx-2 btnlogIn btn-sm fw-bold ${ location.pathname==="/setting"?"active": ""}`}> SETTING</Link>
              </li>
            </ul>:""}
            {localStorage.getItem('token')!== null? <h6 className='text-end me-4 pt-2 text-danger d-lg-block d-none me-2'>DATE:  <span> {(date.getDate()<10?'0'+date.getDate():date.getDate())+'/'+ ((date.getMonth()+1) < 10?'0'+(date.getMonth()+1):(date.getMonth()+1))+"/"+date.getFullYear()}</span>  </h6>:""}
            {localStorage.getItem('token')=== null?
            ""
            :<button  onClick={handleLogout} className={`btn btn-sm text-danger  btnlogIn fw-bold  fs-6 me-lg-3 ${ location.pathname==="/logout"?"active": ""}`} >Log Out</button>}
          </div>
        </div>
      </nav>
      
      </>
        
    )
}

export default NavBar
