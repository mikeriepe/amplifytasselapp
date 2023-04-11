/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OpportunityCreateFormInputValues = {
    zoomLink?: string;
    organizations?: string[];
    description?: string;
    isApproved?: boolean;
    eventBanner?: string;
    eventName?: string;
    startTime?: string;
    endTime?: string;
    locationType?: string;
    eventData?: string;
    subject?: string;
    preferences?: string[];
};
export declare type OpportunityCreateFormValidationValues = {
    zoomLink?: ValidationFunction<string>;
    organizations?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    isApproved?: ValidationFunction<boolean>;
    eventBanner?: ValidationFunction<string>;
    eventName?: ValidationFunction<string>;
    startTime?: ValidationFunction<string>;
    endTime?: ValidationFunction<string>;
    locationType?: ValidationFunction<string>;
    eventData?: ValidationFunction<string>;
    subject?: ValidationFunction<string>;
    preferences?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OpportunityCreateFormOverridesProps = {
    OpportunityCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    zoomLink?: PrimitiveOverrideProps<TextFieldProps>;
    organizations?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    isApproved?: PrimitiveOverrideProps<SwitchFieldProps>;
    eventBanner?: PrimitiveOverrideProps<TextFieldProps>;
    eventName?: PrimitiveOverrideProps<TextFieldProps>;
    startTime?: PrimitiveOverrideProps<TextFieldProps>;
    endTime?: PrimitiveOverrideProps<TextFieldProps>;
    locationType?: PrimitiveOverrideProps<TextFieldProps>;
    eventData?: PrimitiveOverrideProps<TextFieldProps>;
    subject?: PrimitiveOverrideProps<TextFieldProps>;
    preferences?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OpportunityCreateFormProps = React.PropsWithChildren<{
    overrides?: OpportunityCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: OpportunityCreateFormInputValues) => OpportunityCreateFormInputValues;
    onSuccess?: (fields: OpportunityCreateFormInputValues) => void;
    onError?: (fields: OpportunityCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OpportunityCreateFormInputValues) => OpportunityCreateFormInputValues;
    onValidate?: OpportunityCreateFormValidationValues;
} & React.CSSProperties>;
export default function OpportunityCreateForm(props: OpportunityCreateFormProps): React.ReactElement;
