import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';

const Helloworld = () => {
    const cardData = [
        {
            title: "Card 1",
            text: "This is the first card's content.",
            imageSrc: "https://placehold.co/400x400"
        },
        {
            title: "Card 2",
            text: "Here's the second card with its own content.",
            imageSrc: "https://placehold.co/400x400"
        },
        {
            title: "Card 3",
            text: "And here's the third card. You can add more!",
            imageSrc: "https://placehold.co/400x400"
        }
    ];

    return (
        <Container className="my-1">
            <Carousel>
                {cardData.map((card, index) => (
                    <Carousel.Item key={index}>
                        <Row className="justify-content-center">
                            <Col xs={12} md={6}>
                                <Card className="bg-secondary bg-gradient text-dark">
                                    <Card.Img variant="top" src={card.imageSrc} />
                                    <Card.Body>
                                        <Card.Title>{card.title}</Card.Title>
                                        <Card.Text>{card.text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default Helloworld;