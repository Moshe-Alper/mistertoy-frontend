import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export function LoginForm({ onLogin, isSignup }) {
    const initialValues = {
        username: '',
        password: '',
        fullname: isSignup ? '' : '',
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
                        {isSignup ? 'Signup' : 'Login'}
                    </button>
                </Form>
            )}
        </Formik>
    )
}
