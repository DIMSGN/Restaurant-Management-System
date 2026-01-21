SET NAMES utf8mb4;

-- ΚΡΕΑΤΑ & ΘΑΛΑΣΣΙΝΑ
INSERT INTO products (name, category, unit, stock, purchase_price, sale_price) VALUES
('Χοιρινό καρέ', 'Κρέατα', 'kg', 25.00, 8.50, 12.00),
('Μοσχάρι για μαγείρεμα', 'Κρέατα', 'kg', 20.00, 12.00, 18.00),
('Κοτόπουλο φιλέτο', 'Κρέατα', 'kg', 30.00, 6.50, 9.50),
('Κιμάς μοσχαρίσιος', 'Κρέατα', 'kg', 15.00, 9.00, 13.50),
('Μπριζόλες χοιρινές', 'Κρέατα', 'kg', 18.00, 7.50, 11.00),
('Γαρίδες μεγάλες', 'Θαλασσινά', 'kg', 8.00, 18.00, 28.00),
('Καλαμάρι φρέσκο', 'Θαλασσινά', 'kg', 10.00, 12.00, 19.00),
('Χταπόδι', 'Θαλασσινά', 'kg', 6.00, 14.00, 22.00),
('Φέτα ΠΟΠ', 'Γαλακτοκομικά', 'kg', 12.00, 9.50, 14.00),

-- ΛΑΧΑΝΙΚΑ
('Ντομάτες', 'Λαχανικά', 'kg', 30.00, 1.20, 2.50),
('Κρεμμύδια', 'Λαχανικά', 'kg', 25.00, 0.80, 1.50),
('Σκόρδο', 'Λαχανικά', 'kg', 8.00, 4.50, 7.00),
('Πιπεριές πράσινες', 'Λαχανικά', 'kg', 15.00, 2.00, 3.50),
('Μελιτζάνες', 'Λαχανικά', 'kg', 20.00, 1.50, 2.80),
('Πατάτες', 'Λαχανικά', 'kg', 50.00, 0.60, 1.20),
('Κολοκυθάκια', 'Λαχανικά', 'kg', 18.00, 1.80, 3.20),
('Αγγούρι', 'Λαχανικά', 'kg', 15.00, 1.20, 2.30),
('Μαρούλι', 'Λαχανικά', 'τεμ', 20.00, 0.80, 1.50),

-- ΓΑΛΑΚΤΟΚΟΜΙΚΑ & ΤΥΡΙΑ
('Γάλα φρέσκο', 'Γαλακτοκομικά', 'liters', 15.00, 1.20, 2.00),
('Βούτυρο', 'Γαλακτοκομικά', 'kg', 8.00, 6.50, 10.00),
('Κρέμα γάλακτος', 'Γαλακτοκομικά', 'liters', 10.00, 4.50, 7.50),
('Γιαούρτι στραγγιστό', 'Γαλακτοκομικά', 'kg', 12.00, 3.50, 6.00),
('Γραβιέρα', 'Γαλακτοκομικά', 'kg', 8.00, 10.00, 16.00),
('Ανθότυρο', 'Γαλακτοκομικά', 'kg', 6.00, 8.00, 12.50),

-- ΖΥΜΑΡΙΚΑ & ΡΥΖΙ
('Μακαρόνια Νο2', 'Ζυμαρικά', 'kg', 25.00, 1.80, 3.50),
('Κριθαράκι', 'Ζυμαρικά', 'kg', 18.00, 2.20, 4.00),
('Ρύζι καρολίνα', 'Όσπρια & Δημητριακά', 'kg', 30.00, 1.50, 2.80),
('Τραχανάς', 'Ζυμαρικά', 'kg', 10.00, 3.50, 6.50),
('Χυλοπίτες', 'Ζυμαρικά', 'kg', 12.00, 3.00, 5.50),

-- ΟΣΠΡΙΑ
('Φακές', 'Όσπρια & Δημητριακά', 'kg', 20.00, 2.50, 4.50),
('Φασόλια γίγαντες', 'Όσπρια & Δημητριακά', 'kg', 15.00, 3.00, 5.50),
('Ρεβίθια', 'Όσπρια & Δημητριακά', 'kg', 12.00, 2.80, 5.00),
('Φασόλια μαυρομάτικα', 'Όσπρια & Δημητριακά', 'kg', 10.00, 2.50, 4.50),

-- ΕΛΑΙΟΛΑΔΟ & ΛΑΔΙΑ
('Ελαιόλαδο εξαιρετικό παρθένο', 'Έλαια & Λίπη', 'liters', 35.00, 6.50, 12.00),
('Ηλιέλαιο', 'Έλαια & Λίπη', 'liters', 20.00, 2.50, 4.50),

