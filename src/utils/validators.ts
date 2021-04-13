export type ValidatorsType = (value: string) => string | undefined

export const requiredField: ValidatorsType = (value) => {
    if(value) return undefined
    return "Field is required"
}

export const maxLength = (MaxLength: number): ValidatorsType => (value) => {
    if(value && value.length > MaxLength) return `Max Length is ${MaxLength} symbols`
    return undefined
}