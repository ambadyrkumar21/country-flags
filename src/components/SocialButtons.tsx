import { Button } from 'react-bootstrap'

const SocialButtons = () => {
  return (
<div className="d-flex justify-content-center gap-3">
              <Button
                variant="outline-secondary"
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '45px', height: '45px' }}
              >
                <i className="bi bi-google" style={{ fontSize: '20px' }}></i>
              </Button>

              <Button
                variant="outline-secondary"
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '45px', height: '45px' }}
              >
                <i className="bi bi-facebook" style={{ fontSize: '20px' }}></i>
              </Button>

              <Button
                variant="outline-secondary"
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '45px', height: '45px' }}
              >
                <i className="bi bi-linkedin" style={{ fontSize: '20px' }}></i>
              </Button>

              <Button
                variant="outline-secondary"
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '45px', height: '45px' }}
              >
                <i className="bi bi-twitter-x" style={{ fontSize: '20px' }}></i>
              </Button>
            </div>  )
}

export default SocialButtons