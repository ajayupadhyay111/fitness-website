export function response(res, statusCode, success, message, data = null) {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
}

export const calculateOverallGrowth = (
  currentMonthContacts,
  lastMonthContacts,
  currentMonthSubscribers,
  lastMonthSubscribers
) => {
  const currentMonthTotal = currentMonthContacts + currentMonthSubscribers;
  const lastMonthTotal = lastMonthContacts + lastMonthSubscribers;

  if (lastMonthTotal === 0 && currentMonthTotal === 0) return 0;
  if (lastMonthTotal === 0 && currentMonthTotal > 0) return 100;

  return Number(
    (((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100).toFixed(2)
  );
};
