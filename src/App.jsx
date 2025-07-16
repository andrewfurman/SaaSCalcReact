import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [sfLicenseCost, setSfLicenseCost] = useState(100)
  const [laborCost, setLaborCost] = useState(100000)
  const [numUsers, setNumUsers] = useState(100)
  const [itLaborHours, setItLaborHours] = useState(40)
  const [itHourlyRate, setItHourlyRate] = useState(75)

  const [calculations, setCalculations] = useState({
    monthlyLicenseCost: 0,
    annualLicenseCost: 0,
    annualLaborCost: 0,
    laborCostPerUser: 0,
    itConfigCost: 0,
    totalMonthlyCost: 0,
    totalAnnualCost: 0,
    costPerUserPerMonth: 0,
    costPerUserPerYear: 0
  })

  useEffect(() => {
    const monthlyLicenseCost = sfLicenseCost
    const annualLicenseCost = monthlyLicenseCost * 12
    const annualLaborCost = laborCost
    const laborCostPerUser = annualLaborCost / numUsers
    const itConfigCost = itLaborHours * itHourlyRate
    const totalMonthlyCost = monthlyLicenseCost + (annualLaborCost / 12) + (itConfigCost / 12)
    const totalAnnualCost = annualLicenseCost + annualLaborCost + itConfigCost
    const costPerUserPerMonth = totalMonthlyCost / numUsers
    const costPerUserPerYear = totalAnnualCost / numUsers

    setCalculations({
      monthlyLicenseCost,
      annualLicenseCost,
      annualLaborCost,
      laborCostPerUser,
      itConfigCost,
      totalMonthlyCost,
      totalAnnualCost,
      costPerUserPerMonth,
      costPerUserPerYear
    })
  }, [sfLicenseCost, laborCost, numUsers, itLaborHours, itHourlyRate])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="calculator-container">
      <header className="header">
        <h1>Salesforce Total Cost Calculator</h1>
        <p>Calculate your complete Salesforce investment</p>
      </header>

      <div className="main-content">
        <div className="inputs-section">
          <h2>Input Parameters</h2>

          <div className="input-category">
            <h3>Software Licensing</h3>
            <div className="slider-group">
              <label>SF License Cost: <span className="value">{formatCurrency(sfLicenseCost)}/month</span></label>
              <input
                type="range"
                min="50"
                max="500"
                value={sfLicenseCost}
                onChange={(e) => setSfLicenseCost(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>

          <div className="input-category">
            <h3>Operations Labor</h3>
            <div className="slider-group">
              <label>Annual Labor Cost: <span className="value">{formatCurrency(laborCost)}</span></label>
              <input
                type="range"
                min="50000"
                max="500000"
                step="5000"
                value={laborCost}
                onChange={(e) => setLaborCost(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div className="slider-group">
              <label>Number of Users: <span className="value">{numUsers}</span></label>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={numUsers}
                onChange={(e) => setNumUsers(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>

          <div className="input-category">
            <h3>IT Labor</h3>
            <div className="slider-group">
              <label>IT Config Hours: <span className="value">{itLaborHours}</span></label>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={itLaborHours}
                onChange={(e) => setItLaborHours(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div className="slider-group">
              <label>IT Hourly Rate: <span className="value">{formatCurrency(itHourlyRate)}/hr</span></label>
              <input
                type="range"
                min="50"
                max="200"
                step="5"
                value={itHourlyRate}
                onChange={(e) => setItHourlyRate(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="cost-summary">
            <div className="total-cost">
              <div className="cost-value">{formatCurrency(calculations.totalAnnualCost)}</div>
              <div className="cost-label">Total Annual Cost</div>
            </div>
            <div className="per-user-cost">
              <div className="cost-value">{formatCurrency(calculations.costPerUserPerYear)}</div>
              <div className="cost-label">Cost Per User/Year</div>
            </div>
          </div>

          <div className="breakdown-categories">
            <div className="breakdown-category">
              <h4>Software Licensing</h4>
              <div className="breakdown-item">
                <span className="breakdown-label">License (Annual)</span>
                <span className="breakdown-value">{formatCurrency(calculations.annualLicenseCost)}</span>
              </div>
            </div>

            <div className="breakdown-category">
              <h4>Operations Labor</h4>
              <div className="breakdown-item">
                <span className="breakdown-label">Labor (Annual)</span>
                <span className="breakdown-value">{formatCurrency(calculations.annualLaborCost)}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Cost/User/Year</span>
                <span className="breakdown-value">{formatCurrency(calculations.laborCostPerUser)}</span>
              </div>
            </div>

            <div className="breakdown-category">
              <h4>IT Labor</h4>
              <div className="breakdown-item">
                <span className="breakdown-label">IT Config Cost</span>
                <span className="breakdown-value">{formatCurrency(calculations.itConfigCost)}</span>
              </div>
            </div>

            <div className="breakdown-category totals">
              <h4>Totals</h4>
              <div className="breakdown-item">
                <span className="breakdown-label">Monthly Total</span>
                <span className="breakdown-value">{formatCurrency(calculations.totalMonthlyCost)}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Cost/User/Month</span>
                <span className="breakdown-value">{formatCurrency(calculations.costPerUserPerMonth)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}