import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide, Zoom } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Loader from "../Loader";

const StyledLabel = styled.label`
  display: block;
  padding-bottom: 10px;
  text-transform: capitalize;
`;

const Contact = ({ title, content, id, t }: ContactProps) => {
  const { values, errors, shouldSubmit, loading, handleChange, handleSubmit } =
    useForm(validate);
  const fileInputRef = useRef(null);
  const [emailData, setEmailData] = useState({
    name: "",
    email: "",
    subject: "",
    attachment: null,
  });

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type as keyof typeof errors];
    return (
      <Zoom direction="left">
        <Span>{ErrorMessage}</Span>
      </Zoom>
    );
  };

  useEffect(() => {
    setEmailData(values);
    if (shouldSubmit && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailData, values]);

  return (
    <>
      {loading && <Loader />}
      <ContactContainer id={id}>
        <Row justify="space-between" align="middle">
          <Col lg={12} md={11} sm={24} xs={24}>
            <Slide direction="left" triggerOnce>
              <Block title={title} content={content} />
            </Slide>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Slide direction="right" triggerOnce>
              <FormGroup autoComplete="off" onSubmit={handleSubmit}>
                <Col span={24}>
                  <StyledLabel>Name</StyledLabel>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={emailData.name}
                    onChange={handleChange}
                  />
                  <ValidationType type="name" />
                </Col>
                <Col span={24}>
                  <StyledLabel>Email</StyledLabel>
                  <input
                    type="text"
                    name="email"
                    placeholder="Your Email"
                    value={emailData.email}
                    onChange={handleChange}
                  />
                  <ValidationType type="email" />
                </Col>
                <Col span={24}>
                  <StyledLabel>Subject</StyledLabel>
                  <textarea
                    placeholder="Your Message"
                    value={emailData.subject}
                    name="subject"
                    onChange={handleChange}
                  />
                  <ValidationType type="subject" />
                </Col>
                <Col span={24}>
                  <StyledLabel htmlFor="attachment">Attachment</StyledLabel>
                  <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleChange}
                  />
                  <ValidationType type="attachment" />
                </Col>
                <ButtonContainer>
                  <Button name="submit">{t("Submit")}</Button>
                </ButtonContainer>
              </FormGroup>
            </Slide>
          </Col>
        </Row>
      </ContactContainer>
    </>
  );
};

export default withTranslation()(Contact);
