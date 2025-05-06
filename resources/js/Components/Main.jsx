import ProductRegistrationForm from "./ProductRegistrationForm";
import ProductTable from "./ProductTable";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import DoughnutChart from "./DoughnutChart";
import ProductOverview from "./ProductOverview";

export default function Main({props}) 
{
    return (
        <div className="w-full flex flex-col align-middle justify-start p-12 pt-0npm r pb-34 h-[200vh]">
            <div className="flex justify-start  mb-12 w-full">
                {/* Total Asset Value Section */}
                <div className="flex items-center border-r justify-start align-middle w-1/3">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                            <span className="material-icons text-blue-500 text-2xl">
                                euro
                            </span>
                        </div>
                        <div className="flex flex-col pl-4 justify-center">
                            <p className="mt-2 text-gray-500 text-sm">
                                PRECIO TOTAL INVENTARIO
                            </p>
                            <p className="text-xl font-bold text-gray-800">
                                {props.total_precio.toFixed(2)}€
                            </p>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                    <div className="flex">
                    <div className="pl-12">
                        <DoughnutChart
                            inStock={props.disponible}
                            lowStock={props.lowStock}
                            outOfStock={props.agotado}
                        />
                    </div>
                <div className="flex flex-col pl-6 justify-center relative">
                    <p className="text-lg font-semibold text-gray-800">
                        {props.total_productos} producto{props.total_productos !== 1 ? "s" : ""}
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-teal-500 mr-2"></span>
                            <p className="text-sm text-gray-500">
                                Disponible:{" "}
                                <span className="text-gray-800 font-medium">
                                    {props.disponible}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                            <p className="text-sm text-gray-500">
                                Stock bajo:{" "}
                                <span className="text-gray-800 font-medium">
                                    {props.lowStock}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                            <p className="text-sm text-gray-500">
                                Agotado:{" "}
                                <span className="text-gray-800 font-medium">
                                    {props.agotado}
                                </span>
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <hr />
            <ProductOverview/>
            <ProductTable props={props}/>
        </div>
    );
}
