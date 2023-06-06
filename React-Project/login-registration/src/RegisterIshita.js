import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
const Register = () => {

    const history = useNavigate();

    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        password: "",
        Confirmpassword:""
    })

   

    const [data,setData] = useState([]);
    console.log(inpval);

    const getdata = (e) => {
        // console.log(e.target.value);


        const { value, name } = e.target;
        // console.log(value,name);


        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })

    }

    const addData = async (e) => {
        e.preventDefault();

        const { name, email, password, Confirmpassword } = inpval;

        if (name === "") {
            toast.error(' name field is requred!',{
                position: "top-center",
            });
        } else if (email === "") {
             toast.error('email field is requred',{
                position: "top-center",
            });
        } else if (!email.includes("@")) {
             toast.error('plz enter valid email addres',{
                position: "top-center",
            });
        }  else if (password === "") {
             toast.error('password field is requred',{
                position: "top-center",
            });
        } else if (password.length < 5) {
             toast.error('password length greater five',{
                position: "top-center",
            });
        } 
        else if(Confirmpassword!==password){
            toast.error('password and Confrim password are not equal',{
                position: "top-center",});
        }else {
            console.log("data added succesfully");
            const response = await axios.post("http://localhost:8000/register",inpval)
            const data = response.data;
            if(response.status === 200){
                alert(data.message);
             }
            if(data.message==='register successful' ){
                history("/login")}
          
        }

    }

    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%",margin:'5%',background:"black",opacity:"0.75",color:"white" }}>
                        <div style={{padding:'0% 0% 0% 10%'}} >
                     <h3 className='text-center col-lg-6' style={{padding:'0% 0% 0% 25%'}}>Sign Up</h3>
                          <Form >
                            <Form.Group className="mb-3 col-lg-10" controlId="formBasicEmail">
                               <label>Name: &nbsp;</label>
                                <Form.Control type="text" name='name' onChange={getdata} placeholder="Enter Your Name" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-10" controlId="formBasicEmail">
                            <label>Email: &nbsp;</label>
                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-10" controlId="formBasicPassword">
                           <label>Password: </label>
                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-10" controlId="formBasicPassword">
                              <label>Confirm Password: &nbsp;</label>
                                <Form.Control type="password" name='Confirmpassword' onChange={getdata} placeholder="Confirm Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-10' onClick={addData} style={{ background: "red" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3' style={{padding:'0% 0% 0% 15%'}}>Already Have an Account <span><NavLink to="/login">SignIn</NavLink></span> </p>
                        </div>
                    </div>
                    {/* <SIgn_img /> */}
                </section>
                <ToastContainer />
            </div>
        </>
    )
}

export default Register