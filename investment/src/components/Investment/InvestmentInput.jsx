const InvestmentInput = ({ updateInvestmentDatas }) => {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initial-investment">Initial Investment</label>

          <input
            type="number"
            id="initial-investment"
            name="initialInvestment"
            required
            min="5000"
            max="1000000"
            onChange={({ target: { value } }) =>
              updateInvestmentDatas("initialInvestment", value)
            }
          />
        </p>

        <p>
          <label htmlFor="annual-investment">Annual Investment</label>

          <input
            type="number"
            id="annual-investment"
            name="annualInvestment"
            required
            min="0"
            max="100000"
            onChange={({ target: { value } }) =>
              updateInvestmentDatas("annualInvestment", value)
            }
          />
        </p>
      </div>

      <div className="input-group">
        <p>
          <label htmlFor="expected-return">Expected return</label>

          <input
            type="number"
            id="expected-return"
            name="expectedReturn"
            required
            min="0"
            max="100"
            step="0.1"
            onChange={({ target: { value } }) =>
              updateInvestmentDatas("expectedReturn", value)
            }
          />
        </p>
        <p>
          <label htmlFor="duration">Duration</label>

          <input
            type="number"
            id="duration"
            name="duration"
            min="1"
            max="25"
            required
            onChange={({ target: { value } }) =>
              updateInvestmentDatas("duration", value)
            }
          />
        </p>
      </div>
    </section>
  );
};

export default InvestmentInput;
