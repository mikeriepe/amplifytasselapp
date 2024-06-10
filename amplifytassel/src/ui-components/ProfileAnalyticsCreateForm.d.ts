/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProfileAnalyticsCreateFormInputValues = {
    profileViews?: number[];
    hoursSpentVolunteering?: number;
};
export declare type ProfileAnalyticsCreateFormValidationValues = {
    profileViews?: ValidationFunction<number>;
    hoursSpentVolunteering?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProfileAnalyticsCreateFormOverridesProps = {
    ProfileAnalyticsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    profileViews?: PrimitiveOverrideProps<TextFieldProps>;
    hoursSpentVolunteering?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProfileAnalyticsCreateFormProps = React.PropsWithChildren<{
    overrides?: ProfileAnalyticsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProfileAnalyticsCreateFormInputValues) => ProfileAnalyticsCreateFormInputValues;
    onSuccess?: (fields: ProfileAnalyticsCreateFormInputValues) => void;
    onError?: (fields: ProfileAnalyticsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProfileAnalyticsCreateFormInputValues) => ProfileAnalyticsCreateFormInputValues;
    onValidate?: ProfileAnalyticsCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProfileAnalyticsCreateForm(props: ProfileAnalyticsCreateFormProps): React.ReactElement;
