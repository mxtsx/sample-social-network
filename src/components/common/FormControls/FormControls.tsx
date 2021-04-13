import fc from "./FormControls.module.css"
import {Field, WrappedFieldProps} from "redux-form";
import React from "react";
import {ValidatorsType} from "../../../utils/validators";

const FormControl: React.FC<WrappedFieldProps> = ({meta: {touched, error}, children, ...props}) => {
    const hasError = touched && error
    return(
        <div className={hasError ? fc.error : ""}>
            <div>
                {children}
            </div>
            {hasError &&
            <div className={fc.errorContainer}>
                <span>{error}</span>
            </div>
            }
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export function CreateField<FormKeyType extends string> (placeholder?: string | undefined, name?: FormKeyType, component?: React.FC<WrappedFieldProps> | string, type?: string | undefined, text = "", validate: Array<ValidatorsType> = [], className?: string, onBlur?: any, props = {}) {
    return(
        <div className={className}>
            <span className={text && fc.formText}>{text}</span> <Field placeholder={placeholder} name={name} component={component} type={type} validate={validate} {...props}/>
        </div>
    )
}

