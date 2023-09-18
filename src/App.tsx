import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { RecoilRoot } from 'recoil';
import Main from '@components/Main';
import NavBar from '@components/NavBar';

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <PageContainer>
            <NavBar />
            <Main />
          </PageContainer>
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;

const PageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
`;
