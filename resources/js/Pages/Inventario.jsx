import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';
import Main from '@/Components/Main';

function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="flex flex-1">
          <Sidebar />
          <Main />
        </div>
      </div>
    </>
  );
}

export default App;
