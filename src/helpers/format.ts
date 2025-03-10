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

export const betweenDates = (from: Date, to: Date) => {
  const shortMonthYearFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });
  return shortMonthYearFormatter.formatRange(from, to);
};

/**
 * This implements the date range the same way as Browsertrix does. However,
 * I'm sticking with the simpler version above because it includes days, which
 * is useful for these particular collections because relationships to the
 * inauguration date are important here. -ESG
 */
export const betweenDatesBtrix = (from: Date, to: Date) => {
  const yearFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric" });
  const longMonthYearFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  });
  const shortMonthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
  });
  const shortMonthYearFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  });

  const earliestYear = yearFormatter.format(from);
  const latestYear = yearFormatter.format(to);

  let date = "";

  if (earliestYear === latestYear) {
    const earliestMonth = from.getMonth();
    const latestMonth = to.getMonth();

    if (earliestMonth === latestMonth) {
      date = longMonthYearFormatter.format(from);
    } else {
      date = `${shortMonthFormatter.format(from)} – ${shortMonthYearFormatter.format(to)}`;
    }
  } else {
    date = `${earliestYear} – ${latestYear} `;
  }

  return date;
};
