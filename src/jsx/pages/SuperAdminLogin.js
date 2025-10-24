import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginbg from "../../images/pic1.png";

function SuperAdminLogin() {
  const [email, setEmail] = useState('superadmin@museum.com');
  const [password, setPassword] = useState('super123');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { email: '', password: '' };
    
    if (email === '') {
      errorObj.email = 'Email is Required';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'Password is Required';
      error = true;
    }
    
    setErrors(errorObj);
    if (error) return;

    // Super Admin credentials check
    if (email === 'superadmin@museum.com' && password === 'super123') {
      localStorage.setItem('userRole', 'superadmin');
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      setErrors({ email: 'Invalid Super Admin credentials', password: '' });
    }
  }

  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      <div className="login-aside text-center d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center mb-4 pt-5">
            <h2 className="text-white">Museum</h2>
          </div>
          <h3 className="mb-2 text-white">Super Admin Portal</h3>
          <p className="text-white">Complete Museum Management Access</p>
        </div>
        <div className="aside-image" style={{backgroundImage:"url(" + loginbg + ")"}}></div>
      </div>
      
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div id="sign-in" className="auth-form form-validation">
                  <form onSubmit={onLogin} className="form-validate">
                    <h3 className="text-center mb-4 text-black">Super Admin Login</h3>
                    
                    <div className="form-group mb-3">
                      <label className="mb-1" htmlFor="val-email"><strong>Email</strong></label>
                      <input 
                        type="email" 
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Super Admin Email"
                      />
                      {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                    </div>
                    
                    <div className="form-group mb-3">
                      <label className="mb-1"><strong>Password</strong></label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        placeholder="Super Admin Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                    </div>
                    
                    <div className="text-center form-group mb-3">
                      <button type="submit" className="btn btn-danger btn-block">
                        Super Admin Login
                      </button>
                    </div>
                  </form>
                  
                  <div className="new-account mt-3">
                    <p>Regular Admin? <Link className="text-primary" to="/admin-login">Admin Login</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminLogin;