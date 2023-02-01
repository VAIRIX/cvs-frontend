import { TooltipProps } from 'recharts';

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          padding: 5,
          border: '1px solid black',
        }}
      >
        <p>{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
