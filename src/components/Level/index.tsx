import { Avatar } from '@mui/material';
import { FC } from 'react';

type LevelProps = {
  level: number;
  maxLevel: number;
  setLevel: (level: number) => void;
};

const Level: FC<LevelProps> = ({ level, setLevel, maxLevel }) => {
  const handleSetLevel = () => {
    if (level === maxLevel) {
      setLevel(1);
    } else {
      setLevel(level + 1);
    }
  };
  return (
    <Avatar
      onClick={handleSetLevel}
      sx={{
        cursor: 'pointer',
        height: 30,
        width: 30,
        color: 'white',
        backgroundColor: 'primary.main',
      }}
    >
      {level}
    </Avatar>
  );
};

export default Level;
