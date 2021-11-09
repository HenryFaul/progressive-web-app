export function FV(rate, nper, pmt, pv, type) {
  var pow = Math.pow(1 + rate, nper),
    fv;
  if (rate) {
    fv = (pmt * (1 + rate * type) * (1 - pow)) / rate - pv * pow;
  } else {
    fv = -1 * (pv + pmt * nper);
  }
  return fv.toFixed(2);
}

export function PV(rate, periods, payment, future, type) {
  // Initialize type
  var type = typeof type === "undefined" ? 0 : type;

  // Evaluate rate and periods
  rate = eval(rate);
  periods = eval(periods);

  // Return present value
  if (rate === 0) {
    return -payment * periods - future;
  } else {
    return (
      (((1 - Math.pow(1 + rate, periods)) / rate) *
        payment *
        (1 + rate * type) -
        future) /
      Math.pow(1 + rate, periods)
    );
  }
}

export function PMT(
  rate_per_period,
  number_of_payments,
  present_value,
  future_value,
  type
) {
  if (rate_per_period != 0.0) {
    // Interest rate exists
    var q = Math.pow(1 + rate_per_period, number_of_payments);
    return (
      -(rate_per_period * (future_value + q * present_value)) /
      ((-1 + q) * (1 + rate_per_period * type))
    );
  } else if (number_of_payments != 0.0) {
    // No interest rate, but number of payments exists
    return -(future_value + present_value) / number_of_payments;
  }

  return 0;
}

export function PrintNice(x) {
 // x = x.toFixed(2);
  return "R " + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


