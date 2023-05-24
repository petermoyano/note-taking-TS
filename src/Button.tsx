import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

interface CustomButtonProps extends ButtonProps {
  buttonWidth?: string;
  buttonHeight?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  buttonWidth,
  buttonHeight,
  ...rest
}) => {
  const buttonStyle: React.CSSProperties = {
    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: 'orange',
    color: 'black',
    fontWeight: 'bolder',
  };

  return (
    <Button variant='primary' style={buttonStyle}>
      Cancel
    </Button>
  );
};

export default CustomButton;
