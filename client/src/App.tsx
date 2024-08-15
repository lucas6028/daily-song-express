import LogInButton from './components/button/LogInButton'
import Hamster from './components/hamster/Hamster'
import "./App.css";
import Dashboard from './components/pages/Dashboard';

const code = new URLSearchParams(window.location.search).get("code") as string;

function App() {
  if (code) {
    return <Dashboard code={code} />;
  }
  return (
    <>
      <h1>Daily Song</h1>
      <Hamster></Hamster>
      <LogInButton></LogInButton>
    </>
  )
}

export default App