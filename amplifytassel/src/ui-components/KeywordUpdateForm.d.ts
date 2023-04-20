/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Keyword } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type KeywordUpdateFormInputValues = {
    name?: string;
};
export declare type KeywordUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KeywordUpdateFormOverridesProps = {
    KeywordUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type KeywordUpdateFormProps = React.PropsWithChildren<{
    overrides?: KeywordUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    keyword?: Keyword;
    onSubmit?: (fields: KeywordUpdateFormInputValues) => KeywordUpdateFormInputValues;
    onSuccess?: (fields: KeywordUpdateFormInputValues) => void;
    onError?: (fields: KeywordUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: KeywordUpdateFormInputValues) => KeywordUpdateFormInputValues;
    onValidate?: KeywordUpdateFormValidationValues;
} & React.CSSProperties>;
export default function KeywordUpdateForm(props: KeywordUpdateFormProps): React.ReactElement;
