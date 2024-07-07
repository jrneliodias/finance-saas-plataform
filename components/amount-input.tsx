import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
}
    from "@/components/ui/tooltip";

type AmountInputProps = {
    value: string;
    onChange: (value: string | undefined) => void;
    disabled?: boolean;
    placeholder?: string;
};

export const AmountInput = ({
    value,
    onChange,
    disabled,
    placeholder,
}: AmountInputProps) => {

    const parsedValue = parseFloat(value);
    const isIncome = parsedValue > 0;
    const isExpense = parsedValue < 0;

    const onReverseValue = () => {
        if (!value) return
        const newValue = (parseFloat(value) * -1)
        onChange(newValue.toString())
    }

    return (
        <div className="relative ">
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            disabled={disabled}
                            className={cn(
                                "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5",
                                "rounded-md p-2 flex items-center justify-center transition",
                                disabled && "cursor-not-allowed opacity-50",
                                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                                isExpense && "bg-rose-500 hover:bg-rose-600",

                            )}
                            onClick={onReverseValue}
                        >
                            {!parsedValue && <Info className="size-3 text-white" />}
                            {isIncome && <PlusCircle className="size-3 text-white" />}
                            {isExpense && <MinusCircle className="size-3 text-white" />}

                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Use [+] for income and [-] for expenses
                    </TooltipContent>
                </Tooltip>
                <CurrencyInput
                    prefix="R$ "
                    className={cn(
                        " flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10",
                    )}
                    placeholder={placeholder}
                    value={value}
                    onValueChange={onChange}
                    disabled={disabled}
                    decimalSeparator=","
                    groupSeparator="."
                    decimalsLimit={2}
                    decimalScale={2}
                />
                <p className="text-xs text-muted-foreground mt-2">
                    {isIncome && "This will be added to your income"}
                    {isExpense && "This will be add will be added to expenses"}
                </p>

            </TooltipProvider>

        </div>
    )
}