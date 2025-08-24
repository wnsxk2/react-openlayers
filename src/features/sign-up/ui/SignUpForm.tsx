import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useIdCheck } from '../model/hooks/useIdCheck';
import { usePasswordCheck } from '../model/hooks/usePasswordCheck';
import { useEmailCheck } from '../model/hooks/useEmailCheck';
import { useSignUpFormCheck } from '../model/hooks/useSignUpFormCheck';
import { IdCheckInput } from './IdCheckInput';
import { PasswordInput } from './PasswordInput';
import { PasswordConfirmInput } from './PasswordConfirmInput';
import { EmailInput } from './EmailInput';
import { TextInput } from './TextInput';
import { SignUpButton } from './SignUpButton';
import { ErrorMessage } from './ErrorMessage';

export function SignUpForm() {
  const { idCheckResult, handleIdCheck } = useIdCheck();
  const {
    showPassword,
    showPasswordCheck,
    passwordConfirm,
    setPasswordConfirm,
    passwordCheckConfirm,
    setPasswordCheckConfirm,
    handlePasswordToggle,
    handlePasswordConfirmToggle,
  } = usePasswordCheck();
  const { emailCheckResult, handleEmailValidation } = useEmailCheck();
  const {
    id,
    setId,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    email,
    setEmail,
    username,
    setUsername,
    tel,
    setTel,
    inputErrors,
    loading,
    serverError,
    handleSignUp,
  } = useSignUpFormCheck();

  return (
    <form css={formContainer}>
      <p css={signUpText}>회원가입</p>
      <p css={signUpSubText}>
        즐겨찾기를 통해 여러분만의 지도를 만들어보세요
      </p>

      <IdCheckInput
        id={id}
        setId={setId}
        onIdCheck={() => handleIdCheck(id)}
        idCheckResult={idCheckResult}
      />

      <PasswordInput
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        onPasswordToggle={() => handlePasswordToggle(password)}
        passwordConfirm={passwordConfirm}
        setPasswordConfirm={setPasswordConfirm}
      />

      <PasswordConfirmInput
        passwordCheck={passwordCheck}
        setPasswordCheck={setPasswordCheck}
        showPasswordCheck={showPasswordCheck}
        onPasswordConfirmToggle={() => handlePasswordConfirmToggle(passwordCheck)}
        passwordCheckConfirm={passwordCheckConfirm}
        setPasswordCheckConfirm={setPasswordCheckConfirm}
      />

      <EmailInput
        email={email}
        setEmail={setEmail}
        onEmailValidation={handleEmailValidation}
        emailCheckResult={emailCheckResult}
      />

      <TextInput
        value={username}
        setValue={setUsername}
        placeholder='이름을 입력해주세요.'
      />

      <TextInput
        value={tel}
        setValue={setTel}
        placeholder='전화번호를 입력해주세요.'
      />

      <SignUpButton
        loading={loading}
        onClick={() => handleSignUp(idCheckResult)}
      />

      <Link to='/' css={signUpCancelText}>
        돌아가기
      </Link>

      <ErrorMessage
        serverError={serverError}
        inputErrors={inputErrors}
      />
    </form>
  );
}

const formContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e9e9e9;
  border-radius: 20px;
  width: 560px;
  padding-top: 30px;
`;

const signUpText = css`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #555555;
`;

const signUpSubText = css`
  text-align: center;
  font-size: 12px;
  color: #666666;
  margin-bottom: 30px;
`;

const signUpCancelText = css`
  text-align: center;
  font-size: 14px;
  color: #666666;
  margin: 5px 0 20px 0;
  text-decoration: underline;
  cursor: pointer;
`;
