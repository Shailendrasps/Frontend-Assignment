import 'bootstrap/dist/css/bootstrap.min.css';
import FormContextProvider from './Context/FormContext';
import Home from './Screens/Home';

function App() {
  return (
    <>
      <FormContextProvider>
        <Home/>
      </FormContextProvider>
    </>
  );
}

export default App;
