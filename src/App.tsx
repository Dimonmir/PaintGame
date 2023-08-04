import WithRouter from './app/routes/routes';
import { Provider } from 'react-redux';
import { store } from './app/store';
import styledTheme from './app/ui/themeStyled';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import { mainTheme } from './app/ui/theme';
import GlobalStyle from './app/ui/globalStyled';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={styledTheme}>
        <ConfigProvider theme={mainTheme}>
          <GlobalStyle />
          <WithRouter />
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
