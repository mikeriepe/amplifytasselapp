import React, { useState, useContext, createContext } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Backdrop, colors } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const InputContext = createContext();
export const useInputContext = () => useContext(InputContext);

const inputStyling = {
  height: "40px",
  width: "100%",
  borderRadius: "15px",
  fontFamily: "Montserrat",
  fontSize: "0.8rem",
  fontWeight: "600",
  color: "#3C4047",
  ".MuiOutlinedInput-input:-webkit-autofill": {
    padding: 0,

    height: "40px",
    "-webkit-box-shadow": "0 0 0 30px white inset !important",
    "-webkit-text-fill-color": "#3C4047",
  },
};

const visibilityStyling = {
  marginRight: "10px",
  fontSize: "20px",
  color: "#8B95A5",
};

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          backgroundColor: "white",
          height: "9px",
          width: "100%",
          borderRadius: "15px",
        },
      },
    },
  },
});

/**
 * Themed input
 * @return {JSX}
 */
export default function ThemedInput({
  placeholder,
  type,
  index,
  step,
  fill,
  error,
  label,
  required,
  content = null,
}) {
  const value = useInputContext();
  const [values, setValues] = value;
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [step]: { ...prevValues[step], [index]: e.target.value },
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {type === "text" ? (
        <ThemeProvider theme={theme}>
          <OutlinedInput
            inputProps={
              label ? { "aria-label": label } : { "aria-label": "Input text" }
            }
            placeholder={placeholder}
            type={type}
            value={content !== null ? content : values[index]}
            onChange={handleChange}
            autoComplete={fill}
            error={error}
            required={required ? true : false} // Add the required prop conditionally
            sx={inputStyling}
          />
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={theme}>
          <OutlinedInput
            inputProps={
              label
                ? { "aria-label": label }
                : { "aria-label": "Input password" }
            }
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            value={values[index]}
            onChange={handleChange}
            error={error}
            required={required ? true : false}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  disableRipple
                >
                  {showPassword ? (
                    <VisibilityOff sx={visibilityStyling} />
                  ) : (
                    <Visibility sx={visibilityStyling} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            sx={inputStyling}
          />
        </ThemeProvider>
      )}
    </>
  );
}
