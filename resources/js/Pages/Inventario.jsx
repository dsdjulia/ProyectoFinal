
import Sidebar from '@/Components/Sidebar';
import Main from '@/Components/Main';

function App() {
  return (
    <>
          <Sidebar/>
      <div className="flex w-full bg-slate-100 pt-10">
          <Main />
      </div>
    </>
  );
}

export default App;