-- ΜΠΑΧΑΡΙΚΑ & ΑΡΩΜΑΤΑ
('Αλάτι', 'Μπαχαρικά', 'kg', 15.00, 0.50, 1.00),
('Πιπέρι μαύρο', 'Μπαχαρικά', 'grams', 2.00, 8.00, 15.00),
('Ρίγανη', 'Μπαχαρικά', 'grams', 1.50, 5.00, 10.00),
('Δυόσμος', 'Μπαχαρικά', 'grams', 1.00, 4.00, 8.00),
('Κανέλα', 'Μπαχαρικά', 'grams', 1.20, 6.00, 12.00),
('Δάφνη', 'Μπαχαρικά', 'grams', 0.80, 3.50, 7.00),
('Μοσχοκάρυδο', 'Μπαχαρικά', 'grams', 0.60, 10.00, 18.00),

-- ΑΛΛΑ ΥΛΙΚΑ
('Λεμόνια', 'Φρούτα', 'kg', 12.00, 1.50, 2.80),
('Ελιές Καλαμών', 'Κονσέρβες', 'kg', 10.00, 4.50, 8.00),
('Τοματοπολτός', 'Κονσέρβες', 'kg', 15.00, 2.50, 4.50),
('Μέλι', 'Άλλα', 'kg', 8.00, 8.00, 14.00),
('Ξίδι', 'Έλαια & Λίπη', 'liters', 10.00, 1.50, 3.00),
('Κρασί λευκό', 'Ποτά', 'liters', 12.00, 3.50, 7.00),
('Κρασί κόκκινο', 'Ποτά', 'liters', 12.00, 3.50, 7.00),
('Αυγά', 'Γαλακτοκομικά', 'τεμ', 60.00, 0.25, 0.50),
('Μαϊντανός', 'Μπαχαρικά', 'grams', 2.00, 2.00, 4.00),
('Άνηθος', 'Μπαχαρικά', 'grams', 1.50, 2.50, 5.00);

-- =====================================================
-- ΣΥΝΤΑΓΕΣ (RECIPES)
-- =====================================================

INSERT INTO recipes (name, sale_price, description) VALUES
-- ΚΥΡΙΑ ΠΙΑΤΑ
('Μουσακάς', 15.50, 'Παραδοσιακός μουσακάς με μελιτζάνες, πατάτες, κιμά και μπεσαμέλ'),
('Παστίτσιο', 14.00, 'Κλασικό παστίτσιο με κιμά, μακαρόνια και κρέμα'),
('Γεμιστά', 12.50, 'Ντομάτες και πιπεριές γεμιστές με ρύζι και κιμά'),
('Παπουτσάκια', 13.50, 'Μελιτζάνες γεμιστές με κιμά και μπεσαμέλ'),

-- ΚΟΤΟΠΟΥΛΟ
('Κοτόπουλο λεμονάτο', 11.00, 'Φιλέτο κοτόπουλο με σάλτσα λεμονιού και μυρωδικά'),
('Κοτόπουλο κοκκινιστό', 10.50, 'Κοτόπουλο με κόκκινη σάλτσα ντομάτας'),

-- ΧΟΙΡΙΝΟ
('Χοιρινό με σέλινο αυγολέμονο', 13.50, 'Χοιρινό καρέ μαγειρεμένο με σέλερι και αυγολέμονο'),
('Μπριζόλες χοιρινές σχάρας', 12.00, 'Μπριζόλες χοιρινές ψημένες στη σχάρα με ρίγανη'),

-- ΜΟΣΧΑΡΙ
('Μοσχάρι κοκκινιστό', 16.00, 'Μοσχάρι μαγειρεμένο με κόκκινη σάλτσα ντομάτας'),
('Γιουβέτσι', 15.00, 'Μοσχάρι με κριθαράκι στο φούρνο'),

-- ΘΑΛΑΣΣΙΝΑ
('Γαρίδες σαγανάκι', 18.50, 'Γαρίδες με φέτα και ντομάτα στο φούρνο'),
('Καλαμαράκια τηγανιτά', 14.50, 'Καλαμαράκια τηγανητά με λεμόνι'),
('Χταπόδι κρασάτο', 17.00, 'Χταπόδι μαγειρεμένο με κόκκινο κρασί'),

-- ΟΣΠΡΙΑ & ΛΑΔΕΡΑ
('Φακές σούπα', 7.50, 'Σούπα φακές με λαχανικά και ξίδι'),
('Φασόλια γίγαντες πλακί', 9.00, 'Φασόλια γίγαντες στο φούρνο με ντομάτα'),
('Ρεβυθάδα', 8.50, 'Ρεβίθια στο φούρνο με λεμόνι'),

