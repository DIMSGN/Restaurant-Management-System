package gr.aueb.cf.restaurantmanagement.service;

import gr.aueb.cf.restaurantmanagement.dto.RecipeIngredientRequest;
import gr.aueb.cf.restaurantmanagement.dto.RecipeRequest;
import gr.aueb.cf.restaurantmanagement.dto.RecipeResponse;
import gr.aueb.cf.restaurantmanagement.exception.ResourceAlreadyExistsException;
import gr.aueb.cf.restaurantmanagement.exception.ResourceNotFoundException;
import gr.aueb.cf.restaurantmanagement.model.Recipe;
import gr.aueb.cf.restaurantmanagement.model.Product;
import gr.aueb.cf.restaurantmanagement.repository.ProductRepository;
import gr.aueb.cf.restaurantmanagement.repository.RecipeRepository;
import gr.aueb.cf.restaurantmanagement.util.EntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;
    private final EntityMapper mapper;

    @Transactional
    public RecipeResponse createRecipe(RecipeRequest request) {
        if (recipeRepository.findByName(request.getName()).isPresent()) {
            throw new ResourceAlreadyExistsException("Recipe with name " + request.getName() + " already exists");
        }

        Recipe recipe = Recipe.create(
            request.getName(),
            request.getSalePrice(),
            request.getDescription()
        );

        Recipe saved = recipeRepository.save(recipe);

        for (RecipeIngredientRequest ingredientReq : request.getIngredients()) {
            Product product = productRepository.findById(ingredientReq.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + ingredientReq.getProductId()));

            saved.addIngredient(product, ingredientReq.getAmount());
        }

        saved = recipeRepository.save(saved);
        return mapper.mapRecipeToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<RecipeResponse> getAllRecipes() {
        return recipeRepository.findAllWithIngredientsEager().stream()
                .map(mapper::mapRecipeToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Page<RecipeResponse> getAllRecipesPaged(Pageable pageable) {
        return recipeRepository.findAllWithIngredientsEagerPaged(pageable)
                .map(mapper::mapRecipeToResponse);
    }

    @Transactional(readOnly = true)
    public RecipeResponse getRecipeById(Long id) {
        Recipe recipe = recipeRepository.findByIdWithIngredientsEager(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + id));
        return mapper.mapRecipeToResponse(recipe);
    }

    @Transactional
    public RecipeResponse updateRecipe(Long id, RecipeRequest request) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + id));

        recipeRepository.findByName(request.getName()).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new ResourceAlreadyExistsException("Recipe with name " + request.getName() + " already exists");
            }
        });

        recipe.setName(request.getName());
        recipe.setSalePrice(request.getSalePrice());
        recipe.setDescription(request.getDescription());

        recipe.getIngredients().clear();

        for (RecipeIngredientRequest ingredientReq : request.getIngredients()) {
            Product product = productRepository.findById(ingredientReq.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + ingredientReq.getProductId()));

            recipe.addIngredient(product, ingredientReq.getAmount());
        }

        Recipe updated = recipeRepository.save(recipe);
        return mapper.mapRecipeToResponse(updated);
    }

    @Transactional
    public void deleteRecipe(Long id) {
        if (!recipeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Recipe not found with id: " + id);
        }
        recipeRepository.deleteById(id);
    }
}
