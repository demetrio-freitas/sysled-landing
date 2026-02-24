import SYSLEDLandingPage from './LandingPage'
import SYSLEDInvestorCalculator from './ROICalculator'
import PropostaComercial from './PropostaComercial'
import SYSLEDCompetitiveAnalysis from './AnaliseCompetitiva'
import MapaObjecoes from './MapaObjecoes'
import SYSLEDInstagramSim from './InstagramSimulacao'
import SYSLEDLinkedInSim from './LinkedInSimulacao'

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

  if (path === '/mapaobjecoes') {
    return <MapaObjecoes />
  }

  if (path === '/instagram') {
    return <SYSLEDInstagramSim />
  }

  if (path === '/linkedin') {
    return <SYSLEDLinkedInSim />
  }

  return <SYSLEDLandingPage />
}

export default App
