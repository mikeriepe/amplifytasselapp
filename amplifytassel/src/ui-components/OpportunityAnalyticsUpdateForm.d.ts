/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { OpportunityAnalytics } from "../models";
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
export declare type OpportunityAnalyticsUpdateFormInputValues = {
    recentApps?: number[];
    apps?: number;
    PopularUserTags?: string[];
    appRate?: number;
};
export declare type OpportunityAnalyticsUpdateFormValidationValues = {
    recentApps?: ValidationFunction<number>;
    apps?: ValidationFunction<number>;
    PopularUserTags?: ValidationFunction<string>;
    appRate?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OpportunityAnalyticsUpdateFormOverridesProps = {
    OpportunityAnalyticsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    recentApps?: PrimitiveOverrideProps<TextFieldProps>;
    apps?: PrimitiveOverrideProps<TextFieldProps>;
    PopularUserTags?: PrimitiveOverrideProps<TextFieldProps>;
    appRate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OpportunityAnalyticsUpdateFormProps = React.PropsWithChildren<{
    overrides?: OpportunityAnalyticsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    opportunityAnalytics?: OpportunityAnalytics;
    onSubmit?: (fields: OpportunityAnalyticsUpdateFormInputValues) => OpportunityAnalyticsUpdateFormInputValues;
    onSuccess?: (fields: OpportunityAnalyticsUpdateFormInputValues) => void;
    onError?: (fields: OpportunityAnalyticsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OpportunityAnalyticsUpdateFormInputValues) => OpportunityAnalyticsUpdateFormInputValues;
    onValidate?: OpportunityAnalyticsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OpportunityAnalyticsUpdateForm(props: OpportunityAnalyticsUpdateFormProps): React.ReactElement;
