import { Button, Grid, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { Form, FormikProvider, useFormik } from 'formik'
import React from 'react'

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
    // validationSchema: NewCandidateSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      console.log('values', values)
    }
  })

  const { errors, values, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

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
