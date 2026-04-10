import AppShell from './app/AppShell';
// import OnboardingPage from './features/onboarding/OnboardingPage';
import UniversityExplorerPage from './features/universities/UniversityExplorerPage'

function App() {
  return (
    <AppShell>
      {/* <OnboardingPage /> */}
      <UniversityExplorerPage />
    </AppShell>
  );
}

export default App;
