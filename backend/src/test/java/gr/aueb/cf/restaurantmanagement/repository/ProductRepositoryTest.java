package gr.aueb.cf.restaurantmanagement.repository;

import gr.aueb.cf.restaurantmanagement.model.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ProductRepositoryTest {

    private final ProductRepository productRepository;

    @Autowired
    public ProductRepositoryTest(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    private Product existingProduct = new Product();

    @BeforeEach
    public void setup() {
        createDummyData();
    }

    @Test
    void persistAndGetProduct() {
        Product product = new Product();
        product.setName("Ντομάτα");
        product.setCategory("Λαχανικά");
        product.setUnit("kg");
        product.setStock(BigDecimal.valueOf(50.0));
        product.setPurchasePrice(BigDecimal.valueOf(1.20));
        product.setSalePrice(BigDecimal.valueOf(2.50));
        productRepository.save(product);

        List<Product> products = productRepository.findByCategory("Λαχανικά");
        assertEquals(2, products.size());
    }

    @Test
    void updateProduct() {
        Product productToUpdate = productRepository.findById(existingProduct.getId()).orElseThrow();

        productToUpdate.setStock(BigDecimal.valueOf(100.0));
        productToUpdate.setSalePrice(BigDecimal.valueOf(3.00));
        productRepository.save(productToUpdate);

        Product updatedProduct = productRepository.findById(existingProduct.getId()).orElseThrow();
        assertEquals(BigDecimal.valueOf(100.0), updatedProduct.getStock());
        assertEquals(BigDecimal.valueOf(3.00), updatedProduct.getSalePrice());
    }

    @Test
    void deleteProduct() {
        Long productId = existingProduct.getId();
        productRepository.deleteById(productId);

        Optional<Product> deletedProduct = productRepository.findById(productId);
        assertFalse(deletedProduct.isPresent());
    }

    @Test
    void findByCategory() {
        List<Product> products = productRepository.findByCategory("Λαχανικά");
        assertFalse(products.isEmpty());
        assertEquals("Λαχανικά", products.get(0).getCategory());
    }

    @Test
    void findByName() {
        Optional<Product> product = productRepository.findByName("Πατάτα");
        assertTrue(product.isPresent());
        assertEquals("Πατάτα", product.get().getName());
    }

    private void createDummyData() {
        existingProduct = new Product();
        existingProduct.setName("Πατάτα");
        existingProduct.setCategory("Λαχανικά");
        existingProduct.setUnit("kg");
        existingProduct.setStock(BigDecimal.valueOf(30.0));
        existingProduct.setPurchasePrice(BigDecimal.valueOf(0.80));
        existingProduct.setSalePrice(BigDecimal.valueOf(1.50));
        productRepository.save(existingProduct);
    }
}
