import React from "react";

/**
 * Bootstrap
 */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

class Publications extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "ServidorA", publications: [] };

    this.handleChange = this.handleChange.bind(this);

    this.getServerAData = this.getServerAData.bind(this);
    this.getServerBData = this.getServerBData.bind(this);
  }

  getServerAData() {
    fetch("http://18.188.146.17:5000/sentence")
      .then((results) => results.json())
      .then((results) => {
        const newPublications = results.map((result) => {
          return (
            <Row className="m-2" key={result.date}>
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>{result.author}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {result.date}
                  </Card.Subtitle>
                  <Card.Text>{result.sentence}</Card.Text>
                </Card.Body>
              </Card>
            </Row>
          );
        });
        this.setState({ publications: newPublications });
      })
      .catch((err) => console.log(err));
  }

  getServerBData() {
    fetch("http://52.15.159.171:5000/sentence")
      .then((results) => results.json())
      .then((results) => {
        const newPublications = results.map((result) => {
          return (
            <Row className="m-2" key={result.date}>
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>{result.author}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {result.date}
                  </Card.Subtitle>
                  <Card.Text>{result.sentence}</Card.Text>
                </Card.Body>
              </Card>
            </Row>
          );
        });
        this.setState({ publications: newPublications });
      })
      .catch((err) => console.log(err));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    if (event.target.value === "ServidorA") {
      this.getServerAData();
    } else {
      this.getServerBData();
    }
  }

  componentDidMount() {
    this.getServerAData();
  }

  render() {
    return (
      <Row className="m-4">
        <Container>
          <Row className="m-2">
            {" "}
            <h3>Publications</h3>
            <select
              value={this.state.value}
              onChange={this.handleChange}
              className="ml-5"
            >
              <option value="ServidorA">Servidor A</option>
              <option value="ServidorB">Servidor B</option>
            </select>
          </Row>
          {this.state.publications}
        </Container>
      </Row>
    );
  }
}

export default Publications;
