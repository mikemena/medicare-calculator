
const UNIT_DURATION = 15
const UNIT_ROUND_UP_DURATION = 8

 const billingCodesWithUnits = billingCodesWithDuration.map(billingCode => {
    const isUntimed = untimedBillingCodesIds.includes(billingCode.id)

    let units = isUntimed ? 1 : Math.trunc(billingCode.duration / UNIT_DURATION)

    const remainder = isUntimed ? 0 : billingCode.duration % UNIT_DURATION
    units = payerRule === PayerRule.AMA && remainder >= UNIT_ROUND_UP_DURATION ? units + 1 : units
    return { ...billingCode, units, remainder }
  })


  if (payerRule === PayerRule.AMA) {
    return syncChargesUnitsAMARule(claim, billingCodesWithUnits)
  }
  const remainingDuration = billingCodesWithUnits.reduce((acc, billingCode) => acc + billingCode.remainder, 0)
  const wholeUnits = Math.trunc(remainingDuration / UNIT_DURATION)
  const roundUpUnits = remainingDuration % UNIT_DURATION >= UNIT_ROUND_UP_DURATION ? 1 : 0
  const remainingUnits = wholeUnits + roundUpUnits
  const codesByRemainderDesc = orderBy(billingCodesWithUnits, ‘remainder’, ‘desc’)
  for (let i = 0; i < remainingUnits; i++) {
    codesByRemainderDesc[i].units += 1
  }
/******/
async function syncChargesUnitsAMARule(claim: InsuranceClaim, billingCodesWithUnits: BillingCodeWithUnits[]) {
  const CPTByCodeWithUnits = billingCodesWithUnits.reduce((acc, billingCode) => {
    acc[billingCode.code] = billingCode
    return acc
  }, {} as Record<string, BillingCode & { units: number }>)
  const charges = claim?.charges?.map(charge => {
    const billingCode = CPTByCodeWithUnits[charge.procedureCode]
    if (!billingCode) {
      return charge
    }
    return { ...charge, units: billingCode.units }
  })
  return InsuranceClaims.update({ id: claim.id, record: { charges } })
}