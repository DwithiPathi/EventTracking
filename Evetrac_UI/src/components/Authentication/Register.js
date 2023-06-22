import React,{useState} from "react";
import LoginImg from '../Images/WhiteLogoWithRegister.PNG';
import UserService from '../../services/UserService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { useNavigate } from "react-router-dom";
const Register=()=>{   
    // const navigate = useNavigate();   
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const [errorMessage, setErrorMessage] = useState('');
    const [isValidPassword,setIsValidPassword]=useState();
    const [isSamePassword,setIsSamePassword]=useState();    
    const [confirmPassword,setConfirmPassword]=useState();
    const [userRole, setuserRole] = useState('');
    const [firstName, setUserfirstname] = useState("");
    const [lastName, setUserlastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setlocation] = useState("");
    const [organizationName, setorganizationName] = useState(null);
    const [organizationDescription, setorganizationDescription] = useState(null);
    // const [userRegistrationData,setuserRegistrationData]=useState({
    //     firstName:'',
    //     lastName:'',
    //     password:'',
    //     address:'',
    //     email:'',
    //     userRole:'',
    //     organizationName:null,
    //     organizationDescription:null      
    // })
    const onClickRegister=(e)=>{
        e.preventDefault();
        if(validateRadioCheck() && passwordVerification() && passwordEqualizer()){    
                                             
                const det={
                    firstName,
                    lastName,
                    password,
                    address,
                    email,
                    userRole,
                    organizationName,
                    organizationDescription                    
                  };
                UserService.createUser(det).then((response)=>{                   
                    if(response.status===201){                       
                        toast.success(response.data, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose:3000
                        });                       
                    }
                    else if (response.status===200){
                        toast.error(response.data, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose:3000
                        });
                    }
                    else{
                        toast.error("Registration Failed", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose:3000
                        });
                    }                   
                });             

                return true;                
        }
        else{
            toast.error("Please meet all required criteria to register succesfully.", {
                position: toast.POSITION.TOP_RIGHT
            });
            return false;
        }

    }    
    const passwordVerification = () => {
       // console.log(value)
        if (!(PWD_REGEX.test(password))) {            
            setIsValidPassword(false);
            return false;
        }
        else{
            setIsValidPassword(true);
            return true;
        }
      };    
    const passwordEqualizer=()=>{
        if(password!==confirmPassword){           
            setIsSamePassword(false);
            return false;
        }
        else{
            setIsSamePassword(true);
            return true;
        }
    }   
    const validateRadioCheck = () => {
        console.log(firstName,userRole);
        if (userRole === '') {
          setErrorMessage('Please select an option');
          return false;
        }
        setErrorMessage('');
        return true;
      };
    const onChangeConfirmPassword=(e)=>setConfirmPassword(e.target.value);
    const onChangeFirstName=(e)=>{
        if(validateRadioCheck()){
            setUserfirstname(e.target.value)
        }
    };
    const onChangeLastName=(e)=>setUserlastname(e.target.value);
    const onChangePassword=(e)=>setPassword(e.target.value);
    const onChangeAddress=(e)=>setlocation(e.target.value);
    const onChangeEmail=(e)=>setEmail(e.target.value);
    const onChangeuserRole=(e)=>{setuserRole(e.target.value)
        if(e.target.value==="USER"){           
            setorganizationName('');
            setorganizationDescription('');        
        } 
        };
    const onChangeOrganizationName=(e)=>setorganizationName(e.target.value);
    const onChangeOrganizationDescription=(e)=>setorganizationDescription(e.target.value);
 return (
    <div className="container m-5  mt-2">
        <div className="card">
        <ToastContainer />
        <form style={{marginTop:"5px" , marginRight:"60px", marginLeft:"70px"}} onSubmit={onClickRegister}>
            <div className="form-outline">
                   <img  className="d-flex align-items-center justify-content-center mt-1 mb-5" src={LoginImg} alt="LogoImg" style={{width:"30%",marginLeft:"337px"}}/>
                    <div className="radio mb-4" required value={userRole} onChange={onChangeuserRole}>
                         <input type="radio" value="USER" name="login" /> Register as user &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         <input type="radio" value="ORGANIZER" name="login" /> Register as organizer  
                         {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}      
                    </div> 
            </div>
            <div className="row">
                <div className="col-md-6 mb-5"> <input type="text" className="form-control" placeholder="Firstname" required value={firstName}  onChange={onChangeFirstName}/></div>
                <div className="col-md-6 mb-5"> <input type="text" className="form-control" placeholder="LastName" required value={lastName} onChange={onChangeLastName}/></div>
                <div className="col-md-6 mb-5"> <input type="text" className="form-control" placeholder="Location" required value={address} onChange={onChangeAddress}/></div>
                <div className="col-md-6 mb-5"> <input type="email" className="form-control" placeholder="Email" required value={email} onChange={onChangeEmail} /></div>
                <div className="col-md-6 mb-5">
                <div className="row">                
                <div className="col-md-11"> <input type="password" className="form-control" placeholder="Password" required value={password} onChange={onChangePassword}  onBlur={passwordVerification}/></div>
                {isValidPassword!=null &&
                    <div className="col-md-1 mt-1 p-0">
                    {isValidPassword ? <span className="text-primary material-symbols-outlined" title="Valid password">check_circle</span>               
                     : <span className="material-symbols-outlined text-danger" title="Password Should be 8 characters long,one capital case, one small letter,one number and one special character(!@#$%)">cancel</span> }                                        
                    </div> 
                }        
                </div>            
                </div>
                <div className="col-md-6">                
                 <div className="row">
                 <div className="col-md-11"> <input type="password" className="form-control" placeholder="Confirm Password" required value={confirmPassword} onChange={onChangeConfirmPassword} onBlur={passwordEqualizer}/></div>                   
                 {isSamePassword!=null &&
                 <div className="col-md-1 mt-1 p-0">
                    {isSamePassword ? <span className="text-primary material-symbols-outlined" title="Passwords matched">check_circle</span>
                    :<span className="material-symbols-outlined text-danger" title="Passwords didn't matched">cancel</span>}                                                
                 </div> }
                 </div>                                
                </div>
                {userRole==="ORGANIZER" && <div className="row">
                <div className="col-md-6 mb-5"> <input type="text" className="form-control" placeholder="Organization Name" required value={organizationName} onChange={onChangeOrganizationName}/></div> 
                <div className="col-md-6 mb-5"> <textarea className="form-control"    placeholder="Organization Description" required value={organizationDescription} onChange={onChangeOrganizationDescription} rows={4} cols={50}
      />
                {/* <input type="text" className="form-control" placeholder="Organization Description" required value={organizationDescription} onChange={onChangeOrganizationDescription}/> */}
                </div> 
                </div> }                                           
            </div>
                <button type="submit" className="btn btn-primary btn-block mb-3" style={{marginLeft:"450px"}}>Register</button>               
                <div className="form-outline mb-4">
                   {/* <span> <a href="/forgot-password">Forgot Password?</a>&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;</span>  */}
                   <span>&nbsp;Already a Member?<a href='/'>Login</a></span> 
                </div>
            </form>
        </div>         
    </div>
    
 )
}

export default Register