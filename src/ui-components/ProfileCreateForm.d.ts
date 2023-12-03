/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProfileCreateFormInputValues = {
    email?: string;
    about?: string;
    location?: string;
    picture?: string;
    firstName?: string;
    lastName?: string;
    status?: string;
    graduationYear?: string;
    active?: boolean;
    isAdmin?: boolean;
    isApproved?: boolean;
    schoolEmail?: string;
    infoRequest?: string;
    infoResponse?: string;
    banner?: string;
    points?: number;
};
export declare type ProfileCreateFormValidationValues = {
    email?: ValidationFunction<string>;
    about?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    picture?: ValidationFunction<string>;
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    graduationYear?: ValidationFunction<string>;
    active?: ValidationFunction<boolean>;
    isAdmin?: ValidationFunction<boolean>;
    isApproved?: ValidationFunction<boolean>;
    schoolEmail?: ValidationFunction<string>;
    infoRequest?: ValidationFunction<string>;
    infoResponse?: ValidationFunction<string>;
    banner?: ValidationFunction<string>;
    points?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProfileCreateFormOverridesProps = {
    ProfileCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    about?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    picture?: PrimitiveOverrideProps<TextFieldProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    graduationYear?: PrimitiveOverrideProps<TextFieldProps>;
    active?: PrimitiveOverrideProps<SwitchFieldProps>;
    isAdmin?: PrimitiveOverrideProps<SwitchFieldProps>;
    isApproved?: PrimitiveOverrideProps<SwitchFieldProps>;
    schoolEmail?: PrimitiveOverrideProps<TextFieldProps>;
    infoRequest?: PrimitiveOverrideProps<TextFieldProps>;
    infoResponse?: PrimitiveOverrideProps<TextFieldProps>;
    banner?: PrimitiveOverrideProps<TextFieldProps>;
    points?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProfileCreateFormProps = React.PropsWithChildren<{
    overrides?: ProfileCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProfileCreateFormInputValues) => ProfileCreateFormInputValues;
    onSuccess?: (fields: ProfileCreateFormInputValues) => void;
    onError?: (fields: ProfileCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProfileCreateFormInputValues) => ProfileCreateFormInputValues;
    onValidate?: ProfileCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProfileCreateForm(props: ProfileCreateFormProps): React.ReactElement;
