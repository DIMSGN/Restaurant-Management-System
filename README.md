# Restaurant Management System

Σύστημα διαχείρισης εστιατορίου με React + Spring Boot + MySQL.

## Προαπαιτούμενα

- **Java 17+** 
- **MySQL 8.0+** 
- **Node.js 18+** 
- **IntelliJ IDEA** 
- **WebStorm ή VS Code** 

### Δημιούργησε τη Βάση

## MySQL Workbench**

- Άνοιξε MySQL Workbench
- Συνδέσου με τα credentials σου.
- Δεξί κλικ στο κενό χώρο στο "Schemas" → "Create Schema"
- Όνομα: `final_projectdb`
- Charset: `utf8mb4`, Collation: `utf8mb4_unicode_ci`
- Click "Apply"

### Βάλε τα credentials  

- Άνοιξε IntelliJ → Άνοιξε φάκελο `backend/`
- Πήγαινε: `backend/src/main/resources/application.properties`
- Βάλε με τα MySQL credentials που χρησιμοποιήσες μετά τα ':'
spring.datasource.username=${MYSQL_USER:}
spring.datasource.password=${MYSQL_PASSWORD:}

### Ξεκίνησε Backend (IntelliJ) 
- Περίμενε Gradle sync
- Βρες `RestaurantManagementApplication.java`
- Πάτα το **Play** button 

 Backend: **http://localhost:8080** (Spring Boot)

   http://localhost:8080/swagger-ui.html


### Ξεκίνησε Frontend (WebStorm / VS Code)

**WebStorm:**
- Άνοιξε φάκελο `frontend/`
- Επίλεξε **npm install** (πρώτη φορά μόνο)
- Στο `package.json` → Δεξί κλικ στο script **dev** → Επίλεξε **Run**
- Ή: Άνοιξε Terminal και τρέξε `npm run dev`

**VS Code:**
- Άνοιξε integrated Terminal στο φακελο frontend
- Τρέξε `npm install && npm run build` (πρώτη φορά μόνο)
- Τρέξε `npm run dev`

 Frontend: **http://localhost:5173** (Vite Dev Server)

### Άνοιξε Browser

Πήγαινε: **http://localhost:5173**

 Login: `admin` / `admin123`
        `waiter` / `waiter123`

---

## Εισαγωγή Ελληνικού Μενού

Για να εισάγεις το ελληνικό μενού με προϊόντα και συνταγές:

 Άνοιξε Terminal στο φάκελο `backend/`
 Τρέξε την εντολή:
 
```bash
mysql -u root -p final_projectdb --default-character-set=utf8mb4 < greek-menu-data.sql
```

 Βάλε το MySQL password σου όταν σου ζητηθεί




