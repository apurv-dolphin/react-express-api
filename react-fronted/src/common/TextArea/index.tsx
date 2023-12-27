import { withTranslation } from "react-i18next";
import { StyledTextArea, StyledContainer, Label } from "./styles";
import { InputProps } from "../types";
import { useEffect, useState } from "react";


const TextArea = ({ name, placeholder, onChange, t }: InputProps) => {
   const [textAreaName, setTextAreaName] = useState("");
   useEffect(() => {
     setTextAreaName(name);
   }, [name]);

  return (
    <StyledContainer>
      <Label htmlFor={textAreaName}>{t(textAreaName)}</Label>
      <StyledTextArea
        placeholder={t(placeholder)}
        id={textAreaName}
        name={textAreaName}
        onChange={onChange}
      />
    </StyledContainer>
  );
};

export default withTranslation()(TextArea);
