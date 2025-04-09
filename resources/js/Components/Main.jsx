import ProductRegistrationForm from "./ProductRegistrationForm"
import ProductTable from "./ProductTable"
import Header from "./Header"
import Footer from "./Footer"

export default function Main() {
  return (
    <div className="flex-1 flex flex-col">
      <Header />

      <div className="flex-1 bg-gray-100 p-4">
        <ProductRegistrationForm />
        <ProductTable />
      </div>

      <Footer />
    </div>
  )
}
