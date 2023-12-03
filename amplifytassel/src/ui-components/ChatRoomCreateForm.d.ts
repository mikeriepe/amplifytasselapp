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
export declare type ChatRoomCreateFormInputValues = {
    ChatName?: string;
};
export declare type ChatRoomCreateFormValidationValues = {
    ChatName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ChatRoomCreateFormOverridesProps = {
    ChatRoomCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ChatName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ChatRoomCreateFormProps = React.PropsWithChildren<{
    overrides?: ChatRoomCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ChatRoomCreateFormInputValues) => ChatRoomCreateFormInputValues;
    onSuccess?: (fields: ChatRoomCreateFormInputValues) => void;
    onError?: (fields: ChatRoomCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ChatRoomCreateFormInputValues) => ChatRoomCreateFormInputValues;
    onValidate?: ChatRoomCreateFormValidationValues;
} & React.CSSProperties>;
export default function ChatRoomCreateForm(props: ChatRoomCreateFormProps): React.ReactElement;
