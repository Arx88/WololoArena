import { cn } from "@/lib/utils"

export type ClassValue = string | null | undefined | ClassValue[] | { [key: string]: boolean }

export type VariantProps<T extends (...args: any) => any> = T extends (props?: infer P) => any
  ? Omit<P, "class" | "className">
  : never

type ConfigSchema = Record<string, Record<string, ClassValue>>

type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: keyof T[Variant]
}

type Config<T extends ConfigSchema> = {
  variants?: T
  defaultVariants?: ConfigVariants<T>
  compoundVariants?: Array<ConfigVariants<T> & { class?: ClassValue; className?: ClassValue }>
}

export function cva<T extends ConfigSchema>(base?: ClassValue, config?: Config<T>) {
  return (props?: ConfigVariants<T> & { class?: ClassValue; className?: ClassValue }) => {
    const classes: ClassValue[] = [base]

    if (config?.variants && props) {
      for (const [variantKey, variantValue] of Object.entries(config.variants)) {
        const propValue =
          props[variantKey as keyof typeof props] ??
          config.defaultVariants?.[variantKey as keyof typeof config.defaultVariants]

        if (propValue && variantValue[propValue as string]) {
          classes.push(variantValue[propValue as string])
        }
      }
    } else if (config?.variants && config.defaultVariants) {
      for (const [variantKey, variantValue] of Object.entries(config.variants)) {
        const defaultValue = config.defaultVariants[variantKey as keyof typeof config.defaultVariants]
        if (defaultValue && variantValue[defaultValue as string]) {
          classes.push(variantValue[defaultValue as string])
        }
      }
    }

    if (config?.compoundVariants && props) {
      for (const compound of config.compoundVariants) {
        const { class: compoundClass, className: compoundClassName, ...compoundVariants } = compound
        const matches = Object.entries(compoundVariants).every(([key, value]) => {
          const propValue =
            props[key as keyof typeof props] ?? config.defaultVariants?.[key as keyof typeof config.defaultVariants]
          return propValue === value
        })
        if (matches) {
          classes.push(compoundClass || compoundClassName)
        }
      }
    }

    classes.push(props?.class, props?.className)

    return cn(...classes.filter(Boolean))
  }
}
