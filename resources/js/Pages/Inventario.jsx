
import Sidebar from '@/Components/Sidebar';
import Main from '@/Components/Main';

function App() {
  return (
    <>
      <div className="flex w-full bg-slate-100 ">
        <Sidebar/>
          <Main />
      </div>
    </>
  );
}

export default App;
