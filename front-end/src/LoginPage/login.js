import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react'
import Container from '@material-ui/core/Container';
import "./login.css"
import { useHistory } from "react-router-dom";

export default function Login() {
    const history = useHistory();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // Check if user is already logged in validly
        let token = localStorage.getItem('authToken');
        axios.get('http://localhost:3600/users/get/1', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                history.push("/heatmap");
            }).catch(error => {
            })

    });

    return (
        <div>
            <Container maxWidth="md">
                <p className="title">ADMIN LOGIN</p>
                <Form onSubmit={() => {

                    axios.post('http://localhost:3600/auth', {email: id, password: password})
                    .then(response =>{
                        console.log(response);
                        if(response.data.accessToken) {
                            localStorage.setItem('authToken', response.data.accessToken);
                            history.push("/heatmap");
                        }
                        else {
                            alert("Invalid credentials");
                        }
                        
                    }).catch(error =>{
                        console.log(error);
                    })
                }}>
                    
                    <Form.Field
                        control={Input}
                        label='Government Email'
                        placeholder='27 digits'
                        name='id'
                        value={id}
                        onChange={(e) => setId(e.target.value)}

                    />

                    
                    <Form.Field
                        control={Input}
                        label='Password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Form.Field control={Button}>Submit</Form.Field>
                </Form>
        </Container>
        </div>
    )
}
