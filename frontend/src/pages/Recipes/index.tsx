import { useRecipes } from "./useRecipes";
import { useConfirmDialog } from "@/components/ConfirmDialog";
import { useAuth } from "@/hooks";
import RecipeForm from "./RecipeForm";
import RecipeList from "./RecipeList";
import { TableSkeleton } from "@/components/ui/loading-skeletons";
import { Info } from "lucide-react";

function Recipes() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const {
    recipes,
    products,
    loading,
    error,
    formData,
    editingId,
    selectedProductId,
    ingredientAmount,
    setSelectedProductId,
    setIngredientAmount,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    updateField,
    addIngredient,
    removeIngredient,
    getProductById,
  } = useRecipes();

  const { confirm } = useConfirmDialog();

  const onDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Delete Recipe",
      message: "Are you sure you want to delete this recipe? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
    });
    
    if (confirmed) {
      handleDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
          Recipes Management
        </h1>
        <TableSkeleton rows={5} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Recipes Management
        </h1>
        <p className="text-gray-600">Create and manage your delicious recipes</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      {!isAdmin && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-700 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1" style={{ color: '#000' }}>View-Only Mode</p>
              <p style={{ color: '#000' }}>
                Μπορείς να δεις τις συνταγές αλλά όχι να τις επεξεργαστείς. Μόνο οι χρήστες με ρόλο <strong>ADMIN</strong> μπορούν να δημιουργήσουν, επεξεργαστούν ή διαγράψουν συνταγές. Επικοινώνησε με τον διαχειριστή για δικαιώματα.
              </p>
            </div>
          </div>
        </div>
      )}

      {isAdmin && (
        <RecipeForm
          formData={formData}
          editingId={editingId}
          products={products}
          selectedProductId={selectedProductId}
          ingredientAmount={ingredientAmount}
          onProductSelect={setSelectedProductId}
          onAmountChange={setIngredientAmount}
          onAddIngredient={addIngredient}
          onRemoveIngredient={removeIngredient}
          getProductById={getProductById}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          onFieldChange={updateField}
        />
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-between">
          <span>Recipes List</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-base">
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
          </span>
        </h2>
        <RecipeList
          recipes={recipes}
          onEdit={handleEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default Recipes;
