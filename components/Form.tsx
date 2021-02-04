import React, { ChangeEventHandler, FormEventHandler, ReactChild } from "react";

interface Props {
  fields: {
    label: string;
    type: "text" | "password" | "textarea";
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    errors: string[];
  }[];
  onSubmit: FormEventHandler;
  buttons: ReactChild;
}

export const Form: React.FC<Props> = (props) => {
  const { fields, onSubmit, buttons } = props;
  return (
    <form onSubmit={onSubmit}>
      {fields.map(({ type, label, value, onChange, errors }) => {
        return (
          <div key={label}>
            <label>
              {label}
              {type === "textarea" ? (
                <textarea onChange={onChange} value={value} />
              ) : (
                <input type="text" value={value} onChange={onChange} />
              )}
            </label>
            {errors.length > 0 ? <div>{errors.join(",")}</div> : null}
          </div>
        );
      })}
      <div>{buttons}</div>
    </form>
  );
};
