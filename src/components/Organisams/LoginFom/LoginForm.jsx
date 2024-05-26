import React from "react";
import {
  LoginFormFooter,
  LoginFormHeader,
  LoginFormMain,
  LoginFormWrapper,
} from "./LoginForm.styled";
import InputBoxV2 from "../../Molecules/InputBoxV2/InputBoxV2";
import {
  password_validation,
  phone_validation,
} from "../../../utils/validations/inputValidations";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../Atoms/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { comparePassword, getFromLocalStorage } from "../../../utils/_helpers";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../../store/AuthSlice/AuthSlice";

const LoginForm = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = methods.handleSubmit((formData) => {
    const data = getFromLocalStorage("users");

    if (data) {
      const user = data.find((user) => user.phone === formData.phonenumber);

      if (user) {
        const isValid = comparePassword(formData.password, user.password);
        if (isValid) {
          dispatch(login());
          navigate("/home/resources", { replace: true });
        } else {
          toast.error("Invalid Credentials");
        }
      } else {
        toast.error("User is not present!");
      }
    } else {
      toast.error("User is not present!");
    }
  });
  return (
    <FormProvider {...methods}>
      <LoginFormWrapper>
        <LoginFormHeader>
          <h1 className="title">Log In</h1>
          <span className="sub-title">Enter your accounts details below.</span>
        </LoginFormHeader>
        <LoginFormMain
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
        >
          <InputBoxV2
            label="Phone Number"
            type="number"
            onChange={() => {}}
            validation={phone_validation.validation}
          />
          <InputBoxV2
            label="Password"
            type="password"
            onChange={() => {}}
            validation={password_validation.validation}
          />
          <Button onClick={onSubmit} title="Login" />
        </LoginFormMain>
        <LoginFormFooter>
          <div className="footer-top">
            <span>Don't have an account? </span>
            <Link to="/auth/signup">Sign Up</Link>
          </div>
          <div className="footer-bottom">
            <Link to="/reset-password">Forget your Password</Link>
          </div>
        </LoginFormFooter>
      </LoginFormWrapper>
    </FormProvider>
  );
};

export default LoginForm;
