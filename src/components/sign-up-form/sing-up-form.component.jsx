import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  creatUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./sing-up-form.style.scss";

const defaultformFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormField = () => {
    setFormFields(defaultformFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await creatUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, email alreade existence");
      } else {
        console.log("user creation encountered an error", err);
      }
    }
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sing up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handlerChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handlerChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handlerChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handlerChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sing Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
