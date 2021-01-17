import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { useDispatch } from 'react-redux';
import { getUser } from '../../store/actions/users';

// import React, { useState } from "react";
// import { Redirect } from "react-router-dom";
// import { login } from "../../services/auth";
import { FormControl, TextField, Button } from '@material-ui/core';
// import { ActionOrCancelButtons } from '../FormInputs';
import SignUpForm from './SignUpForm';
// import '../../styles/layouts.css'

const LoginForm = ({ authenticated, setAuthenticated}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const demoLogin = async (e) => {
    e.preventDefault()
    const demoEmail = "email@email.com";
    const demoPassword = "password";
    const user = await login(demoEmail, demoPassword);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(getUser(user))
      // console.log("DISPATCHING USER", user)
    } else {
      setErrors(user.errors);
    }

  }
  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(getUser(user))
      // console.log("DISPATCHING USER", user)
    } else {
      setErrors(user.errors);
    }
  };
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  const updateEmail = (e) => setEmail(e.target.value);

  const updatePassword = (e) => setPassword(e.target.value);

  if (authenticated) return <Redirect to="/" />

  return (<>
      <div className="splashPageBackground overlay">
        <SignUpForm open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <div className="loginContainer">
          <div>
            <div>
              {errors.map((error) => (
                <div className="loginHeader errorHeader">{error}</div>
              ))}
            </div>
            <h2 className="loginHeader">CardMe</h2>
            <Button variant="contained" color="primary" onClick={demoLogin}>Demo</Button>
            <form onSubmit={onLogin}>
                <TextField
                  autoFocus
                  defaultValue={email}
                  margin="dense"
                  id="email"
                  label="Email"
                  type="text"
                  fullWidth
                  onChange={updateEmail}
                  required
                />
              <TextField
                    autoFocus
                    defaultValue={password}
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={updatePassword}
                    required
                  />
                {/* <button type="submit">Login</button> */}
                <Button onClick={onLogin} color="primary">
                  Login
                </Button>
                <Button onClick={handleClickOpen} color="primary">
                  Sign up
                </Button>
            </form>

          </div>
        </div>
      </div>
  </>);
};

export default LoginForm;


//OLD FORM
// const LoginForm = ({ authenticated, setAuthenticated }) => {
//   const [errors, setErrors] = useState([]);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();

//   const onLogin = async (e) => {
//     e.preventDefault();
//     const user = await login(email, password);
//     if (!user.errors) {
//       setAuthenticated(true);
//       dispatch(getUser(user))
//       console.log("DISPATCHING USER", user)
//     } else {
//       setErrors(user.errors);
//     }
//   };

//   const updateEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const updatePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   if (authenticated) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <form onSubmit={onLogin}>
//       <div>
//         {errors.map((error) => (
//           <div>{error}</div>
//         ))}
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           name="email"
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={updateEmail}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={updatePassword}
//         />
//         <button type="submit">Login</button>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;