-- ΣΑΛΑΤΕΣ
('Χωριάτικη σαλάτα', 7.00, 'Ντομάτα, αγγούρι, φέτα, ελιές, κρεμμύδι'),
('Μαρούλι σαλάτα', 6.00, 'Μαρούλι με λάδι-λεμόνι');

-- =====================================================
-- ΥΛΙΚΑ ΣΥΝΤΑΓΩΝ (RECIPE_INGREDIENTS)
-- =====================================================

-- ΜΟΥΣΑΚΑΣ (id=1)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 1, id, 0.500 FROM products WHERE name = 'Κιμάς μοσχαρίσιος';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 1, id, 0.600 FROM products WHERE name = 'Μελιτζάνες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 1, id, 0.400 FROM products WHERE name = 'Πατάτες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 1, id, 0.150 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 1, id, 0.200 FROM products WHERE name = 'Ντομάτες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 1, id, 0.500 FROM products WHERE name = 'Γάλα φρέσκο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 1, id, 0.080 FROM products WHERE name = 'Βούτυρο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 1, id, 0.100 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';

-- ΠΑΣΤΙΤΣΙΟ (id=2)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 2, id, 0.500 FROM products WHERE name = 'Κιμάς μοσχαρίσιος';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 2, id, 0.400 FROM products WHERE name = 'Μακαρόνια Νο2';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 2, id, 0.600 FROM products WHERE name = 'Γάλα φρέσκο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 2, id, 0.100 FROM products WHERE name = 'Βούτυρο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 2, id, 0.150 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 2, id, 0.150 FROM products WHERE name = 'Ντομάτες';

-- ΓΕΜΙΣΤΑ (id=3)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 3, id, 0.800 FROM products WHERE name = 'Ντομάτες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 3, id, 0.400 FROM products WHERE name = 'Πιπεριές πράσινες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 3, id, 0.300 FROM products WHERE name = 'Κιμάς μοσχαρίσιος';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 3, id, 0.200 FROM products WHERE name = 'Ρύζι καρολίνα';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 3, id, 0.100 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 3, id, 0.100 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';

-- ΠΑΠΟΥΤΣΑΚΙΑ (id=4)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 4, id, 0.600 FROM products WHERE name = 'Μελιτζάνες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 4, id, 0.400 FROM products WHERE name = 'Κιμάς μοσχαρίσιος';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 4, id, 0.150 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 4, id, 0.200 FROM products WHERE name = 'Ντομάτες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 4, id, 0.400 FROM products WHERE name = 'Γάλα φρέσκο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 4, id, 0.080 FROM products WHERE name = 'Βούτυρο';

-- ΚΟΤΟΠΟΥΛΟ ΛΕΜΟΝΑΤΟ (id=5)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 5, id, 0.500 FROM products WHERE name = 'Κοτόπουλο φιλέτο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 5, id, 0.150 FROM products WHERE name = 'Λεμόνια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 5, id, 0.080 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 5, id, 0.050 FROM products WHERE name = 'Ρίγανη';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 5, id, 0.020 FROM products WHERE name = 'Σκόρδο';

-- ΚΟΤΟΠΟΥΛΟ ΚΟΚΚΙΝΙΣΤΟ (id=6)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 6, id, 0.600 FROM products WHERE name = 'Κοτόπουλο φιλέτο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 6, id, 0.300 FROM products WHERE name = 'Τοματοπολτός';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 6, id, 0.100 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 6, id, 0.080 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';

-- ΧΟΙΡΙΝΟ ΜΕ ΣΕΛΙΝΟ ΑΥΓΟΛΕΜΟΝΟ (id=7)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 7, id, 0.500 FROM products WHERE name = 'Χοιρινό καρέ';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 7, id, 0.150 FROM products WHERE name = 'Λεμόνια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 7, id, 2.000 FROM products WHERE name = 'Αυγά';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 7, id, 0.100 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 7, id, 0.080 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';

-- ΜΠΡΙΖΟΛΕΣ ΧΟΙΡΙΝΕΣ ΣΧΑΡΑΣ (id=8)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 8, id, 0.600 FROM products WHERE name = 'Μπριζόλες χοιρινές';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 8, id, 0.050 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 8, id, 0.050 FROM products WHERE name = 'Λεμόνια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 8, id, 0.030 FROM products WHERE name = 'Ρίγανη';

-- ΜΟΣΧΑΡΙ ΚΟΚΚΙΝΙΣΤΟ (id=9)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 9, id, 0.600 FROM products WHERE name = 'Μοσχάρι για μαγείρεμα';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 9, id, 0.300 FROM products WHERE name = 'Τοματοπολτός';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 9, id, 0.150 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 9, id, 0.100 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 9, id, 0.100 FROM products WHERE name = 'Κρασί κόκκινο';

