import {
  ArchiveIcon,
  CompanyIcon,
  MailIcon,
  NameIcon,
  PasswordIcon,
  PhoneIcon,
} from "../../assets/images/auth/auth.vector.tsx";
import { ChangeEvent } from "react";

export const loginTabs = [
  {
    name: "auth.login.tabs.login",
    link: "login",
  },
  {
    name: "auth.login.tabs.sign__up",
    link: "register",
  },
];

export const loginInputs = [
  {
    label: "auth.login.inputs.email.label",
    placeholder: "auth.login.inputs.email.placeholder",
    icon: MailIcon,
    type: "email",
    inputRefName: "email",
  },
  {
    label: "auth.login.inputs.password.label",
    placeholder: "auth.login.inputs.password.placeholder",
    icon: PasswordIcon,
    type: "password",
    inputRefName: "password",
  },
];

export const registerCompanyInputs = [
  {
    label: "auth.register.inputs.full__name.label",
    placeholder: "auth.register.inputs.full__name.placeholder",
    icon: NameIcon,
    inputRefName: "name",
    type: "text",
    onChange: () => {},
  },
  {
    label: "auth.register.inputs.company.label",
    placeholder: "auth.register.inputs.company.placeholder",
    icon: CompanyIcon,
    inputRefName: "company",
    type: "text",
    onChange: () => {},
  },
  {
    label: "auth.register.inputs.email.label",
    placeholder: "auth.register.inputs.email.placeholder",
    icon: MailIcon,
    inputRefName: "email",
    type: "email",
    onChange: () => {},
  },
  {
    label: "auth.register.inputs.phone.label",
    placeholder: "auth.register.inputs.phone.placeholder",
    icon: PhoneIcon,
    inputRefName: "phone",
    type: "text",
    onChange: () => {},
  },
  {
    label: "auth.register.inputs.password.label",
    placeholder: "auth.register.inputs.password.placeholder",
    icon: PasswordIcon,
    inputRefName: "password",
    type: "password",
    onChange: () => {},
  },
  {
    label: "auth.register.inputs.re__password.label",
    placeholder: "auth.register.inputs.re__password.placeholder",
    icon: PasswordIcon,
    inputRefName: "confirm__password",
    type: "password",
    onChange: () => {},
  },
  {
    label: "auth.register.inputs.tin__code.label",
    placeholder: "auth.register.inputs.tin__code.placeholder",
    icon: ArchiveIcon,
    inputRefName: "code",
    type: "text",
    onChange: () => {},
  },
];

export const registerIndividualInputs = [
  {
    label: "auth.register.inputs.full__name.label",
    placeholder: "auth.register.inputs.full__name.placeholder",
    icon: NameIcon,
    inputRefName: "name",
    type: "text",
    onChange: () => {},
  },
  {
    label: "auth.register.inputs.email.label",
    placeholder: "auth.register.inputs.email.placeholder",
    icon: MailIcon,
    inputRefName: "email",
    type: "email",
    onChange: () => {},
  },
  {
    label: "auth.register.inputs.phone.label",
    placeholder: "auth.register.inputs.phone.placeholder",
    icon: PhoneIcon,
    inputRefName: "phone",
    type: "text",
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
    },
  },
  {
    label: "auth.register.inputs.password.label",
    placeholder: "auth.register.inputs.password.placeholder",
    icon: PasswordIcon,
    inputRefName: "password",
    type: "password",
    onChange: () => {},
  },
  {
    label: "auth.register.inputs.re__password.label",
    placeholder: "auth.register.inputs.re__password.placeholder",
    icon: PasswordIcon,
    inputRefName: "confirm__password",
    type: "password",
    onChange: () => {},
  },
  {
    label: "auth.register.inputs.fin__code.label",
    placeholder: "auth.register.inputs.fin__code.placeholder",
    icon: ArchiveIcon,
    inputRefName: "code",
    type: "text",
    onChange: () => {},
  },
];
