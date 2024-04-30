import { useState, useEffect } from "react";
import "../../global.css"; // Import your CSS file for styling
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import URL from "../../EndPoint";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    contactno: null,
    address: "",
    email: "",
    username: "",
    password: "",
    type: "Customer",
  });

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async() => {
      const  token = localStorage.getItem("token");
      if (token) {
        navigate("/dashboard")
      }
    };
    checkToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const changeType = () => {
    if (formData.type == "Customer") {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any required fields are missing
    const requiredFields = ["name", "contactno", "address", "email", "username", "password"];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    if (missingFields.length > 0) {
      toast({
        title: `Error`,
        description: `Required fields (${missingFields.join(", ")}) are missing`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    // Validate name field
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(formData.name.trim())) {
      toast({
        title: `Error`,
        description: "Name should contain only characters",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    // Validate mobile number field
    const mobileRegex = /^[0-9]+$/;
    if (formData.contactno.trim().length !== 10 || !mobileRegex.test(formData.contactno)) {
      toast({
        title: `Error`,
        description: "Mobile number should be 10 digits and contain only numbers",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    // Validate email field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast({
        title: `Error`,
        description: "Invalid email format",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    // Validate username field
    if (formData.username.includes(" ")) {
      toast({
        title: `Error`,
        description: "Username should not contain spaces",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    // If all validations pass, proceed with form submission
    try {
      const response = await axios.post(
        `${URL}mentalhealth/signup/`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
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
        navigate("/");
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
        description: e.response?.data.error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log(e);
    }
  };
  
  

  return (
    <div className='container'>
      <div
        className={`login-container ${
          formData.type == "Customer" ? "flex-dir-row" : "flex-dir-row-rev"
        }`}>
        {formData.type == "Customer" ? (
          <div className='image-container'>
            <img
              src='https://t3.ftcdn.net/jpg/04/00/38/86/360_F_400388679_dmUTdbK8sn5SSuP34VUrnaZAIZWysGKL.jpg'
              alt='Your Image'
            />
          </div>
        ) : (
          <div className='image-container'>
            <img
              src='https://tse1.mm.bing.net/th?id=OIP.9G_XjoxddkY3J2LM2Dw6hQHaE8&pid=Api&P=0&h=180'
              alt='Your Image'
            />
          </div>
        )}
        <div className='col-md-5'>
          <div className='card'>
            <form className='login-form' onSubmit={handleSubmit}>
              <h1 className='Heading'>Sign Up</h1>
              <p className='para'>
                Embrace your inner strength with Mental Mate, your trusted
                companion on the journey to better mental health!
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
              {formData.type == "Customer" ? (
                <p className='create'>
                  Sign Up as a Therapist?{" "}
                  <text className='forget-link' onClick={changeType}>
                    Click Here
                  </text>
                </p>
              ) : (
                <p className='create'>
                  Sign Up as a Customer?{" "}
                  <text className='forget-link' onClick={changeType}>
                    Click Here
                  </text>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
