/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { ProfileAnalytics } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ProfileAnalyticsUpdateForm(props) {
  const {
    id: idProp,
    profileAnalytics: profileAnalyticsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    profileViews: [],
    hoursSpentVolunteering: "",
  };
  const [profileViews, setProfileViews] = React.useState(
    initialValues.profileViews
  );
  const [hoursSpentVolunteering, setHoursSpentVolunteering] = React.useState(
    initialValues.hoursSpentVolunteering
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = profileAnalyticsRecord
      ? { ...initialValues, ...profileAnalyticsRecord }
      : initialValues;
    setProfileViews(cleanValues.profileViews ?? []);
    setCurrentProfileViewsValue("");
    setHoursSpentVolunteering(cleanValues.hoursSpentVolunteering);
    setErrors({});
  };
  const [profileAnalyticsRecord, setProfileAnalyticsRecord] = React.useState(
    profileAnalyticsModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(ProfileAnalytics, idProp)
        : profileAnalyticsModelProp;
      setProfileAnalyticsRecord(record);
    };
    queryData();
  }, [idProp, profileAnalyticsModelProp]);
  React.useEffect(resetStateValues, [profileAnalyticsRecord]);
  const [currentProfileViewsValue, setCurrentProfileViewsValue] =
    React.useState("");
  const profileViewsRef = React.createRef();
  const validations = {
    profileViews: [],
    hoursSpentVolunteering: [],
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
          profileViews,
          hoursSpentVolunteering,
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
          await DataStore.save(
            ProfileAnalytics.copyOf(profileAnalyticsRecord, (updated) => {
              Object.assign(updated, modelFields);
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
      {...getOverrideProps(overrides, "ProfileAnalyticsUpdateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              profileViews: values,
              hoursSpentVolunteering,
            };
            const result = onChange(modelFields);
            values = result?.profileViews ?? values;
          }
          setProfileViews(values);
          setCurrentProfileViewsValue("");
        }}
        currentFieldValue={currentProfileViewsValue}
        label={"Profile views"}
        items={profileViews}
        hasError={errors?.profileViews?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("profileViews", currentProfileViewsValue)
        }
        errorMessage={errors?.profileViews?.errorMessage}
        setFieldValue={setCurrentProfileViewsValue}
        inputFieldRef={profileViewsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Profile views"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentProfileViewsValue}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.profileViews?.hasError) {
              runValidationTasks("profileViews", value);
            }
            setCurrentProfileViewsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("profileViews", currentProfileViewsValue)
          }
          errorMessage={errors.profileViews?.errorMessage}
          hasError={errors.profileViews?.hasError}
          ref={profileViewsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "profileViews")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Hours spent volunteering"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={hoursSpentVolunteering}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              profileViews,
              hoursSpentVolunteering: value,
            };
            const result = onChange(modelFields);
            value = result?.hoursSpentVolunteering ?? value;
          }
          if (errors.hoursSpentVolunteering?.hasError) {
            runValidationTasks("hoursSpentVolunteering", value);
          }
          setHoursSpentVolunteering(value);
        }}
        onBlur={() =>
          runValidationTasks("hoursSpentVolunteering", hoursSpentVolunteering)
        }
        errorMessage={errors.hoursSpentVolunteering?.errorMessage}
        hasError={errors.hoursSpentVolunteering?.hasError}
        {...getOverrideProps(overrides, "hoursSpentVolunteering")}
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
          isDisabled={!(idProp || profileAnalyticsModelProp)}
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
              !(idProp || profileAnalyticsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
