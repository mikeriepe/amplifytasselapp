/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { SiteAnalytics } from "../models";
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
export declare type SiteAnalyticsUpdateFormInputValues = {
    monthlySignups?: number[];
    dailySignups?: number[];
    MonthlyPopularEvents?: string[];
    MonthlyPopularTags?: string[];
    monthlyUserTasselTime?: number;
    monthlyUserVolunteerTime?: number;
    monthlyUserApps?: number;
    monthlyNoShows?: number;
};
export declare type SiteAnalyticsUpdateFormValidationValues = {
    monthlySignups?: ValidationFunction<number>;
    dailySignups?: ValidationFunction<number>;
    MonthlyPopularEvents?: ValidationFunction<string>;
    MonthlyPopularTags?: ValidationFunction<string>;
    monthlyUserTasselTime?: ValidationFunction<number>;
    monthlyUserVolunteerTime?: ValidationFunction<number>;
    monthlyUserApps?: ValidationFunction<number>;
    monthlyNoShows?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SiteAnalyticsUpdateFormOverridesProps = {
    SiteAnalyticsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    monthlySignups?: PrimitiveOverrideProps<TextFieldProps>;
    dailySignups?: PrimitiveOverrideProps<TextFieldProps>;
    MonthlyPopularEvents?: PrimitiveOverrideProps<TextFieldProps>;
    MonthlyPopularTags?: PrimitiveOverrideProps<TextFieldProps>;
    monthlyUserTasselTime?: PrimitiveOverrideProps<TextFieldProps>;
    monthlyUserVolunteerTime?: PrimitiveOverrideProps<TextFieldProps>;
    monthlyUserApps?: PrimitiveOverrideProps<TextFieldProps>;
    monthlyNoShows?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SiteAnalyticsUpdateFormProps = React.PropsWithChildren<{
    overrides?: SiteAnalyticsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    siteAnalytics?: SiteAnalytics;
    onSubmit?: (fields: SiteAnalyticsUpdateFormInputValues) => SiteAnalyticsUpdateFormInputValues;
    onSuccess?: (fields: SiteAnalyticsUpdateFormInputValues) => void;
    onError?: (fields: SiteAnalyticsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SiteAnalyticsUpdateFormInputValues) => SiteAnalyticsUpdateFormInputValues;
    onValidate?: SiteAnalyticsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SiteAnalyticsUpdateForm(props: SiteAnalyticsUpdateFormProps): React.ReactElement;
