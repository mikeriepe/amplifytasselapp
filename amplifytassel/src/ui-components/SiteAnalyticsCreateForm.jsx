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
import { SiteAnalytics } from "../models";
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
export default function SiteAnalyticsCreateForm(props) {
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
    monthlySignups: [],
    dailySignups: [],
    MonthlyPopularEvents: [],
    MonthlyPopularTags: [],
    monthlyUserTasselTime: "",
    monthlyUserVolunteerTime: "",
    monthlyUserApps: "",
    monthlyNoShows: "",
  };
  const [monthlySignups, setMonthlySignups] = React.useState(
    initialValues.monthlySignups
  );
  const [dailySignups, setDailySignups] = React.useState(
    initialValues.dailySignups
  );
  const [MonthlyPopularEvents, setMonthlyPopularEvents] = React.useState(
    initialValues.MonthlyPopularEvents
  );
  const [MonthlyPopularTags, setMonthlyPopularTags] = React.useState(
    initialValues.MonthlyPopularTags
  );
  const [monthlyUserTasselTime, setMonthlyUserTasselTime] = React.useState(
    initialValues.monthlyUserTasselTime
  );
  const [monthlyUserVolunteerTime, setMonthlyUserVolunteerTime] =
    React.useState(initialValues.monthlyUserVolunteerTime);
  const [monthlyUserApps, setMonthlyUserApps] = React.useState(
    initialValues.monthlyUserApps
  );
  const [monthlyNoShows, setMonthlyNoShows] = React.useState(
    initialValues.monthlyNoShows
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMonthlySignups(initialValues.monthlySignups);
    setCurrentMonthlySignupsValue("");
    setDailySignups(initialValues.dailySignups);
    setCurrentDailySignupsValue("");
    setMonthlyPopularEvents(initialValues.MonthlyPopularEvents);
    setCurrentMonthlyPopularEventsValue("");
    setMonthlyPopularTags(initialValues.MonthlyPopularTags);
    setCurrentMonthlyPopularTagsValue("");
    setMonthlyUserTasselTime(initialValues.monthlyUserTasselTime);
    setMonthlyUserVolunteerTime(initialValues.monthlyUserVolunteerTime);
    setMonthlyUserApps(initialValues.monthlyUserApps);
    setMonthlyNoShows(initialValues.monthlyNoShows);
    setErrors({});
  };
  const [currentMonthlySignupsValue, setCurrentMonthlySignupsValue] =
    React.useState("");
  const monthlySignupsRef = React.createRef();
  const [currentDailySignupsValue, setCurrentDailySignupsValue] =
    React.useState("");
  const dailySignupsRef = React.createRef();
  const [
    currentMonthlyPopularEventsValue,
    setCurrentMonthlyPopularEventsValue,
  ] = React.useState("");
  const MonthlyPopularEventsRef = React.createRef();
  const [currentMonthlyPopularTagsValue, setCurrentMonthlyPopularTagsValue] =
    React.useState("");
  const MonthlyPopularTagsRef = React.createRef();
  const validations = {
    monthlySignups: [],
    dailySignups: [],
    MonthlyPopularEvents: [],
    MonthlyPopularTags: [],
    monthlyUserTasselTime: [],
    monthlyUserVolunteerTime: [],
    monthlyUserApps: [],
    monthlyNoShows: [],
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
          monthlySignups,
          dailySignups,
          MonthlyPopularEvents,
          MonthlyPopularTags,
          monthlyUserTasselTime,
          monthlyUserVolunteerTime,
          monthlyUserApps,
          monthlyNoShows,
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
          await DataStore.save(new SiteAnalytics(modelFields));
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
      {...getOverrideProps(overrides, "SiteAnalyticsCreateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              monthlySignups: values,
              dailySignups,
              MonthlyPopularEvents,
              MonthlyPopularTags,
              monthlyUserTasselTime,
              monthlyUserVolunteerTime,
              monthlyUserApps,
              monthlyNoShows,
            };
            const result = onChange(modelFields);
            values = result?.monthlySignups ?? values;
          }
          setMonthlySignups(values);
          setCurrentMonthlySignupsValue("");
        }}
        currentFieldValue={currentMonthlySignupsValue}
        label={"Monthly signups"}
        items={monthlySignups}
        hasError={errors?.monthlySignups?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("monthlySignups", currentMonthlySignupsValue)
        }
        errorMessage={errors?.monthlySignups?.errorMessage}
        setFieldValue={setCurrentMonthlySignupsValue}
        inputFieldRef={monthlySignupsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Monthly signups"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentMonthlySignupsValue}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.monthlySignups?.hasError) {
              runValidationTasks("monthlySignups", value);
            }
            setCurrentMonthlySignupsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("monthlySignups", currentMonthlySignupsValue)
          }
          errorMessage={errors.monthlySignups?.errorMessage}
          hasError={errors.monthlySignups?.hasError}
          ref={monthlySignupsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "monthlySignups")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              monthlySignups,
              dailySignups: values,
              MonthlyPopularEvents,
              MonthlyPopularTags,
              monthlyUserTasselTime,
              monthlyUserVolunteerTime,
              monthlyUserApps,
              monthlyNoShows,
            };
            const result = onChange(modelFields);
            values = result?.dailySignups ?? values;
          }
          setDailySignups(values);
          setCurrentDailySignupsValue("");
        }}
        currentFieldValue={currentDailySignupsValue}
        label={"Daily signups"}
        items={dailySignups}
        hasError={errors?.dailySignups?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("dailySignups", currentDailySignupsValue)
        }
        errorMessage={errors?.dailySignups?.errorMessage}
        setFieldValue={setCurrentDailySignupsValue}
        inputFieldRef={dailySignupsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Daily signups"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentDailySignupsValue}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.dailySignups?.hasError) {
              runValidationTasks("dailySignups", value);
            }
            setCurrentDailySignupsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("dailySignups", currentDailySignupsValue)
          }
          errorMessage={errors.dailySignups?.errorMessage}
          hasError={errors.dailySignups?.hasError}
          ref={dailySignupsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "dailySignups")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              monthlySignups,
              dailySignups,
              MonthlyPopularEvents: values,
              MonthlyPopularTags,
              monthlyUserTasselTime,
              monthlyUserVolunteerTime,
              monthlyUserApps,
              monthlyNoShows,
            };
            const result = onChange(modelFields);
            values = result?.MonthlyPopularEvents ?? values;
          }
          setMonthlyPopularEvents(values);
          setCurrentMonthlyPopularEventsValue("");
        }}
        currentFieldValue={currentMonthlyPopularEventsValue}
        label={"Monthly popular events"}
        items={MonthlyPopularEvents}
        hasError={errors?.MonthlyPopularEvents?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "MonthlyPopularEvents",
            currentMonthlyPopularEventsValue
          )
        }
        errorMessage={errors?.MonthlyPopularEvents?.errorMessage}
        setFieldValue={setCurrentMonthlyPopularEventsValue}
        inputFieldRef={MonthlyPopularEventsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Monthly popular events"
          isRequired={false}
          isReadOnly={false}
          value={currentMonthlyPopularEventsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.MonthlyPopularEvents?.hasError) {
              runValidationTasks("MonthlyPopularEvents", value);
            }
            setCurrentMonthlyPopularEventsValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "MonthlyPopularEvents",
              currentMonthlyPopularEventsValue
            )
          }
          errorMessage={errors.MonthlyPopularEvents?.errorMessage}
          hasError={errors.MonthlyPopularEvents?.hasError}
          ref={MonthlyPopularEventsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "MonthlyPopularEvents")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              monthlySignups,
              dailySignups,
              MonthlyPopularEvents,
              MonthlyPopularTags: values,
              monthlyUserTasselTime,
              monthlyUserVolunteerTime,
              monthlyUserApps,
              monthlyNoShows,
            };
            const result = onChange(modelFields);
            values = result?.MonthlyPopularTags ?? values;
          }
          setMonthlyPopularTags(values);
          setCurrentMonthlyPopularTagsValue("");
        }}
        currentFieldValue={currentMonthlyPopularTagsValue}
        label={"Monthly popular tags"}
        items={MonthlyPopularTags}
        hasError={errors?.MonthlyPopularTags?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "MonthlyPopularTags",
            currentMonthlyPopularTagsValue
          )
        }
        errorMessage={errors?.MonthlyPopularTags?.errorMessage}
        setFieldValue={setCurrentMonthlyPopularTagsValue}
        inputFieldRef={MonthlyPopularTagsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Monthly popular tags"
          isRequired={false}
          isReadOnly={false}
          value={currentMonthlyPopularTagsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.MonthlyPopularTags?.hasError) {
              runValidationTasks("MonthlyPopularTags", value);
            }
            setCurrentMonthlyPopularTagsValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "MonthlyPopularTags",
              currentMonthlyPopularTagsValue
            )
          }
          errorMessage={errors.MonthlyPopularTags?.errorMessage}
          hasError={errors.MonthlyPopularTags?.hasError}
          ref={MonthlyPopularTagsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "MonthlyPopularTags")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Monthly user tassel time"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={monthlyUserTasselTime}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              monthlySignups,
              dailySignups,
              MonthlyPopularEvents,
              MonthlyPopularTags,
              monthlyUserTasselTime: value,
              monthlyUserVolunteerTime,
              monthlyUserApps,
              monthlyNoShows,
            };
            const result = onChange(modelFields);
            value = result?.monthlyUserTasselTime ?? value;
          }
          if (errors.monthlyUserTasselTime?.hasError) {
            runValidationTasks("monthlyUserTasselTime", value);
          }
          setMonthlyUserTasselTime(value);
        }}
        onBlur={() =>
          runValidationTasks("monthlyUserTasselTime", monthlyUserTasselTime)
        }
        errorMessage={errors.monthlyUserTasselTime?.errorMessage}
        hasError={errors.monthlyUserTasselTime?.hasError}
        {...getOverrideProps(overrides, "monthlyUserTasselTime")}
      ></TextField>
      <TextField
        label="Monthly user volunteer time"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={monthlyUserVolunteerTime}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              monthlySignups,
              dailySignups,
              MonthlyPopularEvents,
              MonthlyPopularTags,
              monthlyUserTasselTime,
              monthlyUserVolunteerTime: value,
              monthlyUserApps,
              monthlyNoShows,
            };
            const result = onChange(modelFields);
            value = result?.monthlyUserVolunteerTime ?? value;
          }
          if (errors.monthlyUserVolunteerTime?.hasError) {
            runValidationTasks("monthlyUserVolunteerTime", value);
          }
          setMonthlyUserVolunteerTime(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "monthlyUserVolunteerTime",
            monthlyUserVolunteerTime
          )
        }
        errorMessage={errors.monthlyUserVolunteerTime?.errorMessage}
        hasError={errors.monthlyUserVolunteerTime?.hasError}
        {...getOverrideProps(overrides, "monthlyUserVolunteerTime")}
      ></TextField>
      <TextField
        label="Monthly user apps"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={monthlyUserApps}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              monthlySignups,
              dailySignups,
              MonthlyPopularEvents,
              MonthlyPopularTags,
              monthlyUserTasselTime,
              monthlyUserVolunteerTime,
              monthlyUserApps: value,
              monthlyNoShows,
            };
            const result = onChange(modelFields);
            value = result?.monthlyUserApps ?? value;
          }
          if (errors.monthlyUserApps?.hasError) {
            runValidationTasks("monthlyUserApps", value);
          }
          setMonthlyUserApps(value);
        }}
        onBlur={() => runValidationTasks("monthlyUserApps", monthlyUserApps)}
        errorMessage={errors.monthlyUserApps?.errorMessage}
        hasError={errors.monthlyUserApps?.hasError}
        {...getOverrideProps(overrides, "monthlyUserApps")}
      ></TextField>
      <TextField
        label="Monthly no shows"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={monthlyNoShows}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              monthlySignups,
              dailySignups,
              MonthlyPopularEvents,
              MonthlyPopularTags,
              monthlyUserTasselTime,
              monthlyUserVolunteerTime,
              monthlyUserApps,
              monthlyNoShows: value,
            };
            const result = onChange(modelFields);
            value = result?.monthlyNoShows ?? value;
          }
          if (errors.monthlyNoShows?.hasError) {
            runValidationTasks("monthlyNoShows", value);
          }
          setMonthlyNoShows(value);
        }}
        onBlur={() => runValidationTasks("monthlyNoShows", monthlyNoShows)}
        errorMessage={errors.monthlyNoShows?.errorMessage}
        hasError={errors.monthlyNoShows?.hasError}
        {...getOverrideProps(overrides, "monthlyNoShows")}
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
