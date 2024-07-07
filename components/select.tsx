"use client"

import { useMemo } from "react"
import { SingleValue } from "react-select"
import CreateableSelect from "react-select/creatable"

type Props = {
    onChange: (value?: string) => void
    onCreate: (value?: string) => void
    options?: { value: string; label: string }[]
    value?: string | null | undefined
    disabled?: boolean
    placeholder?: string

}

export const Select = ({
    onChange,
    options = [],
    value,
    onCreate,
    disabled,
    placeholder
}: Props) => {

    const onSelect = (value: SingleValue<{ value: string; label: string }>) => {
        onChange(value?.value)
    }

    const formattedValues = useMemo(() => {
        return options.map((option) => ({
            value: option.value,
            label: option.label
        }))
    }, [options])


    return (
        <CreateableSelect
            isDisabled={disabled}
            className="text-sm h-10"
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: "#e2e8f0",
                    ":hover": {
                        borderColor: "#e2e8f0",
                    },
                }),
            }}
            onCreateOption={onCreate}
            onChange={onSelect}
            value={formattedValues}
            options={options}
            placeholder={placeholder}
        />
    )
}