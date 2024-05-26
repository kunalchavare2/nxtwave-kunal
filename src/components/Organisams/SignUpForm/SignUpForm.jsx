import { FormProvider, useForm } from "react-hook-form";

import {
  SignUpFormHeader,
  SignUpFormWrapper,
  SignUpFormMain,
  SignUpFormFooter,
} from "./SignUpForm.styled";
import InputBoxV2 from "../../Molecules/InputBoxV2/InputBoxV2";
import {
  password_validation,
  phone_validation,
  repeat_pass_validation,
} from "../../../utils/validations/inputValidations";
import Button from "../../Atoms/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  hashPassword,
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../../utils/_helpers";

const SignUpForm = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = methods.handleSubmit((formData) => {
    let data = getFromLocalStorage("users");

    const hashedPassword = hashPassword(formData.newpassword);

    if (data) {
      data = [
        ...data,
        {
          phone: formData.phonenumber,
          password: hashedPassword,
        },
      ];
    } else {
      data = [
        {
          phone: formData.phonenumber,
          password: hashedPassword,
        },
      ];
    }

    saveToLocalStorage(data, "users");

    toast.success("Account created successfully!");

    methods.reset();

    navigate("/login", { replace: true });
  });
  return (
    <FormProvider {...methods}>
      <SignUpFormWrapper>
        <SignUpFormHeader>
          <h1 className="title">Sign Up</h1>
          <span className="sub-title">Enter your accounts details below.</span>
        </SignUpFormHeader>
        <SignUpFormMain
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
        >
          <InputBoxV2
            label="Phone Number"
            type="number"
            onChange={(e) => {}}
            validation={phone_validation.validation}
          />
          <InputBoxV2
            label="New Password"
            type="password"
            validation={password_validation.validation}
            onChange={(e) => {}}
          />
          <InputBoxV2
            label="Repeat Password"
            type="password"
            validation={repeat_pass_validation.validation}
            onChange={(e) => {}}
            customValidate={(val, form) => {
              const pass = methods.getValues("newpassword");

              if (val !== pass) return "Passwords do not match";
            }}
          />
          <Button onClick={onSubmit} title="Sign Up" />
        </SignUpFormMain>
        <SignUpFormFooter>
          <div className="footer-top">
            <span>Already have an account? </span>
            <Link to="/auth/login">Log In</Link>
          </div>
        </SignUpFormFooter>
      </SignUpFormWrapper>
    </FormProvider>
  );
};

export default SignUpForm;
