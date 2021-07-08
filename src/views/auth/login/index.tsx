import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup'; 
import { Button, Box, Link, Typography, makeStyles, Card, AppBar } from "@material-ui/core";
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from "react-router-dom";
import FormikAlert from '../../../formik/FormikAlert';
import FormikInput from '../../../formik/FormikInput';

const useStyles = makeStyles({
    inputs: {
        marginBottom: 3
    },
});

const Login = () => {
    const { login } = useAuth()
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });
    
    const initialValues = {
        email: '',
        password: '',
    };
    
    const handleSubmit = useCallback(
        async function(values, actions) {
            try {
                await login(values.email, values.password);
                setLoading(true);
                console.log(loading)
                actions.setStatus({ loginSuccess: 'Signing in...'});
            } catch (error) { 
                console.log(error);
                actions.setStatus({ loginError: 'Something went wrong' });
            } finally {
                setLoading(false);
                history.push('/home');
            }
        }, [history, loading, login]
    );

    return( 
        <>
        <AppBar color='secondary' position="static">
            <Box display="flex" justifyContent="flex-end">
                <Box display="flex" flexDirection="row" justifyContent="space-between" width="30rem" >
                    <Typography color='primary' variant="h4">UMeme</Typography>
                    <Button variant='contained' color='secondary' href="/register">Sign Up</Button>
                </Box>
            </Box>
        </AppBar>
            <Box height="40rem" display="flex" justifyContent="center" alignItems="center" >
                <Box maxWidth={300}>
                    <Formik 
                        validateOnBlur={false} 
                        validateOnChange={false} 
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Card color='black'>
                            <Typography variant="h4" gutterBottom>Login</Typography>
                            <Form>
                                <FormikAlert name="loginSucess" severity="success" />
                                <FormikAlert name="loginError" severity="error" />
                                <FormikInput
                                    name="email"
                                    type="email"
                                    placeholder="Type email here..." 
                                    fullWidth
                                    variant="outlined"
                                    className={classes.inputs}
                                />
                                <FormikInput 
                                    name="password"
                                    type="password"
                                    placeholder="Type password here..." 
                                    fullWidth
                                    variant='outlined'
                                    className={classes.inputs}
                                />
                                <Link href="/forgot">Forgot Password?</Link>
                                <Box my={3} display='flex' justifyContent='center'>
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

export default Login;