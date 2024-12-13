import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { login, signup } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function LoginPage({ isSignup }) {
    const navigate = useNavigate()

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    async function _login(credentials) {
        try {
            await login(credentials)
            navigate('/')
            showSuccessMsg('Logged in successfully')
        } catch (err) {
            showErrorMsg('Oops try again')
        }
    }

    async function _signup(credentials) {
        try {
            await signup(credentials)
            navigate('/')
            showSuccessMsg('Signed up successfully')
        } catch (err) {
            showErrorMsg('Oops try again')
        }
    }

    const initialValues = {
        username: '',
        password: '',
        fullname: isSignup ? '' : undefined,
    }

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        fullname: isSignup
            ? Yup.string()
                .min(5, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required')
            : undefined,
    })

    function handleSubmit(values, { setSubmitting }) {
        onLogin(values)
        setSubmitting(false)
    }

    return (
        <section className="login-page">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="login-form">
                        <div>
                            <Field
                                type="text"
                                name="username"
                                placeholder="Username"
                                autoComplete="username"
                                autoFocus
                            />
                            <ErrorMessage name="username" component="div" className="error" />
                        </div>
                        <div>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="current-password"
                            />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>
                        {isSignup && (
                            <div>
                                <Field
                                    type="text"
                                    name="fullname"
                                    placeholder="Full name"
                                    autoComplete="name"
                                />
                                <ErrorMessage name="fullname" component="div" className="error" />
                            </div>
                        )}
                        <button type="submit" disabled={isSubmitting}>
                            {isSignup ? 'Sign Up' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
        </section>
    )
}
