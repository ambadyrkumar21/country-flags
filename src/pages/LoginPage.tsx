import { useFormik } from "formik"
import { Button, Form, Spinner, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { useLoginMutation } from "../redux/services/loginApi";
import { useAppDispatch } from "../hooks/useAppSelector";
import { setCredentials } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'Yup';
import SocialButtons from "../components/SocialButtons";
import { useState } from "react";


const LoginPage = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)

  const loginSchema = Yup.object({
    username: Yup.string().required('Username or email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain at least 1 uppercase letter')
      .matches(/[0-9]/, 'Must contain at least 1 number')
      .matches(/[^A-Za-z0-9]/, 'Must contain at least 1 symbol'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        dispatch(setCredentials(result));
        navigate('/home');
      }
      catch (err) {
        console.log("login error:", err)
      }
    }
  })
  return (
    <Container fluid className="min-vh-100 bg-white d-flex align-items-center py-5">
      <Row className="w-100 justify-content-center g-5" >
        <Col xs={12} sm={10} md={8} lg={5} className="order-lg-1 order-2 mx-auto">
          <Card className="border-0 shadow-sm p-4 p-lg-5">
            <Card.Body className="p-0">
              <h2 className="fw-bold mb-3">
                Sign In
              </h2>
              <p className="text-black mb-4">
                New User?{' '}
                <Link to="/" className="text-decoration-none fw-semibold">
                  Create an account
                </Link>
              </p>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Username or Email"
                    {...formik.getFieldProps('username')}
                    isInvalid={formik.touched.username && !!formik.errors.username}
                    className="border-2 border-black rounded-0 py-3"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    className="border-2 border-black rounded-0 py-3"
                    style={{
                      borderRight: "none",
                    }}
                  />

                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="border-2 border-black rounded-0 d-flex align-items-center"
                    style={{
                      borderLeft: "none",
                      backgroundColor: "white",
                    }}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </Button>
                </div>

                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>

                <Form.Group className="mb-4 d-flex align-items-center">
                  <Form.Check type="checkbox" id="keepSignedIn" />
                  <Form.Label htmlFor="keepSignedIn" className="ms-2 mb-0">
                    Keep me signed in
                  </Form.Label>
                </Form.Group>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    Invalid credentials. Please try again.
                  </Alert>
                )}

                <Button
                  variant="dark"
                  type="submit"
                  disabled={isLoading}
                  className="w-100 mb-4 py-3 fw-semibold rounded-0"
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Form>
              <div className="text-center text-muted mb-4">Or Sign In With</div>

              <SocialButtons />

            </Card.Body>

          </Card>
        </Col>
        <Col lg={6} className="order-lg-2 order-1 d-none d-lg-block">
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div
              className="bg-transparent rounded-3 overflow-hidden"
              style={{
                width: '100%',
                maxWidth: '500px',
                height: '600px',
                backgroundImage: 'url(https://png.pngtree.com/png-clipart/20190516/original/pngtree-vector-walking-icon-png-image_4155715.jpg)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
            </div>
          </div>
        </Col>
      </Row>

    </Container>
  )
}

export default LoginPage