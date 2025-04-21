import Sidebar from "@/Components/Sidebar";
import Main from "@/Components/Main";
import Header from "@/Components/Header";

function App() {
    return (
        <>
             <div className="flex flex-col w-full">
                <Header />
                <div className="flex w-full bg-slate-100">
                    {/* Sidebar con posición fija */}
                    <div className="sticky top-0 h-screen">
                        <Sidebar />
                    </div>
                    {/* Main contenido scrollable */}
                    <div className="flex-1 overflow-y-auto">
                        <Main />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
