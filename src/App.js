import ContextProvider from './Context';
import Home from './pages/Home';
import Modal from './components/Modal';

const App = () => {
    return (
        <div className='App flex flex-col overflow-auto'>
            <ContextProvider>
                <Home/>
                <Modal/>
            </ContextProvider>
        </div>
    );
}

export default App;