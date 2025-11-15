import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Nav, Row, Spinner } from 'react-bootstrap';
import { useGetCountryDataQuery } from '../redux/services/homeApi';
import Carousel from '../components/Carousel';
import SocialButtons from '../components/SocialButtons';

interface Country {
  name: string,
  region: string,
  flag: string,
  independent: boolean
}
const ITEMS_PER_PAGE = 12;


const HomePage = () => {
  const [filter, setFilter] = useState<'All' | 'Asia' | 'Europe'>('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: countries = [], isLoading, error } = useGetCountryDataQuery();
  console.log('countries', countries);
  const filteredCountries = countries && countries.filter((c: Country) => (
    filter === 'All' ? true : c.region === filter
  ));

  const visibleCountries = filteredCountries.slice(0, visibleCount);

  const sliderImages = [
    "https://www.countryflags.com/wp-content/uploads/india-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/japan-flag-png-large.png",
    "https://www.countryflags.com/wp-content/uploads/south-korea-flag-png-large.png"
  ];

  const totalSlides = sliderImages.length;

  const nextSlide = () => {
    currentSlide < totalSlides - 1 && setCurrentSlide((prev) => (prev + 1));
  };

  const prevSlide = () => {
    currentSlide > 0 && setCurrentSlide((prev) => (prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredCountries.length));
  };

  return (
    <Container className='py-2'>
      <Row className='d-flex align-items-center justify-content-between mb-4'>
        <Col xs={2} className="d-md-none"></Col>

        <Col xs={8} md="auto" className="text-center text-md-start">
          <h2 className="mb-0 fw-bold">Countries</h2>
        </Col>

        <Col xs={2} className="d-md-none text-end">
          <i
            className="bi bi-list fs-2"
            style={{ cursor: 'pointer' }}
            onClick={() => setMenuOpen(true)}
          ></i>
        </Col>

        <Col md="auto" className="d-none d-md-flex justify-content-end">
          <Nav className="gap-3">
            {
              (['All', 'Asia', 'Europe'] as const).map((tab) => (
                <Nav.Item key={tab}>
                  <Nav.Link active={filter === tab}
                    onClick={() => {
                      setFilter(tab);
                      setVisibleCount(ITEMS_PER_PAGE);
                    }}
                    className={`px-3 ${filter === tab ? 'text-dark fw-bold' : 'text-muted'}`}
                    style={{
                      borderBottom: filter === tab ? '2px solid black' : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {tab}
                  </Nav.Link>
                </Nav.Item>
              ))
            }
          </Nav>
        </Col>
      </Row>
      <Row className="align-items-center mb-4">
        <Col className='align-items-center'>
          <div className="d-flex align-items-center justify-content-between" style={{ height: '4rem', position: 'relative' }}>
            <div
              style={{
                height: '1px',
                background: '#333',
                width: '35%',
                alignSelf: 'flex-start',
                marginRight: '1rem',
                marginTop: '0.6em'
              }}
            />
            <h1
              className="mb-0 display-5 fw-bold text-uppercase"
              style={{
                lineHeight: 1,
                margin: 0,
                padding: 0,
                color: '#333',
                textAlign: 'center'
              }}
            >
              Welcome
            </h1>
            <div
              style={{
                height: '1px',
                background: '#333',
                width: '35%',
                alignSelf: 'flex-end',
                marginLeft: '1rem',
                marginBottom: '0.2em'
              }}
            />
          </div>
        </Col>
      </Row>

<Carousel
  currentSlide={currentSlide}
  sliderImages={sliderImages}
  goToSlide={goToSlide}
  prevSlide={prevSlide}
  nextSlide={nextSlide}
/>
      {isLoading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {error && (
        <Alert variant="danger">Failed to load countries. Please try again.</Alert>
      )}

      <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
        {visibleCountries.map((country: Country, index: number) => (
          <Col xs={12} md={6} lg={6}
            key={index}
          >
            <Card
              className="border-black rounded-0 shadow-sm"
              style={{ backgroundColor: '#f8f9fa' }}
            >
              <Card.Body className="d-flex align-items-center p-3">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  width={50}
                  height={35}
                  className="me-3 rounded"
                  style={{ objectFit: 'cover' }}
                />
                <div>
                  <h6 className="mb-0 fw-bold">{country.name}</h6>
                  <small className="text-muted">{country.region}</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {visibleCount < filteredCountries.length && !isLoading && (
        <div className="text-center mt-3 mb-4">
          <Button variant="dark" onClick={loadMore}>
            Load more
          </Button>
        </div>
      )}

       <SocialButtons/>

      {menuOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

\      <div
        className={`position-fixed top-0 end-0 bg-white h-100 shadow p-4`}
        style={{
          width: '260px',
          zIndex: 1050,
          transition: 'transform 0.3s ease',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-bold">Filter Menu</h5>
          <i
            className="bi bi-x-lg fs-4"
            style={{ cursor: 'pointer' }}
            onClick={() => setMenuOpen(false)}
          ></i>
        </div>

\        <Nav className="flex-column gap-3">
          {(['All', 'Asia', 'Europe'] as const).map((tab) => (
            <Nav.Link
              key={tab}
              onClick={() => {
                setFilter(tab);
                setVisibleCount(ITEMS_PER_PAGE);
                setMenuOpen(false);
              }}
              className={`px-0 ${filter === tab ? 'fw-bold text-dark' : 'text-muted'}`}
              style={{
                borderBottom: filter === tab ? '2px solid black' : 'none',
                width: 'fit-content',
              }}
            >
              {tab}
            </Nav.Link>
          ))}
        </Nav>
      </div>
    </Container>
  )
}

export default HomePage