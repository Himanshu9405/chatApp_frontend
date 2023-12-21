import { Button, Grid, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const Login = () => {

  const navigate = useNavigate()

  const loginValidation = Yup.object().shape({
    email: Yup.string().required('Please Enter Your Emaail'),
    password: Yup.string().min(6).required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
    validationSchema: loginValidation,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      console.log('values', values);
      const tempObj = {
        ...values
      }
      try {
        const response = await axios.post("http://localhost:7000/user/login", tempObj);
        console.log("response", response);
        if (response.status === 200) {
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          navigate('/chat');
        }
      } catch (error) {
        console.log('error', error)
      }
    }
  })

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <div style={{ width: "100%", marginTop: "5px" }}>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={5}  >
            <Grid item lg={12}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} >
                  <TextField
                    sx={{ m: 3, mt: 2 }}
                    fullWidth
                    label="Email  "
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Password"
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />

                </Stack>
                <Stack>
                  <Button variant='contained' color='secondary' type='submit'>
                    Login
                  </Button>
                </Stack>
                <Stack>
                  <Button variant='contained' color='primary' onClick={() => {
                    setFieldValue('email', 'user@gmail.com')
                    setFieldValue('password', '123456')
                  }}>
                    Get User Credentials
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div >
  )
}

export default Login
