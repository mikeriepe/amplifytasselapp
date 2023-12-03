/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { FriendRequest } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function FriendRequestUpdateForm(props) {
  const {
    id: idProp,
    friendRequest: friendRequestModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Receiver: "",
  };
  const [Receiver, setReceiver] = React.useState(initialValues.Receiver);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = friendRequestRecord
      ? { ...initialValues, ...friendRequestRecord }
      : initialValues;
    setReceiver(cleanValues.Receiver);
    setErrors({});
  };
  const [friendRequestRecord, setFriendRequestRecord] = React.useState(
    friendRequestModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(FriendRequest, idProp)
        : friendRequestModelProp;
      setFriendRequestRecord(record);
    };
    queryData();
  }, [idProp, friendRequestModelProp]);
  React.useEffect(resetStateValues, [friendRequestRecord]);
  const validations = {
    Receiver: [],
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
          Receiver,
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
            FriendRequest.copyOf(friendRequestRecord, (updated) => {
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
      {...getOverrideProps(overrides, "FriendRequestUpdateForm")}
      {...rest}
    >
      <TextField
        label="Receiver"
        isRequired={false}
        isReadOnly={false}
        value={Receiver}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Receiver: value,
            };
            const result = onChange(modelFields);
            value = result?.Receiver ?? value;
          }
          if (errors.Receiver?.hasError) {
            runValidationTasks("Receiver", value);
          }
          setReceiver(value);
        }}
        onBlur={() => runValidationTasks("Receiver", Receiver)}
        errorMessage={errors.Receiver?.errorMessage}
        hasError={errors.Receiver?.hasError}
        {...getOverrideProps(overrides, "Receiver")}
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
          isDisabled={!(idProp || friendRequestModelProp)}
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
              !(idProp || friendRequestModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
