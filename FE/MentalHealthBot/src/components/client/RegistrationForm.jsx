import React, { useState } from "react";
import "../../global.css"; // Import your CSS file for styling
import axios from "axios";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name:"",
    contactno:null,
    address:"",
    email:"",
    username: "",
    password: "",
    type:"Customer"
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const changeType = () => {
    if(formData.type == "Customer"){
      setFormData({
        ...formData,
        type: "Therapist",
      });
    } else {
      setFormData({
        ...formData,
        type: "Customer",
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/mentalhealth/signup/",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json", // Set the content type of the request
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your access token or any other custom headers
          },
        }
      );
      if (response.status === 200) {
          toast({
            title: `Signup Successfull`,
            description: response.data.message,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: `Signup Failed`,
            description: response.data.error,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
    } catch (e) {
      toast({
        title: `Error while signing up`,
        description: e.response.data.error,
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
      <div className={`login-container ${formData.type ==  "Customer" ? "flex-dir-row":"flex-dir-row-rev"}`}>
        {formData.type == "Customer"? 
        <div className='image-container'>
          <img
            src='https://t3.ftcdn.net/jpg/04/00/38/86/360_F_400388679_dmUTdbK8sn5SSuP34VUrnaZAIZWysGKL.jpg'
            alt='Your Image'
          />
        </div> :
        <div className='image-container'>
        <img
          src='https://tse1.mm.bing.net/th?id=OIP.9G_XjoxddkY3J2LM2Dw6hQHaE8&pid=Api&P=0&h=180'
          alt='Your Image'
        />
      </div>
        }
        <div className='col-md-5'>
          <div className='card'>
            <form className='login-form' onSubmit={handleSubmit}>
              <h1 className='Heading'>Sign Up</h1>
              <p className='para'>
              Embrace your inner strength with Mental Mate, your trusted companion on the journey to better mental health!
              </p>
              <div className='form-group'>
                <label htmlFor='name'>Name:</label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter Name'
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='contactno'>Contact No.:</label>
                <input
                  type='tel'
                  className='form-control'
                  id='contactno'
                  name='contactno'
                  value={formData.contactno}
                  onChange={handleChange}
                  placeholder='Contact No.'
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='address'>Address:</label>
                <input
                  type='text'
                  className='form-control'
                  id='address'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  placeholder='Address'
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email:</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Email'
                  style={{ borderRadius: "10px" }}
                />
              </div>
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
              </div>
              <button type='submit' className='btn btn-dark'>
                Sign Up
              </button>
              <p className='create'>
                Already have an account?{" "}
                <Link to='/' className='forget-link'>
                  Login
                </Link>
              </p>
              {formData.type == "Customer"?<p className='create'>
                Sign Up as a Therapist?{" "}
                <text  className='forget-link' onClick={changeType}>
                  Click Here
                </text>
              </p> :
              <p className='create'>
                Sign Up as a Customer?{" "}
                <text  className='forget-link' onClick={changeType}>
                  Click Here
                </text>
              </p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
