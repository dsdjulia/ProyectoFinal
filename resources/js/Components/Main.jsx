import ProductRegistrationForm from "./ProductRegistrationForm"
import ProductTable from "./ProductTable"
import Header from "./Header"
import Footer from "./Footer"
import Sidebar from "./Sidebar"

export default function Main() {
  return (
      <div className="w-5/6  flex flex-col  ml-40 align-center justify-center  ">
        <ProductRegistrationForm />
        <ProductTable />
         <Footer />
    </div>
  )
}
