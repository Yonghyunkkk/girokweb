import {
  Field,
  FieldProps,
  ErrorMessage,
  FormikErrors,
  FormikTouched,
} from "formik";
import { AnimatePresence, motion, Variant, Variants } from "framer-motion";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Paragraph12 } from "../GlobalStyledComponents";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  value: string | undefined;
  placeholder?: string;
  errors?: string;
  touched?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  textArea?: boolean;
  as?: "textarea" | undefined;
  onChange?: {
    (e: React.ChangeEvent<any>): void;
  };
  handleBlur?: {
    (e: React.ChangeEvent<any>): void;
  };
}

const Input = styled(Field)`
  padding: 0.5rem 0rem;
  border-bottom: 1px solid #e3e3e3;
  outline: none;
  position: relative;
  flex: 1;
  width: 100%;
`;

const AnimatedBorder = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  background: #000;
`;
const variants: Variants = {
  initial: {
    width: "100%",
    x: "-100%",
  },
  animate: {
    width: "100%",
    x: "0%",
  },
  error: {
    width: "100%",
    x: "0%",
    backgroundColor: "red",
  },
};

const errorMessageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 10,
  },
};

const transition = {
  type: "spring",
  damping: 50,
  mass: 1,
  stiffness: 350,
};

const Textfield: FC<InputProps> = ({
  name,
  label,
  placeholder,
  errors,
  touched,
  autofocus = false,
  disabled = false,
  type,
  value,
  as,
  handleBlur,
  onChange,
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  const isError = errors && touched;
  // const errorClass = isError ? 'error' : ''

  // useEffect(() => {
  //     console.log(errors)
  // }, [errors])

  return (
    <div className="pb-[32px] inline-block w-full">
      <div className="relative flex-1 overflow-hidden">
        {as === "textarea" ? (
          <>
            <Field
              as={"textarea"}
              style={{
                padding: "0.5rem 0rem",
                paddingBottom: 0,
                borderBottom: "1px solid #e3e3e3",
                outline: "none",
                position: "relative",
                flex: "1",
                width: "100%",
              }}
              id={name}
              type={type}
              name={name}
              placeholder={placeholder || ""}
              autoComplete="off"
              disabled={disabled}
              onFocus={() => setFocus(true)}
              onBlur={() => {
                setFocus(false);
              }}
              value={value}
              onChange={onChange}
            />
            <AnimatedBorder
              style={{ bottom: "7px" }}
              transition={transition}
              variants={variants}
              initial="initial"
              animate={
                !errors || (value && value.length === 0)
                  ? focus || (value && value.length > 0)
                    ? "animate"
                    : "initial"
                  : "error"
              }
            />
          </>
        ) : (
          <>
            <Input
              id={name}
              type={type}
              name={name}
              placeholder={placeholder || ""}
              autoComplete="off"
              disabled={disabled}
              onFocus={() => setFocus(true)}
              onBlur={() => {
                setFocus(false);
              }}
              value={value}
              onChange={onChange}
            />
            <AnimatedBorder
              transition={transition}
              variants={variants}
              initial="initial"
              animate={
                !errors || (value && value.length === 0)
                  ? focus || (value && value.length > 0 && value !== "+852")
                    ? "animate"
                    : "initial"
                  : "error"
              }
            />
          </>
        )}
      </div>
      <AnimatePresence>
        {errors && (
          <motion.div
            className="absolute mt-2"
            transition={transition}
            variants={errorMessageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Paragraph12 className=" text-[red]">{errors}</Paragraph12>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Textfield;
