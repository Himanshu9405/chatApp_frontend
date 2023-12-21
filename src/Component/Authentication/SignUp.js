import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Grid, Input, Snackbar, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [open, setopen] = useState(false);

  const navigate = useNavigate()


  const signUpValidation = Yup.object().shape({
    name: Yup.string().required('Please Enter Your Name'),
    email: Yup.string().required('Please Enter Your Emaail'),
    password: Yup.string().min(6).required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      profile_pic: ''
    },
    validationSchema: signUpValidation,
    onSubmit: async (values) => {
      console.log('values', values);
      const tempObj = {
        ...values
      }
      try {
        const response = await axios.post("http://localhost:7000/user/register", tempObj);
        console.log("response", response);
        if (response.status === 201) {
          localStorage.setItem('userInfo', JSON.stringify(response.data));
          navigate('/chat');
        }
      } catch (error) {
        console.log('error', error)
      }
    }
  });

  const postImage = async (pic) => {
    setLoading(true);
    if (pic === undefined) {
      setopen(true);
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setopen(false)}
        message="Please select an image"
      />
    }

    console.log("pic", pic.type)

    if (pic.type === 'image/jpeg' || pic.type === 'image/png' || pic.type === 'image/heif') {
      const data = new FormData();
      data.append('file', pic);
      data.append('upload_preset', 'chat-app');
      data.append('cloud_name', "dnrkcdtu6");

      try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dnrkcdtu6/image/upload", data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("data", response.data.url);
        formik.setFieldValue('profile_pic', response.data.url);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log('else')
      setopen(true);
      setLoading(false);
      return;
    }

  }

  const { errors, values, touched, handleSubmit, getFieldProps } = formik;
  console.log("values", values)
  return (
    <div style={{ width: "100%", marginTop: "5px" }}>
      {
        open ? (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setopen(false)}
            message="Please select an image of jpeg and png type"
          />
        ) : ''

      }



      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={5}  >
            <Grid item lg={12}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Email"
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

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    {...getFieldProps('confirm_password')}
                    error={Boolean(touched.confirm_password && errors.confirm_password)}
                    helperText={touched.confirm_password && errors.confirm_password}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <FormControl>
                    <FormLabel>Upload your Pic</FormLabel>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        postImage(e.target.files[0])
                      }}
                    ></Input>
                  </FormControl>
                  {/* <TextField
                    fullWidth
                    label"
                    {...getFieldProps('confirm_password')}
                    error={Boolean(touched.confirm_password && errors.confirm_password)}
                    helperText={touched.confirm_password && errors.confirm_password}
                  /> */}
                </Stack>
                <Stack>
                  <Button variant='contained' color='secondary' type='submit' disabled={loading}>
                    SignUp
                  </Button>

                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  )
}

export default SignUp
// https://api.cloudinary.com/v1_1/dnrkcdtu6/image/upload