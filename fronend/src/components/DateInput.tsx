import React, { ChangeEventHandler, FocusEventHandler } from "react";
import ReactInputMask from "react-input-mask";

const DateInput = (
  { value, onChange, onBlur, children: child, className, ...rest },
  ref
) => {
  return (
    <ReactInputMask
      className={`disabled:opacity-70 disabled:bg-gary-100 ${className}`}
      mask={`____/__/__`}
      value={value}
      alwaysShowMask={true}
      onChange={onChange}
      onBlur={onBlur}
      // @ts-ignore
      formatChars={{
        _: "[0-9]",
      }}
      dir="ltr"
      {...rest}
    >
      {(props) =>
        React.cloneElement(child as any, {
          ...props,
          disabled: rest.disabled,
        })
      }
    </ReactInputMask>
  );
};

export default DateInput;
