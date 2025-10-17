import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
    });

    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, values);
            localStorage.setItem('authToken', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            setFieldError('password', 'Invalid email or password');
        }
        setSubmitting(false);
    };

    return (
        <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <Field name="email" type="email" placeholder="Email" className="w-full px-3 py-2 border rounded" />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div>
                            <Field name="password" type="password" placeholder="Password" className="w-full px-3 py-2 border rounded" />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <div className="text-right text-sm"><Link to="/forgot-password" className="font-medium text-blue-600 hover:underline">Forgot Password?</Link></div>
                        <button type="submit" disabled={isSubmitting} className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300">
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
            <p className="text-center text-sm">No account? <Link to="/register" className="font-medium text-blue-600 hover:underline">Register</Link></p>
        </div>
    );
};

export default Login;