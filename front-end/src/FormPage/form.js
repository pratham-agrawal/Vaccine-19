import React, { Component } from 'react'
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
import "./form.css"
import { usePosition } from 'use-position';



class PersonalForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            dob: "",
            occupation: "",
            email: "",
            password: "",
            latitude:  "",
            longitude: "",
            permission: "1",
            vaccinated: "false",
            age: ""
        }
      }


    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () =>{
        this.state.latitude = this.props.latitude;
        this.state.longitude = this.props.longitude;
        this.state.vaccinated = false;
        var d = new Date();
        var now = d.getTime();
        console.log(now);
        var dobTime = Date.parse(this.state.dob);
        console.log(dobTime);
        console.log(this.state)
        this.state.age = Math.floor((now - dobTime) / 31536000 / 1000);

        const { age, occupation, gender, dob, latitude, longitude, firstName, lastName, password, email, permission, vaccinated } = this.state
        axios.post('http://localhost:3600/users/register', this.state)
            .then(response =>{
                console.log(this.state)
                console.log(response)
            }).catch(error =>{
                console.log(error)
            })
        
            alert("submitted")
    }
    render() {
        const { age, occupation, gender, dob, latitude, longitude, firstName, lastName, password, email, permission } = this.state
        return (
            <Container maxWidth="md">
                <p className="title">Personal Information Form</p>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        label='First name'
                        placeholder='First name'
                        name='firstName'
                        value={firstName}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Input}
                        label='Last name'
                        placeholder='Last name'
                        name='lastName'
                        value={lastName}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Select}
                        name='gender'
                        value={firstName}
                        label='Gender'
                        placeholder='Gender'
                        options={[
                            {key: "male", text: "Male", value:"male"},
                            {key: "female", text: "Female", value:"female"},
                            {key: "other", text: "Other", value:"Other"}
                            
                        ]}
                        name='gender'
                        value={gender}
                        onChange={this.handleChange}
                    />
                    </Form.Group>

                    <Form.Field
                        control={Input}
                        label='Date of Birth'
                        placeholder='dd/mm/yyyy'
                        name='dob'
                        value={dob}
                        onChange={this.handleChange}
                    />

                    
                    <Form.Field
                        control={Input}
                        label='Occupation'
                        placeholder='Ex. Nurse'
                        name='occupation'
                        value={occupation}
                        onChange={this.handleChange}
                    />

                    <Form.Field>
                        <Radio
                        label='I am an essential worker'
                        name='radioGroup'

                        />
                    </Form.Field>

                    <Form.Field
                        control={Input}
                        label='Email'
                        placeholder='Ex. name@gmail.com'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                    />

                    <Form.Field
                        control={Input}
                        label='Password'
                        placeholder='8+ characters'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                    />
                    
                    <Form.Field
                        control={TextArea}
                        label='Additional Information'
                        placeholder='If there is anything that you would like to let us know, enter it here.'

                    />

                    <Form.Field
                    control={Checkbox}
                    label='I agree to the Terms and Conditions'
                    
                    />
                    <Form.Field control={Button} onClick={this.submit}>Submit</Form.Field>
                </Form>
        </Container>
        )
    }
}

export default PersonalForm
