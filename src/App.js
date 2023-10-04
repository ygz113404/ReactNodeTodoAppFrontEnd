
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import TodoMain from './components/TodoMain';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <TodoMain></TodoMain>
      <Footer></Footer>
    </div>
  );
}

export default App;
