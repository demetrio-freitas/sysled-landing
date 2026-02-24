import SYSLEDLandingPage from './LandingPage'
import SYSLEDInvestorCalculator from './ROICalculator'

function App() {
  const path = window.location.pathname

  if (path === '/roi') {
    return <SYSLEDInvestorCalculator />
  }

  return <SYSLEDLandingPage />
}

export default App
