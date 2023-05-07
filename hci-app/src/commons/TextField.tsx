import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FieldProps } from "formik/dist/Field";

interface ComponentProps {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

const TextField: React.FC<ComponentProps & FieldProps> = ({
  type,
  placeholder,
  field,
  form: { touched, errors },
  ...props
}) => {
  const [isPassword, setIsPassword] = useState(false);

  return (
    <div
      className={`flex items-center gap-2 border-b ${
        touched[field.name] && errors[field.name]
          ? "border-[#F4511E]"
          : "border-gray-400"
      }`}
    >
      <input
        className="w-full py-2 bg-transparent focus:outline-none"
        type={!isPassword ? type : "text"}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {type === "password" && (
        <button type="button" onClick={() => setIsPassword(!isPassword)}>
          <FontAwesomeIcon
            icon={isPassword ? solid("eye") : solid("eye-slash")}
          />
        </button>
      )}
    </div>
  );
};

export default TextField;
