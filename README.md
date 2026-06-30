# CarPark

This is a car dealer manager.

## Endpoints

### /api/cars

- **GET**
  Gets a list of cars
- **POST**
  Adds a car
- **PATCH**
  Updates a car, param cars/:vin
- **PUT**
  Edit a car, param cars/:vin
- **DELETE**
  Delete a car, param cars/:vin

Each car is identified by its **vin**. Changes are persisted to **backend/db.jsonc**.

### /api/images

Images can be accessed via this endpoint
for example `http://localhost:3000/api/images/dacia-spring.png`

Upload images via this endpoint
for example `http://localhost:3000/api/images`

### /api/basket

Basket functionality

### /api/favorites

Favorites functionality

# WORKSHOP

## Recommendations

1. Use at least one checkbox.
2. Use Accordion / dropdown for filters.
3. Use Typescript.
4. Use Flex / Grid for layout.

# TODOs

Continue the CarPark application.
Please be creative and develop a unique layout.

1. Extend the search bar to search cars by manufacturer / model / etc. (Only frontend)

2. Implement add to basket functionality and create a basket page that must contain the list of vehicles with details and images and the totals.

3. Define the navigation menu for the application.

4. Save the basket items and the list of orders to local storage.

5. Use the API endpoint for search.

6. Use the API for the basket functionality (add, remove, etc.)

7. Use the API for the favorites functionality (add, remove, etc.)

8. Implement quick view with more details for cars (modal / dialog). (Move car information from row to modal).

9. Create an admin page to manage cars

10. Integrate the image upload functionality in the process of saving a new car.

11. Add banners, promotions in the application.
