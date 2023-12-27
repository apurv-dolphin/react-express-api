import { withTranslation } from "react-i18next";
import { Container, StyledInput } from "./styles";
import { Label } from "../TextArea/styles";
import { InputProps } from "../types";
import { useEffect, useState } from "react";

const Input = ({ name, placeholder, onChange, t }: InputProps) => {
  const [inputName, setInputName] = useState("");
  useEffect(() => {
    setInputName(name);
  }, [name]);
  return (
    <Container>
      <Label htmlFor={inputName}>{t(inputName)}</Label>
      <StyledInput
        placeholder={t(placeholder)}
        name={inputName}
        id={inputName}
        onChange={onChange}
      />
    </Container>
  );
};

export default withTranslation()(Input);
