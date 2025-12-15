import { useState } from 'react';
import Header from "./Header.tsx"
import ProductSummary from "./ProductSummary.tsx"
import ProductSummaryChart from "./ProductSummaryChart.tsx"
import ProductSearch from "./ProductSearch.tsx"
import ProductsTable from "./ProductsTable.tsx"

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category);
  };

  return (
    <>
      <Header/>
      <ProductSummary/>
      <ProductSummaryChart/>
      <ProductSearch 
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
      />
      <ProductsTable 
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
      />
    </>
  )
}

export default App