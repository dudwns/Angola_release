import styled from '@emotion/styled';
import Modal from '@components/Modal';
import Spinner from '@components/Spinner';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { useCreatePost } from './hooks';

const CreatePostPage = () => {
  const {
    inputValues,
    isModalOpen,
    setIsModalOpen,
    isCreatePostLoading,
    isCreatePostPossible,
    handleChangeTitleValue,
    handleChangeOptionValues,
    handleClickCreatePost,
    handleBlurTrim,
  } = useCreatePost();

  return (
    <>
      {isCreatePostLoading ? (
        <Spinner size={100} />
      ) : (
        <PageContainer>
          <TitleContainer>
            <TitleInput
              id="title"
              placeholder="밸런스 포스트에 대한 한 줄 설명을 써주세요"
              value={inputValues.title}
              onChange={handleChangeTitleValue}
              onBlur={handleBlurTrim}
            />
            <TitleLengthLimit>
              {inputValues.title.length} / 100
            </TitleLengthLimit>
          </TitleContainer>

          <OptionContainer>
            <OptionContent>
              <OptionName>A 항목</OptionName>
              <OptionInput
                id="optionA"
                value={inputValues.optionA}
                onChange={handleChangeOptionValues}
                onBlur={handleBlurTrim}
                placeholder="A 항목에 대한 설명을 작성해주세요"
              />
              <OptionLengthLimit>
                {inputValues.optionA.length} / 100
              </OptionLengthLimit>
            </OptionContent>

            <VsContainer>VS</VsContainer>

            <OptionContent>
              <OptionName>B 항목</OptionName>
              <OptionInput
                id="optionB"
                value={inputValues.optionB}
                onChange={handleChangeOptionValues}
                onBlur={handleBlurTrim}
                placeholder="B 항목에 대한 설명을 작성해주세요"
              />
              <OptionLengthLimit>
                {inputValues.optionB.length} / 100
              </OptionLengthLimit>
            </OptionContent>
          </OptionContainer>

          <SubmitButton
            disabled={!isCreatePostPossible}
            onClick={handleClickCreatePost}>
            작성 완료하기
          </SubmitButton>
        </PageContainer>
      )}

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(() => false);
          }}>
          포스트 작성에 실패했습니다.
        </Modal>
      )}
    </>
  );
};

export default CreatePostPage;

const PageContainer = styled.div`
  display: flex;
  padding: 0px 24px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  align-self: stretch;
`;

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  padding: 20px 0px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 32px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};

  &:focus-within {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }
`;

const TitleInput = styled.input`
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  width: 70%;
  vertical-align: center;
  color: ${ANGOLA_STYLES.color.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::placeholder {
    color: ${ANGOLA_STYLES.color.dark};
    text-overflow: ellipsis;
  }

  @media (max-width: 800px) {
    width: 30%;
  }
`;

const TitleLengthLimit = styled.span`
  box-sizing: border-box;
  position: absolute;
  right: 28px;
  bottom: 22px;
  color: ${ANGOLA_STYLES.color.text};
  line-height: 100%;

  @media (max-width: 800px) {
    visibility: hidden;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  padding: 12px 0px;
  align-items: center;
  gap: 36px;
  align-self: stretch;

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
`;

const OptionName = styled.p`
  box-sizing: border-box;
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
  line-height: 100%;
`;

const OptionInput = styled.textarea`
  box-sizing: border-box;
  width: auto;
  display: flex;
  min-height: 256px;
  resize: none;
  padding: 20px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-shrink: 0;
  text-align: center;
  outline: none;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  line-height: 42px;
  border-radius: 24px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.gray};
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};
  word-break: break-all;
  overflow: hidden;

  &::placeholder {
    color: ${ANGOLA_STYLES.color.dark};
  }

  &:focus {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }
`;

const OptionLengthLimit = styled.span`
  box-sizing: border-box;
  color: ${ANGOLA_STYLES.color.dark};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const VsContainer = styled.p`
  text-align: center;
  color: ${ANGOLA_STYLES.color.black};
  font-size: ${ANGOLA_STYLES.textSize.symbol};
`;

const SubmitButton = styled.button`
  display: flex;
  height: 56px;
  padding: 20px 36px;
  justify-content: center;
  align-items: center;

  border-radius: 44px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.default};

  &:hover {
    box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.hover};
  }

  &:disabled {
    background: ${ANGOLA_STYLES.color.dark};
  }
`;
