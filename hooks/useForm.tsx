import React, { ReactChild, useCallback, useState } from "react";
import { AxiosResponse } from "axios";

interface Field<T> {
  label: string;
  type: "text" | "password" | "textarea";
  key: keyof T;
}

type UpdateFieldPayload<T> = {
  [k in keyof T]?: any;
};

type UseFormParams<T> = {
  initFormData: T;
  fields: Field<T>[];
  buttons: ReactChild;
  submit: {
    request: (formData: T) => Promise<T>;
    success: () => void;
  };
};

export function useForm<T extends { [key: string]: number | string }>({
  initFormData,
  fields,
  submit,
  buttons,
}: UseFormParams<T>) {
  const [formData, setFormData] = useState<T>(initFormData);
  const [errors, setErrors] = useState(() => {
    const initErrors: { [k in keyof T]?: string[] } = {};
    for (const key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        initErrors[key] = [];
      }
    }
    return initErrors;
  });
  const onChange = useCallback(
    (payload: UpdateFieldPayload<T>) => {
      setFormData({
        ...formData,
        ...payload,
      });
    },
    [setFormData, formData]
  );
  const _onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      submit.request(formData).then(
        () => {
          submit.success();
          // window.location.href = "/sign_in";
        },
        (error) => {
          const response: AxiosResponse = error.response;
          if (response) {
            if (response.status === 422) {
              setErrors(response.data);
            } else if (response.status === 401) {
              window.alert("请先登录");
              window.location.href = `/sign_in?return_to=${encodeURIComponent(
                window.location.pathname
              )}`;
            }
          }
        }
      );
    },
    [submit, formData]
  );
  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map(({ type, key, label }) => {
        return (
          <div key={label}>
            <label>
              {label}
              {type === "textarea" ? (
                <textarea
                  onChange={(event) => {
                    onChange({
                      [key]: event.target.value,
                    } as UpdateFieldPayload<T>);
                  }}
                  value={formData[key]}
                />
              ) : (
                <input
                  type="text"
                  value={formData[key]}
                  onChange={(event) => {
                    onChange({
                      [key]: event.target.value,
                    } as UpdateFieldPayload<T>);
                  }}
                />
              )}
            </label>
            {errors[key].length > 0 ? <div>{errors[key].join(",")}</div> : null}
          </div>
        );
      })}
      <div>{buttons}</div>
    </form>
  );
  return {
    form,
  };
}
