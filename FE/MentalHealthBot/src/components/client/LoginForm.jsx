/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "../../global.css"; // Import your CSS file for styling
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import URL from "../../EndPoint";
import useAuth from "../../../utils/useAuth";

function LoginForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/dashboard";

  const { authLogin } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}mentalhealth/login/`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json", // Set the content type of the request
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your access token or any other custom headers
          },
        }
      );
      // console.log(response);
      if (response.status == 200) {
        if (response.data.login_status == 1) {
          // toast({
          //   title: `Login`,
          //   description: response.data.message,
          //   status: "success",
          //   duration: 2000,
          //   isClosable: true,
          //   position: "top",
          // });
          localStorage.setItem("token", JSON.stringify(response.data));
          authLogin(response.data);
          navigate(from, {replace: true});
        } else {
          toast({
            title: `Login`,
            description: response.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
      }
    } catch (e) {
      toast({
        title: `Login`,
        description: e.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log(e);
    }
    // console.log("Form data submitted:", formData);
  };

  return (
    <div className='container'>
      <div className='login-container'>
        <div className='image-container'>
          <img
            src='https://t3.ftcdn.net/jpg/04/00/38/86/360_F_400388679_dmUTdbK8sn5SSuP34VUrnaZAIZWysGKL.jpg'
            alt='Your Image'
          />
        </div>
        <div className='col-md-5'>
          <div className='card'>
            <form className='login-form' onSubmit={handleSubmit}>
              <h1 className='Heading'>Log in to your account</h1>
              <p className='para'>
                Unlock the door to a brighter, healthier future. Log in to
                embark on your therapy journey and take the first step toward
                well-being and happiness.
              </p>
              <div className='form-group'>
                <label htmlFor='username'>Username:</label>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  placeholder='Enter Username'
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password:</label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter Password'
                  style={{ borderRadius: "10px" }}
                />
                <p className='forget'>
                  <Link to='/' className='forget-link'>
                    Forget Password?
                  </Link>
                </p>
              </div>
              <button type='submit' className='btn btn-dark'>
                Login
              </button>
              <p className='create'>
                Don't have an account?{" "}
                <Link to='/register' className='forget-link'>
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
