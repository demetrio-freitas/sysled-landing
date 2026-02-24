import SYSLEDLandingPage from './LandingPage'
import SYSLEDInvestorCalculator from './ROICalculator'
import PropostaComercial from './PropostaComercial'

function App() {
  const path = window.location.pathname

  if (path === '/roi') {
    return <SYSLEDInvestorCalculator />
  }

  if (path === '/propostacomercial') {
    return <PropostaComercial />
  }

  return <SYSLEDLandingPage />
}

export default App
