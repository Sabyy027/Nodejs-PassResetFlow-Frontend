import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });

    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, values);
            navigate('/login');
        } catch (error) {
            setFieldError('email', 'Email already exists');
        }
        setSubmitting(false);
    };

    return (
        <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">Register</h2>
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
                        <button type="submit" disabled={isSubmitting} className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300">
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
            <p className="text-center text-sm">Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login</Link></p>
        </div>
    );
};

export default Register;