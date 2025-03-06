const numberFormatter = new Intl.NumberFormat("en-US");
export const number = (n: number) => numberFormatter.format(n);

export const bytes = (value: number, options?: Intl.NumberFormatOptions) => {
  if (isNaN(value)) {
    return "";
  }

  const opts: Intl.NumberFormatOptions = {
    unit: "byte",
    unitDisplay: "short",
    ...options,
  };
  const bitPrefixes = ["", "kilo", "mega", "giga", "tera"]; // petabit isn't a supported unit
  const bytePrefixes = ["", "kilo", "mega", "giga", "tera", "peta"];
  const prefix = opts.unit === "bit" ? bitPrefixes : bytePrefixes;
  const index = Math.max(
    0,
    Math.min(Math.floor(Math.log10(value) / 3), prefix.length - 1),
  );
  const unit = prefix[index]! + opts.unit;
  const valueToFormat = parseFloat(
    (value / Math.pow(1000, index)).toPrecision(3),
  );

  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit,
    unitDisplay: opts.unitDisplay,
  });

  return numberFormatter.format(valueToFormat);
};
