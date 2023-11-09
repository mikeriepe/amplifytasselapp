/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Organization } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OrganizationUpdateFormInputValues = {
    name?: string;
    email?: string;
    website?: string;
    description?: string;
    instagram?: string;
};
export declare type OrganizationUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    website?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    instagram?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OrganizationUpdateFormOverridesProps = {
    OrganizationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    website?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    instagram?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OrganizationUpdateFormProps = React.PropsWithChildren<{
    overrides?: OrganizationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    organization?: Organization;
    onSubmit?: (fields: OrganizationUpdateFormInputValues) => OrganizationUpdateFormInputValues;
    onSuccess?: (fields: OrganizationUpdateFormInputValues) => void;
    onError?: (fields: OrganizationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OrganizationUpdateFormInputValues) => OrganizationUpdateFormInputValues;
    onValidate?: OrganizationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OrganizationUpdateForm(props: OrganizationUpdateFormProps): React.ReactElement;
