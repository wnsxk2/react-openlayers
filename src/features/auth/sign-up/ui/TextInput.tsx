import { css } from '@emotion/react';
import { colors } from '@/shared/styles';

interface TextInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
}

export function TextInput({ value, setValue, placeholder }: TextInputProps) {
  return (
    <input
      type='text'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      css={infoInputField}
      placeholder={placeholder}
    />
  );
}

const infoInputField = css`
  width: 75%;
  padding: 10px 14px;
  margin: 0 auto 12px 25px;
  border: 2px solid ${colors.borderLight};
  border-radius: 12px;
  font-size: 16px;
  color: ${colors.textPrimary};
  background-color: ${colors.inputBackground};
  transition: all 0.3s ease;

  &::placeholder {
    color: ${colors.textSecondary};
    opacity: 0.8;
  }
`;