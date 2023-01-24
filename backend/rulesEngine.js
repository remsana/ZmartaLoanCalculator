/**
 * @param {object} applicationData
 * @param {Array} lenders - An array with lenders and their rules
 * @return {Array} - The filtered array
 */
function run(applicationData, lenders) {
  const filteredArray = []; //the filtered lenders array

  const checkAmount = (minAmount = 0, maxAmount = 100000000, amount) => {
    if (amount >= minAmount && amount <= maxAmount) {
      return true;
    } else {
      return false;
    }
  };

  const checkYear = (minYear = 0, maxYear = 10, repaymentYears) => {
    if (repaymentYears >= minYear && repaymentYears <= maxYear) {
      return true;
    } else {
      return false;
    }
  };
  lenders.forEach((item) => {
    let maxAmount;
    let minAmount;
    let minYear;
    let maxYear;

    item.rules.forEach((element) => {
      console.log(element.value);
      if (element.field === "amount" && element.operator === "greaterThan") {
        minAmount = element.value;
      } else if (
        element.field === "amount" &&
        element.operator === "lessThan"
      ) {
        maxAmount = element.value;
      } else if (
        element.field === "repaymentYears" &&
        element.operator === "greaterThan"
      ) {
        minYear = element.value;
      } else if (
        element.field === "repaymentYears" &&
        element.operator === "lessThan"
      ) {
        maxYear = element.value;
      }
    });
    console.log(
      `${minAmount}, ${maxAmount}, ${applicationData.amount}, ${item.name}`
    );
      
    if (checkAmount(minAmount, maxAmount, applicationData.amount) && checkYear(minYear, maxYear, applicationData.repaymentYears)) {
      const lender = {name:item.name}
      filteredArray.push(lender);
    }
    //console.log(filteredArray);
  });
  return filteredArray;
 
}
module.exports = {
  run,
};
