interface ProgressProp {
  count: number;
  total: number;
  giveMargin: boolean;
}
function Progress({ count, total, giveMargin }: ProgressProp) {
  let percentage = 0;

  let margin = '34px';
  if (!giveMargin) {
    margin = '48px';
  }

  if (total !== 0) {
    percentage = (count / total) * 100;
  }
  if (count === 0) {
    percentage = 0.5;
  }

  const progressBarStyle = {
    marginLeft: margin,
    width: '85%',
    height: '5px',
    backgroundColor: 'white',
    borderRadius: '5px',
    overflow: 'hidden',
  };

  const progressStyle = {
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: '#2684F2',
    transition: 'height 0.3s ease',
    borderRadius: '5px',
  };

  return (
    <>
      <div style={progressBarStyle} className="mt-1">
        <div style={progressStyle}></div>
      </div>
    </>
  );
}

export default Progress;
