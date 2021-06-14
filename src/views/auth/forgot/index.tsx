import React from "react";
import * as Yup from 'yup'; 
import { Button, Box, Typography, makeStyles, AppBar, Card } from "@material-ui/core";
import FormikInput from '../../../formik/FormikInput';
import { Formik, Form } from "formik";

const useStyles = makeStyles({
    inputs: {
        marginBottom: 3
    }
});

const Forgot = () => {
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });
    
    // const handleSubmit = useCallback(
    //     async function(values, actions) {
    //         console.log('hello')
    //         try {
    //             setError('')
    //             setLoading(true)
    //             await resetPassword(values.email)
    //             actions.setStatus({ loginSuccess: 'Check your inbox for further instructions'})
    //             console.log(values.email)
    //         } catch (error) { 
    //             actions.setStatus({ loginError: 'Something went wrong' })
    //         } finally {
    //             setLoading(false)
    //         }
    //     }, []
    // )
    
    const initialValues = {
        email: '',
    };
    
// const value = {
//     resetPassword
// }

    return( 
        <>
            <AppBar color='secondary' position="static">
            <Box display="flex" justifyContent="flex-end">
                    <Box display="flex" flexDirection="row" justifyContent="space-between" width="29rem" >
                        <Typography variant="h4">UMeme</Typography>
                        <Box display="flex" flexDirection="row">
                            <Box paddingRight="2rem">
                                <Button variant='contained' color='secondary' href="/register">Sign Up</Button>
                            </Box>
                            <Box>
                                <Button variant='contained' href="/login">Sign In</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </AppBar>
            <Box height="40rem" display="flex" justifyContent="center" alignItems="center">
                <Box maxWidth={300}>
                    <Formik 
                        validateOnBlur={false} 
                        validateOnChange={false} 
                        initialValues={initialValues}
                        onSubmit={() => console.log('hello')}
                        validationSchema={validationSchema}
                    >
                        <Card>
                            <Typography variant="h4" gutterBottom>Recover Password</Typography>
                            <Form>
                                <FormikInput
                                    name="email"
                                    type="email"
                                    placeholder="Type email here..." 
                                    fullWidth
                                    variant="outlined"
                                    className={classes.inputs}
                                />
                                <Box my={3}>
                                    <Button type="submit" variant='contained' color="primary">Submit</Button>
                                </Box>
                            </Form>
                        </Card>
                    </Formik>
                </Box>
            </Box>
        </>
    );
};

export default Forgot;