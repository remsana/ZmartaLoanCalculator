function calculateMonthlyCost(loanAmount, repaymentYears, interest) {
  var months = repaymentYears * 12;
  return Math.round(loanAmount * (interest / 100) / 12 / (1 - Math.pow(1 + (interest / 100) / 12, (months * -1))));
}

var apiService = {
  /**
   * Simulates an API call to a CMS.
   */
  getContent : function() {
    return {
      "monthlyCostLabel": "Månadskostnad",
      "monthlyCostSuffix": "kr",
      "loanAmountLabel": "Lånebelopp",
      "loanAmountSuffix": "kr",
      "repaymentYearsLabel": "Återbetalningstid",
      "repaymentYearsSuffix": "år",
      "ctaLabel": "Ansök nu",
      "interest": 5.77
    };
  },
  getInterestRate: function () {
    return 5.77;
  },
}

var YEARS_CONSTANTS = {
  startValue: 14,
  stepValue: 1,
  minValue: 1,
  maxValue: 15
}

var AMOUNT_CONSTANTS = {
  startValue: 250000,
  stepValue: 5000,
  minValue: 5000,
  maxValue: 600000
}

var amount = AMOUNT_CONSTANTS.startValue;
var years = YEARS_CONSTANTS.startValue;
var labels = apiService.getContent();

var formatAmount = function(amount) {
  return amount.toLocaleString('sv') + " " + labels.loanAmountSuffix;
}

var formatYears = function(years) {
  return years + " " + labels.repaymentYearsSuffix;
}

var app = new Vue({
  el: '#app',
  data: {
    labels: labels,
    monthlyCost: calculateMonthlyCost(amount, years, apiService.getInterestRate()),
    amount: formatAmount(amount),
    years: formatAmount(years),
    applying: false,
    applied: false,
    lenderResponses: null,
    error: null,
  },
  methods: {
    addYears: function() {
      if (years + YEARS_CONSTANTS.stepValue <= YEARS_CONSTANTS.maxValue)
      {
        years = years + YEARS_CONSTANTS.stepValue;
        this.years = formatYears(years);
        this.monthlyCost = calculateMonthlyCost(amount, years, apiService.getInterestRate());
      }
    },
    decreaseYears: function() {
      if (years - YEARS_CONSTANTS.stepValue >= YEARS_CONSTANTS.minValue)
      {
        years = years - YEARS_CONSTANTS.stepValue;
        this.years = formatYears(years);
        this.monthlyCost = calculateMonthlyCost(amount, years, apiService.getInterestRate());
      }
    },
    addAmount: function() {
      if (amount + AMOUNT_CONSTANTS.stepValue <= AMOUNT_CONSTANTS.maxValue)
      {
        amount = amount + AMOUNT_CONSTANTS.stepValue;
        this.amount = formatAmount(amount);
        this.monthlyCost = calculateMonthlyCost(amount, years, apiService.getInterestRate());
      }
    },
    decreaseAmount: function() {
      if (amount - AMOUNT_CONSTANTS.stepValue >= AMOUNT_CONSTANTS.minValue)
      {
        amount = amount - AMOUNT_CONSTANTS.stepValue;
        this.amount = formatAmount(amount);
        this.monthlyCost = calculateMonthlyCost(amount, years, apiService.getInterestRate());
      }
    },
    submit: function() {
      amount = AMOUNT_CONSTANTS.startValue;
      years = YEARS_CONSTANTS.startValue;

      this.amount = formatAmount(amount);
      this.years = formatYears(years);
      this.monthlyCost = calculateMonthlyCost(amount, years, apiService.getInterestRate());

      this.applying = true
      this.applied = true

      fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: parseInt(this.amount.replace(/[^0-9.-]+/g, '')),
          repaymentYears: parseInt(this.years),
        })
      }).then(res => res.json())
        .then(res => {
          this.lenderResponses = res.data
        })
        .catch(err => {
          this.error = err
        })
        .finally(() => {
          this.applying = false
        })
    }
  },
  created: function() {
    amount = AMOUNT_CONSTANTS.startValue;
    years = YEARS_CONSTANTS.startValue;

    this.amount = formatAmount(amount);
    this.years = formatYears(years);
    this.monthlyCost = calculateMonthlyCost(amount, years, apiService.getInterestRate());
  }
});
