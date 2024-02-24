export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const dt = new Date(dateString);
  const result = new Intl.DateTimeFormat('en-US', options).format(date);
  return result;
}
