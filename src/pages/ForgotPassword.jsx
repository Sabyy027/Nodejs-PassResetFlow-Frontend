import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (values, { setSubmitting }) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/send-reset-otp`, { email: values.email });
            setEmail(values.email);
            setStep(2);
            setMessage('An OTP has been sent to your email.');
        } catch (err) {
            setError('This email is not registered.');
        }
        setSubmitting(false);
    };
    
    const handleResetPassword = async (values, { setSubmitting }) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, { 
                email: email, 
                otp: values.otp, 
                password: values.password 
            });
            setMessage('Password reset successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError('Invalid OTP or server error.');
        }
        setSubmitting(false);
    };

    return (
        <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">Reset Password</h2>
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
            {message && <p className="text-green-500 text-center text-sm">{message}</p>}

            {step === 1 && (
                <Formik initialValues={{ email: '' }} validationSchema={Yup.object({ email: Yup.string().email('Invalid email').required('Required') })} onSubmit={handleSendOtp}>
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <Field name="email" type="email" placeholder="Enter your email" className="w-full px-3 py-2 border rounded" />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                            <button type="submit" disabled={isSubmitting} className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300">Send OTP</button>
                        </Form>
                    )}
                </Formik>
            )}

            {step === 2 && (
                <Formik initialValues={{ otp: '', password: '', confirmPassword: '' }} 
                    validationSchema={Yup.object({
                        otp: Yup.string().matches(/^[0-9]{4}$/, 'Must be a 4-digit number').required('Required'),
                        password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
                        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
                    })} 
                    onSubmit={handleResetPassword}>
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <Field name="otp" type="text" placeholder="4-Digit OTP" className="w-full px-3 py-2 border rounded" />
                            <ErrorMessage name="otp" component="div" className="text-red-500 text-xs mt-1" />
                            <Field name="password" type="password" placeholder="New Password" className="w-full px-3 py-2 border rounded" />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                            <Field name="confirmPassword" type="password" placeholder="Confirm New Password" className="w-full px-3 py-2 border rounded" />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                            <button type="submit" disabled={isSubmitting} className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300">Reset Password</button>
                        </Form>
                    )}
                </Formik>
            )}
            <p className="text-center text-sm"><Link to="/login" className="font-medium text-blue-600 hover:underline">Back to Login</Link></p>
        </div>
    );
};

export default ForgotPassword;