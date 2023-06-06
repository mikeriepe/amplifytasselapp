/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Profile } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ProfileCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    email: "",
    about: "",
    location: "",
    picture: "",
    firstName: "",
    lastName: "",
    status: undefined,
    graduationYear: "",
    active: false,
    isAdmin: false,
    isApproved: false,
    schoolEmail: "",
    infoRequest: "",
    infoResponse: "",
    banner: "",
    points: "",
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [about, setAbout] = React.useState(initialValues.about);
  const [location, setLocation] = React.useState(initialValues.location);
  const [picture, setPicture] = React.useState(initialValues.picture);
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [status, setStatus] = React.useState(initialValues.status);
  const [graduationYear, setGraduationYear] = React.useState(
    initialValues.graduationYear
  );
  const [active, setActive] = React.useState(initialValues.active);
  const [isAdmin, setIsAdmin] = React.useState(initialValues.isAdmin);
  const [isApproved, setIsApproved] = React.useState(initialValues.isApproved);
  const [schoolEmail, setSchoolEmail] = React.useState(
    initialValues.schoolEmail
  );
  const [infoRequest, setInfoRequest] = React.useState(
    initialValues.infoRequest
  );
  const [infoResponse, setInfoResponse] = React.useState(
    initialValues.infoResponse
  );
  const [banner, setBanner] = React.useState(initialValues.banner);
  const [points, setPoints] = React.useState(initialValues.points);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmail(initialValues.email);
    setAbout(initialValues.about);
    setLocation(initialValues.location);
    setPicture(initialValues.picture);
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setStatus(initialValues.status);
    setGraduationYear(initialValues.graduationYear);
    setActive(initialValues.active);
    setIsAdmin(initialValues.isAdmin);
    setIsApproved(initialValues.isApproved);
    setSchoolEmail(initialValues.schoolEmail);
    setInfoRequest(initialValues.infoRequest);
    setInfoResponse(initialValues.infoResponse);
    setBanner(initialValues.banner);
    setPoints(initialValues.points);
    setErrors({});
  };
  const validations = {
    email: [{ type: "Required" }, { type: "Email" }],
    about: [],
    location: [],
    picture: [],
    firstName: [],
    lastName: [],
    status: [],
    graduationYear: [],
    active: [],
    isAdmin: [],
    isApproved: [],
    schoolEmail: [],
    infoRequest: [],
    infoResponse: [],
    banner: [],
    points: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          email,
          about,
          location,
          picture,
          firstName,
          lastName,
          status,
          graduationYear,
          active,
          isAdmin,
          isApproved,
          schoolEmail,
          infoRequest,
          infoResponse,
          banner,
          points,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Profile(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProfileCreateForm")}
      {...rest}
    >
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email: value,
              about,
              location,
              picture,
              firstName,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="About"
        isRequired={false}
        isReadOnly={false}
        value={about}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              about: value,
              location,
              picture,
              firstName,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.about ?? value;
          }
          if (errors.about?.hasError) {
            runValidationTasks("about", value);
          }
          setAbout(value);
        }}
        onBlur={() => runValidationTasks("about", about)}
        errorMessage={errors.about?.errorMessage}
        hasError={errors.about?.hasError}
        {...getOverrideProps(overrides, "about")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location: value,
              picture,
              firstName,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Picture"
        isRequired={false}
        isReadOnly={false}
        value={picture}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture: value,
              firstName,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.picture ?? value;
          }
          if (errors.picture?.hasError) {
            runValidationTasks("picture", value);
          }
          setPicture(value);
        }}
        onBlur={() => runValidationTasks("picture", picture)}
        errorMessage={errors.picture?.errorMessage}
        hasError={errors.picture?.hasError}
        {...getOverrideProps(overrides, "picture")}
      ></TextField>
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName: value,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName,
              lastName: value,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName,
              lastName,
              status: value,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      >
        <option
          children="Pending"
          value="PENDING"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Requested"
          value="REQUESTED"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Updated"
          value="UPDATED"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
        <option
          children="Approved"
          value="APPROVED"
          {...getOverrideProps(overrides, "statusoption3")}
        ></option>
        <option
          children="Denied"
          value="DENIED"
          {...getOverrideProps(overrides, "statusoption4")}
        ></option>
        <option
          children="Admin"
          value="ADMIN"
          {...getOverrideProps(overrides, "statusoption5")}
        ></option>
      </SelectField>
      <TextField
        label="Graduation year"
        isRequired={false}
        isReadOnly={false}
        value={graduationYear}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName,
              lastName,
              status,
              graduationYear: value,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.graduationYear ?? value;
          }
          if (errors.graduationYear?.hasError) {
            runValidationTasks("graduationYear", value);
          }
          setGraduationYear(value);
        }}
        onBlur={() => runValidationTasks("graduationYear", graduationYear)}
        errorMessage={errors.graduationYear?.errorMessage}
        hasError={errors.graduationYear?.hasError}
        {...getOverrideProps(overrides, "graduationYear")}
      ></TextField>
      <SwitchField
        label="Active"
        defaultChecked={false}
        isDisabled={false}
        isChecked={active}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName,
              lastName,
              status,
              graduationYear,
              active: value,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.active ?? value;
          }
          if (errors.active?.hasError) {
            runValidationTasks("active", value);
          }
          setActive(value);
        }}
        onBlur={() => runValidationTasks("active", active)}
        errorMessage={errors.active?.errorMessage}
        hasError={errors.active?.hasError}
        {...getOverrideProps(overrides, "active")}
      ></SwitchField>
      <SwitchField
        label="Is admin"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isAdmin}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin: value,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.isAdmin ?? value;
          }
          if (errors.isAdmin?.hasError) {
            runValidationTasks("isAdmin", value);
          }
          setIsAdmin(value);
        }}
        onBlur={() => runValidationTasks("isAdmin", isAdmin)}
        errorMessage={errors.isAdmin?.errorMessage}
        hasError={errors.isAdmin?.hasError}
        {...getOverrideProps(overrides, "isAdmin")}
      ></SwitchField>
      <SwitchField
        label="Is approved"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isApproved}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved: value,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.isApproved ?? value;
          }
          if (errors.isApproved?.hasError) {
            runValidationTasks("isApproved", value);
          }
          setIsApproved(value);
        }}
        onBlur={() => runValidationTasks("isApproved", isApproved)}
        errorMessage={errors.isApproved?.errorMessage}
        hasError={errors.isApproved?.hasError}
        {...getOverrideProps(overrides, "isApproved")}
      ></SwitchField>
      <TextField
        label="School email"
        isRequired={false}
        isReadOnly={false}
        value={schoolEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail: value,
              infoRequest,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.schoolEmail ?? value;
          }
          if (errors.schoolEmail?.hasError) {
            runValidationTasks("schoolEmail", value);
          }
          setSchoolEmail(value);
        }}
        onBlur={() => runValidationTasks("schoolEmail", schoolEmail)}
        errorMessage={errors.schoolEmail?.errorMessage}
        hasError={errors.schoolEmail?.hasError}
        {...getOverrideProps(overrides, "schoolEmail")}
      ></TextField>
      <TextField
        label="Info request"
        isRequired={false}
        isReadOnly={false}
        value={infoRequest}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest: value,
              infoResponse,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.infoRequest ?? value;
          }
          if (errors.infoRequest?.hasError) {
            runValidationTasks("infoRequest", value);
          }
          setInfoRequest(value);
        }}
        onBlur={() => runValidationTasks("infoRequest", infoRequest)}
        errorMessage={errors.infoRequest?.errorMessage}
        hasError={errors.infoRequest?.hasError}
        {...getOverrideProps(overrides, "infoRequest")}
      ></TextField>
      <TextField
        label="Info response"
        isRequired={false}
        isReadOnly={false}
        value={infoResponse}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse: value,
              banner,
              points,
            };
            const result = onChange(modelFields);
            value = result?.infoResponse ?? value;
          }
          if (errors.infoResponse?.hasError) {
            runValidationTasks("infoResponse", value);
          }
          setInfoResponse(value);
        }}
        onBlur={() => runValidationTasks("infoResponse", infoResponse)}
        errorMessage={errors.infoResponse?.errorMessage}
        hasError={errors.infoResponse?.hasError}
        {...getOverrideProps(overrides, "infoResponse")}
      ></TextField>
      <TextField
        label="Banner"
        isRequired={false}
        isReadOnly={false}
        value={banner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner: value,
              points,
            };
            const result = onChange(modelFields);
            value = result?.banner ?? value;
          }
          if (errors.banner?.hasError) {
            runValidationTasks("banner", value);
          }
          setBanner(value);
        }}
        onBlur={() => runValidationTasks("banner", banner)}
        errorMessage={errors.banner?.errorMessage}
        hasError={errors.banner?.hasError}
        {...getOverrideProps(overrides, "banner")}
      ></TextField>
      <TextField
        label="Points"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={points}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              email,
              about,
              location,
              picture,
              firstName,
              lastName,
              status,
              graduationYear,
              active,
              isAdmin,
              isApproved,
              schoolEmail,
              infoRequest,
              infoResponse,
              banner,
              points: value,
            };
            const result = onChange(modelFields);
            value = result?.points ?? value;
          }
          if (errors.points?.hasError) {
            runValidationTasks("points", value);
          }
          setPoints(value);
        }}
        onBlur={() => runValidationTasks("points", points)}
        errorMessage={errors.points?.errorMessage}
        hasError={errors.points?.hasError}
        {...getOverrideProps(overrides, "points")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
