import React, { useState } from 'react';
import './LoginForm.css'; // Import your CSS file for styling

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here.
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="image-container">
          <img
            src="https://t3.ftcdn.net/jpg/04/00/38/86/360_F_400388679_dmUTdbK8sn5SSuP34VUrnaZAIZWysGKL.jpg"
            alt="Your Image"
          />
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
