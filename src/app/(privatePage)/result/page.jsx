const VALID_PAGE_TYPE = ['create', 'exchange', 'sell', 'buy'];
const VALID_SUCCESS_TYPE = ['success', 'fail'];

const ResultPage = ({ searchParams }) => {
  const { type, success } = searchParams;
  const message = {
    success: {},
    fail: {},
  };

  return <div>page</div>;
};

export default ResultPage;
