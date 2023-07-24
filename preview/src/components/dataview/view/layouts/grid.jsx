import { Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap"

const grid = (row) => {
    return (
        <Col xs="12" md="6" lg="4" className="p-1">
            <Card className="mb-0">
                <CardBody>
                    <CardTitle tag="h5">{row.title}</CardTitle>
                    <CardSubtitle
                        className="mb-0 text-muted"
                        tag="h6"
                    >{row.api_model}</CardSubtitle>
                </CardBody>
                <img src={'https://picsum.photos/200'} alt={row.title} />
                <CardBody>
                    <CardText>Score: {row._score}</CardText>
                </CardBody>
            </Card>
        </Col>
    )
}

export default grid