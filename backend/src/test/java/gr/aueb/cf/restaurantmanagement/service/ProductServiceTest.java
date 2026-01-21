package gr.aueb.cf.restaurantmanagement.service;

import gr.aueb.cf.restaurantmanagement.dto.ProductRequest;
import gr.aueb.cf.restaurantmanagement.dto.ProductResponse;
import gr.aueb.cf.restaurantmanagement.exception.ResourceAlreadyExistsException;
import gr.aueb.cf.restaurantmanagement.exception.ResourceNotFoundException;
import gr.aueb.cf.restaurantmanagement.model.Product;
import gr.aueb.cf.restaurantmanagement.repository.ProductRepository;
import gr.aueb.cf.restaurantmanagement.util.EntityMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
class ProductServiceTest {

    private final ProductService productService;
    private final ProductRepository productRepository;
    private final EntityMapper mapper;

    @Autowired
    public ProductServiceTest(ProductService productService, ProductRepository productRepository, EntityMapper mapper) {
        this.productService = productService;
        this.productRepository = productRepository;
        this.mapper = mapper;
    }

    private ProductRequest productRequest;
    private Product existingProduct = new Product();

    @BeforeEach
    void setup() {
        createDummyData();
    }

    @Test
    void createProduct() {
        ProductRequest request = new ProductRequest();
        request.setName("Τυρί Φέτα");
        request.setCategory("Γαλακτοκομικά");
        request.setUnit("kg");
        request.setStock(BigDecimal.valueOf(20.0));
        request.setPurchasePrice(BigDecimal.valueOf(8.50));
        request.setSalePrice(BigDecimal.valueOf(12.00));

        ProductResponse response = productService.createProduct(request);

        assertNotNull(response);
        assertEquals("Τυρί Φέτα", response.getName());
        assertEquals("Γαλακτοκομικά", response.getCategory());
    }

    @Test
    void createProduct_shouldThrowException_whenProductExists() {
        ProductRequest request = new ProductRequest();
        request.setName("Πατάτες");
        request.setCategory("Λαχανικά");
        request.setUnit("kg");
        request.setStock(BigDecimal.valueOf(30.0));
        request.setPurchasePrice(BigDecimal.valueOf(0.80));
        request.setSalePrice(BigDecimal.valueOf(1.50));

        assertThrows(ResourceAlreadyExistsException.class, () -> productService.createProduct(request));
    }

    @Test
    void getAllProducts() {
        List<ProductResponse> products = productService.getAllProducts();
        assertFalse(products.isEmpty());
    }

    @Test
    void getProductById() {
        ProductResponse response = productService.getProductById(existingProduct.getId());

        assertNotNull(response);
        assertEquals("Πατάτες", response.getName());
    }

    @Test
    void getProductById_shouldThrowException_whenNotFound() {
        assertThrows(ResourceNotFoundException.class, () -> productService.getProductById(9999L));
    }

    @Test
    void updateProduct() {
        ProductRequest request = new ProductRequest();
        request.setName("Πατάτες");
        request.setCategory("Λαχανικά");
        request.setUnit("kg");
        request.setStock(BigDecimal.valueOf(100.0));
        request.setPurchasePrice(BigDecimal.valueOf(0.90));
        request.setSalePrice(BigDecimal.valueOf(2.00));

        ProductResponse response = productService.updateProduct(existingProduct.getId(), request);

        assertEquals(BigDecimal.valueOf(100.0), response.getStock());
        assertEquals(BigDecimal.valueOf(2.00), response.getSalePrice());
    }

    @Test
    void deleteProduct() {
        Long productId = existingProduct.getId();
        productService.deleteProduct(productId);

        assertThrows(ResourceNotFoundException.class, () -> productService.getProductById(productId));
    }

    private void createDummyData() {
        Product product = new Product();
        product.setName("Πατάτες");
        product.setCategory("Λαχανικά");
        product.setUnit("kg");
        product.setStock(BigDecimal.valueOf(50.0));
        product.setPurchasePrice(BigDecimal.valueOf(0.80));
        product.setSalePrice(BigDecimal.valueOf(1.50));
        existingProduct = productRepository.save(product);
    }
}
