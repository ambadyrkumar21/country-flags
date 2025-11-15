import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { BrowserRouter } from 'react-router-dom';
const { worker } = await import("./util/mockLoginApi");
await worker.start({
  onUnhandledRequest: "bypass"
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
