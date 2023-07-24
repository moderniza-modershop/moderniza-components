import { Row, Col, Card } from "reactstrap"

const list = (row) => {
    return (
        <Row className='m-0'>
            <Card className="mb-0 p-1">
                <Row className='m-0'>
                    <Col xs="auto" className="my-auto">
                        <img className="w-9 shadow-2 rounded-circle" src={'https://picsum.photos/200'} alt={row.title} style={{ height: '50px' }} />
                    </Col>
                    <Col className="my-auto">
                        <h2>Title</h2>
                        <p>{row.title}</p>
                    </Col>
                    <Col className="my-auto">
                        <h2>Score</h2>
                        <p>{row._score}</p>
                    </Col>
                </Row>
            </Card>
        </Row>
    )
}

export default list