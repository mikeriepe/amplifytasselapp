/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type KeywordCreateFormInputValues = {
    name?: string;
};
export declare type KeywordCreateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KeywordCreateFormOverridesProps = {
    KeywordCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type KeywordCreateFormProps = React.PropsWithChildren<{
    overrides?: KeywordCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: KeywordCreateFormInputValues) => KeywordCreateFormInputValues;
    onSuccess?: (fields: KeywordCreateFormInputValues) => void;
    onError?: (fields: KeywordCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: KeywordCreateFormInputValues) => KeywordCreateFormInputValues;
    onValidate?: KeywordCreateFormValidationValues;
} & React.CSSProperties>;
export default function KeywordCreateForm(props: KeywordCreateFormProps): React.ReactElement;
