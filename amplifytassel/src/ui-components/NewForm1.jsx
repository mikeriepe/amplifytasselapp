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
  TextField,
} from "@aws-amplify/ui-react";
import { Profile } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function NewForm1(props) {
  const {
    id: idProp,
    profile: profileModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    about: "",
    location: "",
    graduationYear: "",
    Field0: "",
    banner: "",
    points: "",
    linkedin: "",
    dateOfBirth: "",
    collegeAffiliation: "",
    pronouns: "",
    username: "",
  };
  const [about, setAbout] = React.useState(initialValues.about);
  const [location, setLocation] = React.useState(initialValues.location);
  const [graduationYear, setGraduationYear] = React.useState(
    initialValues.graduationYear
  );
  const [Field0, setField0] = React.useState(initialValues.Field0);
  const [banner, setBanner] = React.useState(initialValues.banner);
  const [points, setPoints] = React.useState(initialValues.points);
  const [linkedin, setLinkedin] = React.useState(initialValues.linkedin);
  const [dateOfBirth, setDateOfBirth] = React.useState(
    initialValues.dateOfBirth
  );
  const [collegeAffiliation, setCollegeAffiliation] = React.useState(
    initialValues.collegeAffiliation
  );
  const [pronouns, setPronouns] = React.useState(initialValues.pronouns);
  const [username, setUsername] = React.useState(initialValues.username);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = profileRecord
      ? { ...initialValues, ...profileRecord }
      : initialValues;
    setAbout(cleanValues.about);
    setLocation(cleanValues.location);
    setGraduationYear(cleanValues.graduationYear);
    setField0(cleanValues.Field0);
    setBanner(cleanValues.banner);
    setPoints(cleanValues.points);
    setLinkedin(cleanValues.linkedin);
    setDateOfBirth(cleanValues.dateOfBirth);
    setCollegeAffiliation(cleanValues.collegeAffiliation);
    setPronouns(cleanValues.pronouns);
    setUsername(cleanValues.username);
    setErrors({});
  };
  const [profileRecord, setProfileRecord] = React.useState(profileModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Profile, idProp)
        : profileModelProp;
      setProfileRecord(record);
    };
    queryData();
  }, [idProp, profileModelProp]);
  React.useEffect(resetStateValues, [profileRecord]);
  const validations = {
    about: [],
    location: [],
    graduationYear: [],
    Field0: [],
    banner: [],
    points: [],
    linkedin: [{ type: "URL" }],
    dateOfBirth: [],
    collegeAffiliation: [],
    pronouns: [],
    username: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
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
          about,
          location,
          graduationYear,
          Field0,
          banner,
          points,
          linkedin,
          dateOfBirth,
          collegeAffiliation,
          pronouns,
          username,
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
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const modelFieldsToSave = {
            about: modelFields.about,
            location: modelFields.location,
            graduationYear: modelFields.graduationYear,
            banner: modelFields.banner,
            points: modelFields.points,
            linkedin: modelFields.linkedin,
            dateOfBirth: modelFields.dateOfBirth,
            collegeAffiliation: modelFields.collegeAffiliation,
            pronouns: modelFields.pronouns,
            username: modelFields.username,
          };
          await DataStore.save(
            Profile.copyOf(profileRecord, (updated) => {
              Object.assign(updated, modelFieldsToSave);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "NewForm1")}
      {...rest}
    >
      <TextField
        label="About"
        isRequired={false}
        isReadOnly={false}
        value={about}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              about: value,
              location,
              graduationYear,
              Field0,
              banner,
              points,
              linkedin,
              dateOfBirth,
              collegeAffiliation,
              pronouns,
              username,
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
              about,
              location: value,
              graduationYear,
              Field0,
              banner,
              points,
              linkedin,
              dateOfBirth,
              collegeAffiliation,
              pronouns,
              username,
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
        label="Graduation year"
        isRequired={false}
        isReadOnly={false}
        value={graduationYear}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              about,
              location,
              graduationYear: value,
              Field0,
              banner,
              points,
              linkedin,
              dateOfBirth,
              collegeAffiliation,
              pronouns,
              username,
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
      <SelectField
        label="Major"
        placeholder="Please select an option"
        value={Field0}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              about,
              location,
              graduationYear,
              Field0: value,
              banner,
              points,
              linkedin,
              dateOfBirth,
              collegeAffiliation,
              pronouns,
              username,
            };
            const result = onChange(modelFields);
            value = result?.Field0 ?? value;
          }
          if (errors.Field0?.hasError) {
            runValidationTasks("Field0", value);
          }
          setField0(value);
        }}
        onBlur={() => runValidationTasks("Field0", Field0)}
        errorMessage={errors.Field0?.errorMessage}
        hasError={errors.Field0?.hasError}
        {...getOverrideProps(overrides, "Field0")}
      >
        <option
          children="Computer Science, B.S."
          value="Computer Science, B.S."
          {...getOverrideProps(overrides, "Field0option0")}
        ></option>
        <option
          children="Basket Weaving, B.A."
          value="Basket Weaving, B.A."
          {...getOverrideProps(overrides, "Field0option1")}
        ></option>
        <option
          children="Writing, B.A."
          value="Writing, B.A."
          {...getOverrideProps(overrides, "Field0option2")}
        ></option>
      </SelectField>
      <TextField
        label="Banner"
        isRequired={false}
        isReadOnly={false}
        value={banner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              about,
              location,
              graduationYear,
              Field0,
              banner: value,
              points,
              linkedin,
              dateOfBirth,
              collegeAffiliation,
              pronouns,
              username,
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
              about,
              location,
              graduationYear,
              Field0,
              banner,
              points: value,
              linkedin,
              dateOfBirth,
              collegeAffiliation,
              pronouns,
              username,
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
      <TextField
        label="Linkedin"
        isRequired={false}
        isReadOnly={false}
        value={linkedin}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              about,
              location,
              graduationYear,
              Field0,
              banner,
              points,
              linkedin: value,
              dateOfBirth,
              collegeAffiliation,
              pronouns,
              username,
            };
            const result = onChange(modelFields);
            value = result?.linkedin ?? value;
          }
          if (errors.linkedin?.hasError) {
            runValidationTasks("linkedin", value);
          }
          setLinkedin(value);
        }}
        onBlur={() => runValidationTasks("linkedin", linkedin)}
        errorMessage={errors.linkedin?.errorMessage}
        hasError={errors.linkedin?.hasError}
        {...getOverrideProps(overrides, "linkedin")}
      ></TextField>
      <TextField
        label="Date of birth"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              about,
              location,
              graduationYear,
              Field0,
              banner,
              points,
              linkedin,
              dateOfBirth: value,
              collegeAffiliation,
              pronouns,
              username,
            };
            const result = onChange(modelFields);
            value = result?.dateOfBirth ?? value;
          }
          if (errors.dateOfBirth?.hasError) {
            runValidationTasks("dateOfBirth", value);
          }
          setDateOfBirth(value);
        }}
        onBlur={() => runValidationTasks("dateOfBirth", dateOfBirth)}
        errorMessage={errors.dateOfBirth?.errorMessage}
        hasError={errors.dateOfBirth?.hasError}
        {...getOverrideProps(overrides, "dateOfBirth")}
      ></TextField>
      <TextField
        label="College affiliation"
        isRequired={false}
        isReadOnly={false}
        value={collegeAffiliation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              about,
              location,
              graduationYear,
              Field0,
              banner,
              points,
              linkedin,
              dateOfBirth,
              collegeAffiliation: value,
              pronouns,
              username,
            };
            const result = onChange(modelFields);
            value = result?.collegeAffiliation ?? value;
          }
          if (errors.collegeAffiliation?.hasError) {
            runValidationTasks("collegeAffiliation", value);
          }
          setCollegeAffiliation(value);
        }}
        onBlur={() =>
          runValidationTasks("collegeAffiliation", collegeAffiliation)
        }
        errorMessage={errors.collegeAffiliation?.errorMessage}
        hasError={errors.collegeAffiliation?.hasError}
        {...getOverrideProps(overrides, "collegeAffiliation")}
      ></TextField>
      <TextField
        label="Pronouns"
        isRequired={false}
        isReadOnly={false}
        value={pronouns}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              about,
              location,
              graduationYear,
              Field0,
              banner,
              points,
              linkedin,
              dateOfBirth,
              collegeAffiliation,
              pronouns: value,
              username,
            };
            const result = onChange(modelFields);
            value = result?.pronouns ?? value;
          }
          if (errors.pronouns?.hasError) {
            runValidationTasks("pronouns", value);
          }
          setPronouns(value);
        }}
        onBlur={() => runValidationTasks("pronouns", pronouns)}
        errorMessage={errors.pronouns?.errorMessage}
        hasError={errors.pronouns?.hasError}
        {...getOverrideProps(overrides, "pronouns")}
      ></TextField>
      <TextField
        label="Username"
        isRequired={false}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              about,
              location,
              graduationYear,
              Field0,
              banner,
              points,
              linkedin,
              dateOfBirth,
              collegeAffiliation,
              pronouns,
              username: value,
            };
            const result = onChange(modelFields);
            value = result?.username ?? value;
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || profileModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || profileModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
