import SYSLEDLandingPage from './LandingPage'
import SYSLEDInvestorCalculator from './ROICalculator'
import PropostaComercial from './PropostaComercial'
import SYSLEDCompetitiveAnalysis from './AnaliseCompetitiva'

function App() {
  const path = window.location.pathname

  if (path === '/roi') {
    return <SYSLEDInvestorCalculator />
  }

  if (path === '/propostacomercial') {
    return <PropostaComercial />
  }

  if (path === '/analisecompetitiva') {
    return <SYSLEDCompetitiveAnalysis />
  }

  return <SYSLEDLandingPage />
}

export default App