-- ΓΙΟΥΒΕΤΣΙ (id=10)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 10, id, 0.600 FROM products WHERE name = 'Μοσχάρι για μαγείρεμα';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 10, id, 0.300 FROM products WHERE name = 'Κριθαράκι';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 10, id, 0.300 FROM products WHERE name = 'Τοματοπολτός';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 10, id, 0.100 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 10, id, 0.100 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';

-- ΓΑΡΙΔΕΣ ΣΑΓΑΝΑΚΙ (id=11)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 11, id, 0.400 FROM products WHERE name = 'Γαρίδες μεγάλες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 11, id, 0.150 FROM products WHERE name = 'Φέτα ΠΟΠ';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 11, id, 0.200 FROM products WHERE name = 'Ντομάτες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 11, id, 0.080 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 11, id, 0.050 FROM products WHERE name = 'Κρεμμύδια';

-- ΚΑΛΑΜΑΡΑΚΙΑ ΤΗΓΑΝΙΤΑ (id=12)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 12, id, 0.500 FROM products WHERE name = 'Καλαμάρι φρέσκο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 12, id, 0.100 FROM products WHERE name = 'Λεμόνια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 12, id, 0.200 FROM products WHERE name = 'Ηλιέλαιο';

-- ΧΤΑΠΟΔΙ ΚΡΑΣΑΤΟ (id=13)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 13, id, 0.600 FROM products WHERE name = 'Χταπόδι';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 13, id, 0.200 FROM products WHERE name = 'Κρασί κόκκινο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 13, id, 0.100 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 13, id, 0.050 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 13, id, 0.100 FROM products WHERE name = 'Τοματοπολτός';

-- ΦΑΚΕΣ ΣΟΥΠΑ (id=14)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 14, id, 0.300 FROM products WHERE name = 'Φακές';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 14, id, 0.100 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 14, id, 0.100 FROM products WHERE name = 'Ντομάτες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 14, id, 0.020 FROM products WHERE name = 'Σκόρδο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 14, id, 0.080 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 14, id, 0.050 FROM products WHERE name = 'Ξίδι';

-- ΦΑΣΟΛΙΑ ΓΙΓΑΝΤΕΣ ΠΛΑΚΙ (id=15)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 15, id, 0.400 FROM products WHERE name = 'Φασόλια γίγαντες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 15, id, 0.200 FROM products WHERE name = 'Τοματοπολτός';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 15, id, 0.100 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 15, id, 0.100 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 15, id, 0.050 FROM products WHERE name = 'Μαϊντανός';

-- ΡΕΒΥΘΑΔΑ (id=16)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 16, id, 0.400 FROM products WHERE name = 'Ρεβίθια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 16, id, 0.100 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 16, id, 0.100 FROM products WHERE name = 'Λεμόνια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 16, id, 0.100 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';

-- ΧΩΡΙΑΤΙΚΗ ΣΑΛΑΤΑ (id=17)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 17, id, 0.300 FROM products WHERE name = 'Ντομάτες';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 17, id, 0.200 FROM products WHERE name = 'Αγγούρι';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 17, id, 0.150 FROM products WHERE name = 'Φέτα ΠΟΠ';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 17, id, 0.080 FROM products WHERE name = 'Ελιές Καλαμών';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 17, id, 0.050 FROM products WHERE name = 'Κρεμμύδια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 17, id, 0.080 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';

-- ΜΑΡΟΥΛΙ ΣΑΛΑΤΑ (id=18)
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 18, id, 1.000 FROM products WHERE name = 'Μαρούλι';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 18, id, 0.050 FROM products WHERE name = 'Λεμόνια';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 18, id, 0.050 FROM products WHERE name = 'Ελαιόλαδο εξαιρετικό παρθένο';
INSERT INTO recipe_ingredients (recipe_id, product_id, amount) 
SELECT 18, id, 0.030 FROM products WHERE name = 'Άνηθος';

-- =====================================================
-- ΤΕΛΟΣ SCRIPT
-- =====================================================

-- Έλεγχος αποτελεσμάτων
SELECT 'Products Inserted:', COUNT(*) FROM products;
SELECT 'Recipes Inserted:', COUNT(*) FROM recipes;
SELECT 'Recipe Ingredients Inserted:', COUNT(*) FROM recipe_ingredients;

-- Προβολή δείγματος
SELECT 
    r.name AS 'Συνταγή',
    r.sale_price AS 'Τιμή (€)',
    COUNT(ri.id) AS 'Αριθμός Υλικών'
FROM recipes r
LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
GROUP BY r.id, r.name, r.sale_price
ORDER BY r.name;
