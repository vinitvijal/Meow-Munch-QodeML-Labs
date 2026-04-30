import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-4 mb-6">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Choose {title}</span>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "h-14 rounded-2xl p-4 text-xs font-bold transition-all duration-300 border-2 ",
                {
                  "border-primary bg-secondary/50 text-accent shadow-lg shadow-primary/10": v === current,
                  "border-neutral-border bg-white text-primary/60 hover:border-primary/50": v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
