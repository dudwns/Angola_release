import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@components/Button';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import {
  InputEmail,
  InputFullName,
  InputPassword,
  InputPasswordConfirm,
} from './components';
import {
  CheckEmailModal,
  CheckFullNameModal,
  CheckPasswordModal,
  SignUpFailModal,
  SignUpSuccessModal,
} from './components/Modals';
import { BUTTON, INPUT } from './constants';
import {
  useAllValidationPass,
  useClickEye,
  useEmailCheck,
  useFullNameCheck,
  usePasswordCheck,
  useSubmit,
} from './hooks';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    email,
    isDuplicatedEmailChecked,
    validEmailMsg,
    invalidEmailMsg,
    handleChangeEmail,
    handleClickDuplicatedEmailCheckBtn,
  } = useEmailCheck({ setIsSubmitted });

  const {
    fullName,
    isDuplicatedFullNameChecked,
    validFullNameMsg,
    invalidFullNameMsg,
    handleChangeFullName,
    handleClickDuplicatedFullNameCheckBtn,
  } = useFullNameCheck({ setIsSubmitted });

  const {
    password,
    passwordConfirm,
    invalidPasswordMsg,
    invalidPasswordConfirmMsg,
    validPasswordConfirmMsg,
    handleChangePassword,
    handleChangePasswordConfirm,
  } = usePasswordCheck();

  const {
    isPasswordShown,
    isPasswordConfirmShown,
    handleClickPasswordShown,
    handleClickPasswordConfirmShown,
  } = useClickEye();

  const { isAllPassed } = useAllValidationPass({
    isDuplicatedEmailChecked,
    isDuplicatedFullNameChecked,
    invalidPasswordMsg,
    invalidPasswordConfirmMsg,
    password,
    passwordConfirm,
  });

  const { isSignUpDisabled, handleSubmit, isSignUpError, isSignUpSuccess } =
    useSubmit({
      email,
      password,
      passwordConfirm,
      fullName,
      isAllPassed,
      setIsSubmitted,
    });

  return (
    <>
      <SignUpContainer>
        <Form onSubmit={handleSubmit}>
          <Wrapper>
            <Label>{INPUT.LABEL.EMAIL}</Label>
            <InputEmail
              handleChangeEmail={handleChangeEmail}
              handleClickDuplicatedEmailCheckBtn={
                handleClickDuplicatedEmailCheckBtn
              }
              isDuplicatedEmailChecked={isDuplicatedEmailChecked}
              invalidEmailMsg={invalidEmailMsg}
              validEmailMsg={validEmailMsg}
            />
          </Wrapper>
          <Wrapper>
            <Label>{INPUT.LABEL.PASSWORD}</Label>
            <InputPassword
              isPasswordShown={isPasswordShown}
              handleChangePassword={handleChangePassword}
              handleClickPasswordShown={handleClickPasswordShown}
              invalidPasswordMsg={invalidPasswordMsg}
            />
            <InputPasswordConfirm
              isPasswordConfirmShown={isPasswordConfirmShown}
              handleChangePasswordConfirm={handleChangePasswordConfirm}
              handleClickPasswordConfirmShown={handleClickPasswordConfirmShown}
              invalidPasswordConfirmMsg={invalidPasswordConfirmMsg}
              validPasswordConfirmMsg={validPasswordConfirmMsg}
            />
          </Wrapper>
          <Wrapper>
            <Label>{INPUT.LABEL.FULLNAME}</Label>
            <InputFullName
              handleChangeFullName={handleChangeFullName}
              isDuplicatedFullNameChecked={isDuplicatedFullNameChecked}
              handleClickDuplicatedFullNameCheckBtn={
                handleClickDuplicatedFullNameCheckBtn
              }
              invalidFullNameMsg={invalidFullNameMsg}
              validFullNameMsg={validFullNameMsg}
            />
          </Wrapper>
          <Button
            type="submit"
            size="md"
            style={{
              width: '150px',
              fontSize: ANGOLA_STYLES.textSize.title,
            }}
            disabled={isSignUpDisabled}>
            {BUTTON.SIGN_UP}
          </Button>
        </Form>
        {isSignUpSuccess && (
          <SignUpSuccessModal onClick={() => navigate('/login')} />
        )}
        {isSignUpError && (
          <SignUpFailModal onClick={() => window.location.reload()} />
        )}
        {isSubmitted && (
          <>
            {!isDuplicatedEmailChecked ? (
              <CheckEmailModal onClick={() => setIsSubmitted(false)} />
            ) : (
              <>
                {(invalidPasswordMsg || invalidPasswordConfirmMsg) && (
                  <CheckPasswordModal onClick={() => setIsSubmitted(false)} />
                )}
                {!(invalidPasswordMsg || invalidPasswordConfirmMsg) &&
                  !isDuplicatedFullNameChecked && (
                    <CheckFullNameModal onClick={() => setIsSubmitted(false)} />
                  )}
              </>
            )}
          </>
        )}
      </SignUpContainer>
    </>
  );
};

export default SignUpPage;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 80px;
  padding-right: 0px;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: ${ANGOLA_STYLES.textSize.title};
  line-height: 150%;
  padding-left: 1rem;
`;
