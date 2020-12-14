import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { getUser } from '../../store/actions/users';
import { useDispatch } from 'react-redux';

// import React, { useState } from "react";
// import { Redirect } from 'react-router-dom';
// import { signUp } from '../../services/auth';
import { FormControl, TextField } from '@material-ui/core';
import { ActionAndCancelButtons } from '../FormInputs';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
// import '../../styles/layouts.css'


const SignUpForm = ({open, setOpen, authenticated, setAuthenticated, handleClickOpen, handleClose}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  // const [open, setOpen] = React.useState(true);
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();
  // const handleClickOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(
        username,
        email,
        password,
        );
      if (!user.errors) {
        dispatch(getUser(user))
        setAuthenticated(true)
        setOpen(false)
      }else {
      setErrors(user.errors)
    }
  };
}
const renderErrors = (errors) => {
  if (errors) {
    // console.log("trying to render user setting errors")
    return errors.map(error => {
      // console.log(error)
      return <div className='material-error errorHeader'>{error}</div>
    })
  }
}

  const updateUsername = (e) => setUsername(e.target.value)
  const updateEmail = (e) =>  setEmail(e.target.value)
  const updatePassword = (e) => setPassword(e.target.value)
  const updateRepeatPassword = (e) => setRepeatPassword(e.target.value)

  if (authenticated) return <Redirect to="/" />

  return (<>
    {/* <button onClick={handleClickOpen}>Sign Up</button> */}
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Make an account</DialogTitle>
      <div>
          {renderErrors(errors)}
      </div>
      <DialogContent className='signUpForm'>

          <TextField
            autoFocus
            defaultValue={username}
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            onChange={updateUsername}
            required
          />
          <TextField
            autoFocus
            defaultValue={email}
            margin="dense"
            id="email"
            label="Email"
            type="email"
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
          <TextField
            autoFocus
            defaultValue={repeatPassword}
            margin="dense"
            id="repeat_password"
            label="Confirm password"
            type="password"
            fullWidth
            onChange={updateRepeatPassword}
            required
          />
          <ActionAndCancelButtons handleClose={handleClose} onAction={onSignUp} actionName={"Sign up"}/>
      </DialogContent>
    </Dialog>
  </>);
};

export default SignUpForm




//OLD FORM
// const SignUpForm = ({authenticated, setAuthenticated}) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [repeatPassword, setRepeatPassword] = useState("");

//   const dispatch = useDispatch();

//   const onSignUp = async (e) => {
//     e.preventDefault();
//     if (password === repeatPassword) {
//       const user = await signUp(username, email, password);
//       if (!user.errors) {
//         setAuthenticated(true);
//         dispatch(getUser(user));
//       }
//     }
//   };

//   const updateUsername = (e) => {
//     setUsername(e.target.value);
//   };

//   const updateEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const updatePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const updateRepeatPassword = (e) => {
//     setRepeatPassword(e.target.value);
//   };

//   if (authenticated) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <form onSubmit={onSignUp}>
//       <div>
//         <label>User Name</label>
//         <input
//           type="text"
//           name="username"
//           onChange={updateUsername}
//           value={username}
//         ></input>
//       </div>
//       <div>
//         <label>Email</label>
//         <input
//           type="text"
//           name="email"
//           onChange={updateEmail}
//           value={email}
//         ></input>
//       </div>
//       <div>
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           onChange={updatePassword}
//           value={password}
//         ></input>
//       </div>
//       <div>
//         <label>Repeat Password</label>
//         <input
//           type="password"
//           name="repeat_password"
//           onChange={updateRepeatPassword}
//           value={repeatPassword}
//           required={true}
//         ></input>
//       </div>
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignUpForm;
