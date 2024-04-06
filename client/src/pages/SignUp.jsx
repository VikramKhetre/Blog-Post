import { Link ,useNavigate} from "react-router-dom";
import { Label, Navbar, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import Oauth from "../components/Oauth";

export default function SignUP() {
    const [formData, setFormData] = useState({});
    const [errorMsg, setErrorMsg]= useState(null);
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();
    
    function handleChange(event){
        setFormData({...formData, [event.target.id]:event.target.value.trim()});
    }
    
    const handleSubmit = async(event)=>{
        event.preventDefault();
        // if anyone subit withoud data 
        if(!formData.username||!formData.email||!formData.password){
            return setErrorMsg("please fill out all fields")
        }
        try{
            setLoading(true)
            setErrorMsg(null)
            const res = await fetch("/api/auth/signup",{
            method: 'POST',
            headers: {'Content-Type':"application/json"},
            body: JSON.stringify(formData),
        });
            const data = await res.json();
            if(data.sucess === false){
                return setErrorMsg(data.message)
            }
            setLoading(false)
            if(res.ok){
                navigate("/signin")
            }
    }catch(error){
        // if there is any error at client side
        setErrorMsg(error.message);
        setLoading(false)
    }
};


  return (
    <div className="min-h-s m-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-500">
              Blog
            </span>
            Post
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            natus aut impedit quos autem, tempora debitis eaque, at ducimus
            nulla quasi facere.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="username" id="username" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="password" id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
            {
                loading ? (
                    <>
                    <Spinner size='sm'/>
                    <span className="pl-3">Loading...</span>
                    </>
                ): "Sign Up"
            }
            </Button>
            <Oauth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMsg &&(
            <Alert className="mt-5 "color='failure'>
                {errorMsg}
            </Alert>
          )
            }   
        </div>
      </div>
    </div>
  );
}
