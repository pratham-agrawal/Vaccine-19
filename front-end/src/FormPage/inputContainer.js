import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

function InputContainer(props) {
    return (
      <div className="box">
        <p className="boxTitle">{props.title}</p>
        <p>{props.description}</p>

        <TextField
                id="outlined-password-input"
                label={props.inputDescription}
                type="password"
                autoComplete="current-password"
                variant="outlined"
        />
      </div>
    );
  }
  
  export default InputContainer;