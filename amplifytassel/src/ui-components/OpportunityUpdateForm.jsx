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
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Opportunity } from "../models";
import { fetchByPath, validateField } from "./utils";
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
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function OpportunityUpdateForm(props) {
  const {
    id: idProp,
    opportunity: opportunityModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    zoomLink: "",
    organizations: [],
    description: "",
    isApproved: false,
    eventBanner: "",
    eventName: "",
    startTime: "",
    endTime: "",
    locationType: "",
    eventData: "",
    subject: "",
    preferences: [],
  };
  const [zoomLink, setZoomLink] = React.useState(initialValues.zoomLink);
  const [organizations, setOrganizations] = React.useState(
    initialValues.organizations
  );
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [isApproved, setIsApproved] = React.useState(initialValues.isApproved);
  const [eventBanner, setEventBanner] = React.useState(
    initialValues.eventBanner
  );
  const [eventName, setEventName] = React.useState(initialValues.eventName);
  const [startTime, setStartTime] = React.useState(initialValues.startTime);
  const [endTime, setEndTime] = React.useState(initialValues.endTime);
  const [locationType, setLocationType] = React.useState(
    initialValues.locationType
  );
  const [eventData, setEventData] = React.useState(initialValues.eventData);
  const [subject, setSubject] = React.useState(initialValues.subject);
  const [preferences, setPreferences] = React.useState(
    initialValues.preferences
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = opportunityRecord
      ? { ...initialValues, ...opportunityRecord }
      : initialValues;
    setZoomLink(cleanValues.zoomLink);
    setOrganizations(cleanValues.organizations ?? []);
    setCurrentOrganizationsValue("");
    setDescription(cleanValues.description);
    setIsApproved(cleanValues.isApproved);
    setEventBanner(cleanValues.eventBanner);
    setEventName(cleanValues.eventName);
    setStartTime(cleanValues.startTime);
    setEndTime(cleanValues.endTime);
    setLocationType(cleanValues.locationType);
    setEventData(cleanValues.eventData);
    setSubject(cleanValues.subject);
    setPreferences(cleanValues.preferences ?? []);
    setCurrentPreferencesValue("");
    setErrors({});
  };
  const [opportunityRecord, setOpportunityRecord] =
    React.useState(opportunityModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Opportunity, idProp)
        : opportunityModelProp;
      setOpportunityRecord(record);
    };
    queryData();
  }, [idProp, opportunityModelProp]);
  React.useEffect(resetStateValues, [opportunityRecord]);
  const [currentOrganizationsValue, setCurrentOrganizationsValue] =
    React.useState("");
  const organizationsRef = React.createRef();
  const [currentPreferencesValue, setCurrentPreferencesValue] =
    React.useState("");
  const preferencesRef = React.createRef();
  const validations = {
    zoomLink: [],
    organizations: [],
    description: [],
    isApproved: [],
    eventBanner: [{ type: "URL" }],
    eventName: [],
    startTime: [],
    endTime: [],
    locationType: [],
    eventData: [],
    subject: [],
    preferences: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          zoomLink,
          organizations,
          description,
          isApproved,
          eventBanner,
          eventName,
          startTime,
          endTime,
          locationType,
          eventData,
          subject,
          preferences,
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
          await DataStore.save(
            Opportunity.copyOf(opportunityRecord, (updated) => {
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
      {...getOverrideProps(overrides, "OpportunityUpdateForm")}
      {...rest}
    >
      <TextField
        label="Zoom link"
        isRequired={false}
        isReadOnly={false}
        value={zoomLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              zoomLink: value,
              organizations,
              description,
              isApproved,
              eventBanner,
              eventName,
              startTime,
              endTime,
              locationType,
              eventData,
              subject,
              preferences,
            };
            const result = onChange(modelFields);
            value = result?.zoomLink ?? value;
          }
          if (errors.zoomLink?.hasError) {
            runValidationTasks("zoomLink", value);
          }
          setZoomLink(value);
        }}
        onBlur={() => runValidationTasks("zoomLink", zoomLink)}
        errorMessage={errors.zoomLink?.errorMessage}
        hasError={errors.zoomLink?.hasError}
        {...getOverrideProps(overrides, "zoomLink")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              zoomLink,
              organizations: values,
              description,
              isApproved,
              eventBanner,
              eventName,
              startTime,
              endTime,
              locationType,
              eventData,
              subject,
              preferences,
            };
            const result = onChange(modelFields);
            values = result?.organizations ?? values;
          }
          setOrganizations(values);
          setCurrentOrganizationsValue("");
        }}
        currentFieldValue={currentOrganizationsValue}
        label={"Organizations"}
        items={organizations}
        hasError={errors?.organizations?.hasError}
        errorMessage={errors?.organizations?.errorMessage}
        setFieldValue={setCurrentOrganizationsValue}
        inputFieldRef={organizationsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Organizations"
          isRequired={false}
          isReadOnly={false}
          value={currentOrganizationsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.organizations?.hasError) {
              runValidationTasks("organizations", value);
            }
            setCurrentOrganizationsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("organizations", currentOrganizationsValue)
          }
          errorMessage={errors.organizations?.errorMessage}
          hasError={errors.organizations?.hasError}
          ref={organizationsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "organizations")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              zoomLink,
              organizations,
              description: value,
              isApproved,
              eventBanner,
              eventName,
              startTime,
              endTime,
              locationType,
              eventData,
              subject,
              preferences,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <SwitchField
        label="Is approved"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isApproved}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              zoomLink,
              organizations,
              description,
              isApproved: value,
              eventBanner,
              eventName,
              startTime,
              endTime,
              locationType,
              eventData,
              subject,
              preferences,
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
        label="Event banner"
        isRequired={false}
        isReadOnly={false}
        value={eventBanner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              zoomLink,
              organizations,
              description,
              isApproved,
              eventBanner: value,
              eventName,
              startTime,
              endTime,
              locationType,
              eventData,
              subject,
              preferences,
            };
            const result = onChange(modelFields);
            value = result?.eventBanner ?? value;
          }
          if (errors.eventBanner?.hasError) {
            runValidationTasks("eventBanner", value);
          }
          setEventBanner(value);
        }}
        onBlur={() => runValidationTasks("eventBanner", eventBanner)}
        errorMessage={errors.eventBanner?.errorMessage}
        hasError={errors.eventBanner?.hasError}
        {...getOverrideProps(overrides, "eventBanner")}
      ></TextField>
      <TextField
        label="Event name"
        isRequired={false}
        isReadOnly={false}
        value={eventName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              zoomLink,
              organizations,
              description,
              isApproved,
              eventBanner,
              eventName: value,
              startTime,
              endTime,
              locationType,
              eventData,
              subject,
              preferences,
            };
            const result = onChange(modelFields);
            value = result?.eventName ?? value;
          }
          if (errors.eventName?.hasError) {
            runValidationTasks("eventName", value);
          }
          setEventName(value);
        }}
        onBlur={() => runValidationTasks("eventName", eventName)}
        errorMessage={errors.eventName?.errorMessage}
        hasError={errors.eventName?.hasError}
        {...getOverrideProps(overrides, "eventName")}
      ></TextField>
      <TextField
        label="Start time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={startTime && convertToLocal(new Date(startTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              zoomLink,
              organizations,
              description,
              isApproved,
              eventBanner,
              eventName,
              startTime: value,
              endTime,
              locationType,
              eventData,
              subject,
              preferences,
            };
            const result = onChange(modelFields);
            value = result?.startTime ?? value;
          }
          if (errors.startTime?.hasError) {
            runValidationTasks("startTime", value);
          }
          setStartTime(value);
        }}
        onBlur={() => runValidationTasks("startTime", startTime)}
        errorMessage={errors.startTime?.errorMessage}
        hasError={errors.startTime?.hasError}
        {...getOverrideProps(overrides, "startTime")}
      ></TextField>
      <TextField
        label="End time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={endTime && convertToLocal(new Date(endTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              zoomLink,
              organizations,
              description,
              isApproved,
              eventBanner,
              eventName,
              startTime,
              endTime: value,
              locationType,
              eventData,
              subject,
              preferences,
            };
            const result = onChange(modelFields);
            value = result?.endTime ?? value;
          }
          if (errors.endTime?.hasError) {
            runValidationTasks("endTime", value);
          }
          setEndTime(value);
        }}
        onBlur={() => runValidationTasks("endTime", endTime)}
        errorMessage={errors.endTime?.errorMessage}
        hasError={errors.endTime?.hasError}
        {...getOverrideProps(overrides, "endTime")}
      ></TextField>
      <TextField
        label="Location type"
        isRequired={false}
        isReadOnly={false}
        value={locationType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              zoomLink,
              organizations,
              description,
              isApproved,
              eventBanner,
              eventName,
              startTime,
              endTime,
              locationType: value,
              eventData,
              subject,
              preferences,
            };
            const result = onChange(modelFields);
            value = result?.locationType ?? value;
          }
          if (errors.locationType?.hasError) {
            runValidationTasks("locationType", value);
          }
          setLocationType(value);
        }}
        onBlur={() => runValidationTasks("locationType", locationType)}
        errorMessage={errors.locationType?.errorMessage}
        hasError={errors.locationType?.hasError}
        {...getOverrideProps(overrides, "locationType")}
      ></TextField>
      <TextField
        label="Event data"
        isRequired={false}
        isReadOnly={false}
        value={eventData}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              zoomLink,
              organizations,
              description,
              isApproved,
              eventBanner,
              eventName,
              startTime,
              endTime,
              locationType,
              eventData: value,
              subject,
              preferences,
            };
            const result = onChange(modelFields);
            value = result?.eventData ?? value;
          }
          if (errors.eventData?.hasError) {
            runValidationTasks("eventData", value);
          }
          setEventData(value);
        }}
        onBlur={() => runValidationTasks("eventData", eventData)}
        errorMessage={errors.eventData?.errorMessage}
        hasError={errors.eventData?.hasError}
        {...getOverrideProps(overrides, "eventData")}
      ></TextField>
      <TextField
        label="Subject"
        isRequired={false}
        isReadOnly={false}
        value={subject}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              zoomLink,
              organizations,
              description,
              isApproved,
              eventBanner,
              eventName,
              startTime,
              endTime,
              locationType,
              eventData,
              subject: value,
              preferences,
            };
            const result = onChange(modelFields);
            value = result?.subject ?? value;
          }
          if (errors.subject?.hasError) {
            runValidationTasks("subject", value);
          }
          setSubject(value);
        }}
        onBlur={() => runValidationTasks("subject", subject)}
        errorMessage={errors.subject?.errorMessage}
        hasError={errors.subject?.hasError}
        {...getOverrideProps(overrides, "subject")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              zoomLink,
              organizations,
              description,
              isApproved,
              eventBanner,
              eventName,
              startTime,
              endTime,
              locationType,
              eventData,
              subject,
              preferences: values,
            };
            const result = onChange(modelFields);
            values = result?.preferences ?? values;
          }
          setPreferences(values);
          setCurrentPreferencesValue("");
        }}
        currentFieldValue={currentPreferencesValue}
        label={"Preferences"}
        items={preferences}
        hasError={errors?.preferences?.hasError}
        errorMessage={errors?.preferences?.errorMessage}
        setFieldValue={setCurrentPreferencesValue}
        inputFieldRef={preferencesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Preferences"
          isRequired={false}
          isReadOnly={false}
          value={currentPreferencesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.preferences?.hasError) {
              runValidationTasks("preferences", value);
            }
            setCurrentPreferencesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("preferences", currentPreferencesValue)
          }
          errorMessage={errors.preferences?.errorMessage}
          hasError={errors.preferences?.hasError}
          ref={preferencesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "preferences")}
        ></TextField>
      </ArrayField>
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
          isDisabled={!(idProp || opportunityModelProp)}
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
              !(idProp || opportunityModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
