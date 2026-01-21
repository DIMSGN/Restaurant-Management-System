package gr.aueb.cf.restaurantmanagement.service;

import gr.aueb.cf.restaurantmanagement.dto.ProductRequest;
import gr.aueb.cf.restaurantmanagement.dto.ProductResponse;
import gr.aueb.cf.restaurantmanagement.exception.ResourceNotFoundException;
import gr.aueb.cf.restaurantmanagement.exception.ResourceAlreadyExistsException;
import gr.aueb.cf.restaurantmanagement.model.Product;
import gr.aueb.cf.restaurantmanagement.repository.ProductRepository;
import gr.aueb.cf.restaurantmanagement.util.EntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final EntityMapper mapper;

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        if (productRepository.findByName(request.getName()).isPresent()) {
            throw new ResourceAlreadyExistsException("Product with name '" + request.getName() + "' already exists");
        }

        Product product = Product.create(
            request.getName(),
            request.getCategory(),
            request.getUnit(),
            request.getStock(),
            request.getPurchasePrice(),
            request.getSalePrice()
        );

        Product saved = productRepository.save(product);
        return mapper.mapProductToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAllOrderByName().stream()
                .map(mapper::mapProductToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProductsPaged(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(mapper::mapProductToResponse);
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return mapper.mapProductToResponse(product);
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        productRepository.findByName(request.getName()).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new ResourceAlreadyExistsException("Product with name '" + request.getName() + "' already exists");
            }
        });

        product.setName(request.getName());
        product.setCategory(request.getCategory());

        if (request.getUnit() != null) {
            product.setUnit(request.getUnit());
        }
        if (request.getStock() != null) {
            product.setStock(request.getStock());
        }
        if (request.getPurchasePrice() != null) {
            product.setPurchasePrice(request.getPurchasePrice());
        }
        if (request.getSalePrice() != null) {
            product.setSalePrice(request.getSalePrice());
        }

        Product updated = productRepository.save(product);
        return mapper.mapProductToResponse(updated);
    }

    @Transactional
    public ProductResponse updateStock(Long id, BigDecimal quantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        product.setStock(quantity);
        Product updated = productRepository.save(product);
        return mapper.mapProductToResponse(updated);
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}
