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
import { OpportunityAnalytics } from "../models";
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
export default function OpportunityAnalyticsCreateForm(props) {
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
    recentApps: [],
    apps: "",
    PopularUserTags: [],
    appRate: "",
  };
  const [recentApps, setRecentApps] = React.useState(initialValues.recentApps);
  const [apps, setApps] = React.useState(initialValues.apps);
  const [PopularUserTags, setPopularUserTags] = React.useState(
    initialValues.PopularUserTags
  );
  const [appRate, setAppRate] = React.useState(initialValues.appRate);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setRecentApps(initialValues.recentApps);
    setCurrentRecentAppsValue("");
    setApps(initialValues.apps);
    setPopularUserTags(initialValues.PopularUserTags);
    setCurrentPopularUserTagsValue("");
    setAppRate(initialValues.appRate);
    setErrors({});
  };
  const [currentRecentAppsValue, setCurrentRecentAppsValue] =
    React.useState("");
  const recentAppsRef = React.createRef();
  const [currentPopularUserTagsValue, setCurrentPopularUserTagsValue] =
    React.useState("");
  const PopularUserTagsRef = React.createRef();
  const validations = {
    recentApps: [],
    apps: [],
    PopularUserTags: [],
    appRate: [],
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
          recentApps,
          apps,
          PopularUserTags,
          appRate,
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
          await DataStore.save(new OpportunityAnalytics(modelFields));
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
      {...getOverrideProps(overrides, "OpportunityAnalyticsCreateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              recentApps: values,
              apps,
              PopularUserTags,
              appRate,
            };
            const result = onChange(modelFields);
            values = result?.recentApps ?? values;
          }
          setRecentApps(values);
          setCurrentRecentAppsValue("");
        }}
        currentFieldValue={currentRecentAppsValue}
        label={"Recent apps"}
        items={recentApps}
        hasError={errors?.recentApps?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("recentApps", currentRecentAppsValue)
        }
        errorMessage={errors?.recentApps?.errorMessage}
        setFieldValue={setCurrentRecentAppsValue}
        inputFieldRef={recentAppsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Recent apps"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentRecentAppsValue}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.recentApps?.hasError) {
              runValidationTasks("recentApps", value);
            }
            setCurrentRecentAppsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("recentApps", currentRecentAppsValue)
          }
          errorMessage={errors.recentApps?.errorMessage}
          hasError={errors.recentApps?.hasError}
          ref={recentAppsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "recentApps")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Apps"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={apps}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              recentApps,
              apps: value,
              PopularUserTags,
              appRate,
            };
            const result = onChange(modelFields);
            value = result?.apps ?? value;
          }
          if (errors.apps?.hasError) {
            runValidationTasks("apps", value);
          }
          setApps(value);
        }}
        onBlur={() => runValidationTasks("apps", apps)}
        errorMessage={errors.apps?.errorMessage}
        hasError={errors.apps?.hasError}
        {...getOverrideProps(overrides, "apps")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              recentApps,
              apps,
              PopularUserTags: values,
              appRate,
            };
            const result = onChange(modelFields);
            values = result?.PopularUserTags ?? values;
          }
          setPopularUserTags(values);
          setCurrentPopularUserTagsValue("");
        }}
        currentFieldValue={currentPopularUserTagsValue}
        label={"Popular user tags"}
        items={PopularUserTags}
        hasError={errors?.PopularUserTags?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "PopularUserTags",
            currentPopularUserTagsValue
          )
        }
        errorMessage={errors?.PopularUserTags?.errorMessage}
        setFieldValue={setCurrentPopularUserTagsValue}
        inputFieldRef={PopularUserTagsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Popular user tags"
          isRequired={false}
          isReadOnly={false}
          value={currentPopularUserTagsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.PopularUserTags?.hasError) {
              runValidationTasks("PopularUserTags", value);
            }
            setCurrentPopularUserTagsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("PopularUserTags", currentPopularUserTagsValue)
          }
          errorMessage={errors.PopularUserTags?.errorMessage}
          hasError={errors.PopularUserTags?.hasError}
          ref={PopularUserTagsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "PopularUserTags")}
        ></TextField>
      </ArrayField>
      <TextField
        label="App rate"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={appRate}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              recentApps,
              apps,
              PopularUserTags,
              appRate: value,
            };
            const result = onChange(modelFields);
            value = result?.appRate ?? value;
          }
          if (errors.appRate?.hasError) {
            runValidationTasks("appRate", value);
          }
          setAppRate(value);
        }}
        onBlur={() => runValidationTasks("appRate", appRate)}
        errorMessage={errors.appRate?.errorMessage}
        hasError={errors.appRate?.hasError}
        {...getOverrideProps(overrides, "appRate")}
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
