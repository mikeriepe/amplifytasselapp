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
export declare type OpportunityAnalyticsCreateFormInputValues = {
    recentApps?: number[];
    apps?: number;
    PopularUserTags?: string[];
    appRate?: number;
};
export declare type OpportunityAnalyticsCreateFormValidationValues = {
    recentApps?: ValidationFunction<number>;
    apps?: ValidationFunction<number>;
    PopularUserTags?: ValidationFunction<string>;
    appRate?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OpportunityAnalyticsCreateFormOverridesProps = {
    OpportunityAnalyticsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    recentApps?: PrimitiveOverrideProps<TextFieldProps>;
    apps?: PrimitiveOverrideProps<TextFieldProps>;
    PopularUserTags?: PrimitiveOverrideProps<TextFieldProps>;
    appRate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OpportunityAnalyticsCreateFormProps = React.PropsWithChildren<{
    overrides?: OpportunityAnalyticsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: OpportunityAnalyticsCreateFormInputValues) => OpportunityAnalyticsCreateFormInputValues;
    onSuccess?: (fields: OpportunityAnalyticsCreateFormInputValues) => void;
    onError?: (fields: OpportunityAnalyticsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OpportunityAnalyticsCreateFormInputValues) => OpportunityAnalyticsCreateFormInputValues;
    onValidate?: OpportunityAnalyticsCreateFormValidationValues;
} & React.CSSProperties>;
export default function OpportunityAnalyticsCreateForm(props: OpportunityAnalyticsCreateFormProps): React.ReactElement;
