import inventory from './assets/inventory.svg';

function Header() {
    return (
        <>
          <header className = "bg-white shadow-md p-4">
            <div className = "max-w-7xl mx-auto flex items-center justify-between">

                <div className="flex items-center sapace-x-3">
                    <img src={inventory} alt="Inventory Logo" className="h-10 w-10"/>

                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-gray-800">Inventory Pro</h1>
                        <p className="text-gray-600">Manage your store products</p>
                    </div>
                </div>

                <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer">
                    + Add a Product
                </button>

            </div>  
          </header> 

          <div className="h-1 w-full bg-gray-100"></div> 
        </>
    );
}

export default Header;


