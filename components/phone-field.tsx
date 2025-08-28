"use client"

import PhoneInput from "react-phone-number-input"
import type { Value } from "react-phone-number-input"
import type { CountryCode } from "libphonenumber-js/core"
import flags from "react-phone-number-input/flags"
import 'react-phone-number-input/style.css'
import { forwardRef } from "react"

interface PhoneFieldProps {
  id?: string
  value: string | undefined
  onChange: (value: string | undefined) => void
  placeholder?: string
  defaultCountry?: CountryCode
  error?: boolean
}

// A thin wrapper to keep styling consistent with the app
const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(function PhoneField(
  { id, value, onChange, placeholder = "Enter phone number", defaultCountry = "CM" as CountryCode, error },
  _ref
) {
  return (
    <PhoneInput
      id={id}
      international
      countryCallingCodeEditable={false}
      defaultCountry={defaultCountry}
      flags={flags}
      value={value as Value}
      onChange={onChange as unknown as (value: Value) => void}
      placeholder={placeholder}
      className={`w-full text-sm ${error ? 'border-red-500' : ''}`}
      numberInputProps={{
        className: `mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/30 ${
          error ? 'border-red-500 ring-red-200' : 'border-gray-300'
        }`,
      }}
    />
  )
})

export default PhoneField
