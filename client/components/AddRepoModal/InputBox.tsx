import * as React from "react";

interface IProps {
  labelName: string;
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  placeholder: string;
  value: string;
}

const InputBox = ({ labelName, onChange, placeholder, value }: IProps) => (
  <div className="field">
    <label className="label">{labelName}</label>
    <div className="field-body">
      <div className="field">
        <p className="control">
          <input
            className="input is-primary"
            type="text"
            onChange={onChange}
            placeholder={placeholder}
            value={value}
          />
        </p>
      </div>
    </div>
  </div>
);

export default InputBox;
