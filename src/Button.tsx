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
    backgroundColor: 'green',
  };

  return (
    <Button variant='primary' style={buttonStyle}>
      Custom Button
    </Button>
  );
};

export default CustomButton;
