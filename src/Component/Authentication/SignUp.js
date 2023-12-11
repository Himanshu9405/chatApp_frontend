import React from 'react';
import { Button, Grid, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { Form, FormikProvider, useFormik } from 'formik'

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      profile_pic: ''
    },
    // validationSchema: NewCandidateSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      console.log('values', values)
    }
  })

  const { errors, values, touched, handleSubmit, getFieldProps } = formik;
  return (
    <div style={{ width: "100%", marginTop: "5px" }}>

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
                <Stack>
                  <Button variant='contained' color='secondary' type='submit'>
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
