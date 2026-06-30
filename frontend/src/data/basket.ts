import { apiHandle, HEADERS } from "./helper";
import { API_BASE_URL } from "./constants";
import type { Basket } from "../models/basket";

/**
 * Gets all cars
 * @returns Array of all cars
 */
export async function getBasket(): Promise<Basket[]> {
    const res = await fetch(`${API_BASE_URL}/basket`);
    return apiHandle<Basket[]>(res);
}

/**
 * Creates a new car
 * @param car - New car data
 * @returns The created car
 */

export async function createBasket(basket: Basket): Promise<Basket> {
    const res = await fetch(`${API_BASE_URL}/basket`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(basket),
    });
    return apiHandle<Basket>(res);
}

/**
 * Updates a car partially
 * @param vin - Vehicle Identification Number of the car to update
 * @param car - Partial car data to update
 * @returns The updated car
 */
export async function updateBasket(basket: Basket): Promise<Basket> {
    const res = await fetch(`${API_BASE_URL}/basket/${basket.vin}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify(basket),
    });
    return apiHandle<Basket>(res);
}

/**
 * Replaces a car completely
 * @param vin - Vehicle Identification Number of the car to replace
 * @param car - New car data
 * @returns The updated car
 */
export async function replaceBasket(basket: Basket): Promise<Basket> {
    const res = await fetch(`${API_BASE_URL}/basket/${basket.vin}`, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(basket),
    });
    return apiHandle<Basket>(res);
}

/**
 * Deletes a car by VIN
 * @param vin - Vehicle Identification Number of the car to delete
 */
export async function deleteBasket(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/basket/${id}`, {
        method: "DELETE",
        headers: HEADERS,
    });
    if (!res.ok) {
        throw new Error(`Delete failed: ${res.status} ${res.statusText}`);
    }
}
