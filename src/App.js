import './App.css';
import { Header } from './components/Header';
import { MintingComponent } from './components/MintingComponent';

function App() {
  return (
    <div className="App">
      <Header />
      <main >
        <div id="mint">
          <MintingComponent />
        </div>
        <div id="about">
          about
        </div>
        <div id="roadmap">
          roadmap
        </div>
      </main>
    </div>
  );
}

export default App;
