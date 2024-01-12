/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id,name, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (


        {if(name === "days"){

        } }
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused}
      />
      <span>{errorMessage && "Error"}</span>
    </div>
  );
};

export default FormInput;
