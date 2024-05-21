import './App.css';
import { MantineProvider } from '@mantine/core';
import CropWiseAnalysis from './components/CropWiseAnalysis';
import YearlyAnalysis from './components/YearlyAnalysis';
import '@mantine/core/styles.css';


function App() {
  return (
    <MantineProvider>
      <div>
        <h1>Crop With Maximum And Minimum Production Yearly</h1>
        <YearlyAnalysis />
      </div>
      <div>
      <h1>Average Yield And Cultivation Area Cropwise</h1>
        <CropWiseAnalysis />
      </div>
    </MantineProvider>);
}

export default App;
