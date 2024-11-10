/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ProfileAnalytics } from "../models";
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
export declare type ProfileAnalyticsUpdateFormInputValues = {
    profileViews?: number[];
    hoursSpentVolunteering?: number;
};
export declare type ProfileAnalyticsUpdateFormValidationValues = {
    profileViews?: ValidationFunction<number>;
    hoursSpentVolunteering?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProfileAnalyticsUpdateFormOverridesProps = {
    ProfileAnalyticsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    profileViews?: PrimitiveOverrideProps<TextFieldProps>;
    hoursSpentVolunteering?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProfileAnalyticsUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProfileAnalyticsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    profileAnalytics?: ProfileAnalytics;
    onSubmit?: (fields: ProfileAnalyticsUpdateFormInputValues) => ProfileAnalyticsUpdateFormInputValues;
    onSuccess?: (fields: ProfileAnalyticsUpdateFormInputValues) => void;
    onError?: (fields: ProfileAnalyticsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProfileAnalyticsUpdateFormInputValues) => ProfileAnalyticsUpdateFormInputValues;
    onValidate?: ProfileAnalyticsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProfileAnalyticsUpdateForm(props: ProfileAnalyticsUpdateFormProps): React.ReactElement;
