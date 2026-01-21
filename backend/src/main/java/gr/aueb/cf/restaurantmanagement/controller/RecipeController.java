package gr.aueb.cf.restaurantmanagement.controller;

import gr.aueb.cf.restaurantmanagement.dto.RecipeRequest;
import gr.aueb.cf.restaurantmanagement.dto.RecipeResponse;
import gr.aueb.cf.restaurantmanagement.service.RecipeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@Tag(name = "Recipes", description = "Recipe management")
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @PostMapping
    @Operation(summary = "Create recipe (Admin)")
    public ResponseEntity<RecipeResponse> createRecipe(@Valid @RequestBody RecipeRequest request) {
        return new ResponseEntity<>(recipeService.createRecipe(request), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all recipes")
    public ResponseEntity<List<RecipeResponse>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @GetMapping("/paged")
    @Operation(summary = "Get all recipes (paginated)")
    public ResponseEntity<Page<RecipeResponse>> getAllRecipesPaged(Pageable pageable) {
        return ResponseEntity.ok(recipeService.getAllRecipesPaged(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get recipe by ID")
    public ResponseEntity<RecipeResponse> getRecipeById(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update recipe (Admin)")
    public ResponseEntity<RecipeResponse> updateRecipe(@PathVariable Long id, @Valid @RequestBody RecipeRequest request) {
        return ResponseEntity.ok(recipeService.updateRecipe(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete recipe (Admin)")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }
}
