import { Row, Col, Card } from "reactstrap"

const list = (row) => {
    return (
        <Row className='mx-0 mt-0 mb-1'>
            <Card className="mb-0 p-1">
                <Row className='m-0'>
                    <Col xs="auto" className="my-auto">
                        <img className="w-9 shadow-2 rounded-circle" src={'https://picsum.photos/200'} alt={row.title} style={{ height: '50px' }} />
                    </Col>
                    <Col className="my-auto">
                        <h2 className="text-dark">Title</h2>
                        <p>{row.title}</p>
                    </Col>
                    <Col className="my-auto">
                        <h2 className="text-dark">Score</h2>
                        <p>{row._score}</p>
                    </Col>
                </Row>
            </Card>
        </Row>
    )
}

export default list