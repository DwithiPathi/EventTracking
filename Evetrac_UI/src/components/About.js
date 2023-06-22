import React from "react";
import Card from "react-bootstrap/Card";
import gathering from "./Images/Gathering.jpg";
import subscribe from "./Images/subscribe.jpg";
import black from "./Images/blackWallpaper.jpg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "../components/NavBar/Nav.js";
const text =
  "800 University Drive\nMaryville, MO-64468\nUSA\n\n817-718-1111\ninfo@evetrac.org";
const htext = "Get the latest news\nand updates from\nthe EveTrac";
const htexts = "Sign up with your email\naddress to receive news and\nupdates.";
const hfooter = "We respect your privacy.";

function About() {
  return (
    <>
     <Navbar />
      <Card
        className="mb-3"
        style={{
          width: "73rem",
          marginLeft: "50px",
          marginRight: "50px",
          marginTop: "50px",
        }}
      >
        <Row className="g-0">
          <Col md={7}>
            <Card.Img src={gathering} />
          </Col>
          <Col md={4}>
            <Card.Body
              className="text-center"
              style={{ marginTop: "30px", marginLeft: "70px" }}
            >
              <Card.Title>About</Card.Title>
              <Card.Text>
                Events are a perfect way to measure the success of our site and
                are seen as the “future” of analytics. EveTrac is one such
                platform, where events are treated as interactions and are
                independent from specific webpages which will help you track
                what’s most important to your interest. EveTrac is much more
                user-experience focused. You can know the events that are
                happening in the nearby location and also about volunteering
                opportunities available.
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <CardGroup style={{ marginTop: "50px" }}>
        <Card
          className="bg-danger text-light text-center"
          style={{ width: "73rem", marginTop: "10px" }}
        >
          <Card.Body
            style={{
              marginTop: "100px",
              marginLeft: "50px",
              marginRight: "50px",
            }}
          >
            <blockquote className="blockquote mb-0">
              <p> DREAMING, AFTER ALL, IS A FORM OF PLANNING </p>
              <footer
                className="blockquote-footer"
                style={{ marginLeft: "300px" }}
              >
                <cite title="Source Title">Gloria Steinem</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
        <Card style={{ width: "73rem", marginTop: "10px" }}>
          <Card.Img src={subscribe} />
        </Card>
      </CardGroup>

      <Card className="mb-3 bg-dark text-white" style={{ marginTop: "50px" }}>
        <Card.Img src={black} />
        <Row className="g-0">
          <Col>
            <Card.ImgOverlay>
              <Card.Title
                style={{
                  whiteSpace: "pre-wrap",
                  marginTop: "50px",
                  marginLeft: "300px",
                }}
              >
                {text}
              </Card.Title>
            </Card.ImgOverlay>
          </Col>
          <Col>
            <Card.ImgOverlay>
              <Card.Title
                style={{
                  whiteSpace: "pre-wrap",
                  marginTop: "50px",
                  marginLeft: "700px",
                }}
              >
                {htext}
              </Card.Title>
              <Card.Text
                style={{
                  whiteSpace: "pre-wrap",
                  marginTop: "5px",
                  marginLeft: "700px",
                }}
              >
                {htexts}
              </Card.Text>
              <Form style={{ marginLeft: "700px", marginRight: "300px" }}>
                <Form.Control type="text" placeholder="Enter E-mail" />
              </Form>
              <Button
                variant="outline-success"
                style={{ marginTop: "10px", marginLeft: "700px" }}
              >
                Sign Up
              </Button>
              <Card.Text style={{ marginTop: "10px", marginLeft: "700px" }}>
                {hfooter}
              </Card.Text>
            </Card.ImgOverlay>
          </Col>
        </Row>
        <Row className="g-1">
          <Col>
            <Card.ImgOverlay>
              <Card.Text className="text-center" style={{ marginTop: "450px" }}>
                About | Terms Of Use | Privacy Policy
              </Card.Text>
              <Card.Text
                className="text-secondary text-center"
                style={{ marginTop: "10px" }}
              >
                {" "}
                @2023 EveTrac Ltd - All Rights Reserved
              </Card.Text>
            </Card.ImgOverlay>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default About;
