import InvestmentResultItem from "./InvestmentResultItem";

const InvestmentResult = ({ data }) => {
  return (
    <table id="result" className="center">
      <thead>
        <tr>
          <th scope="col">Year</th>
          <th scope="col">Investment Value</th>
          <th scope="col">Interest(year)</th>
          <th scope="col">Total Interest</th>
          <th scope="col">Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {data.map((props) => (
          <InvestmentResultItem key={props.year} {...props} />
        ))}
      </tbody>
    </table>
  );
};

export default InvestmentResult;
