import type { Favorite } from "../models/Favorite";
import { apiHandle, HEADERS } from "./helper";
import { API_BASE_URL } from "./constants";

/**
 * Gets all favorites
 * @returns Array of all favorites
 */
export async function getFavorites(): Promise<Favorite[]> {
    const res = await fetch(`${API_BASE_URL}/favorites`);
    return apiHandle<Favorite[]>(res);
}

/**
 * Creates a new favorite
 * @param favorite - New favorite data
 * @returns The created favorite
 */

export async function createFavorite(favorite: Favorite): Promise<Favorite> {
    const res = await fetch(`${API_BASE_URL}/favorites`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(favorite),
    });
    return apiHandle<Favorite>(res);
}

/**
 * Deletes a favorite
 * @param favorite - Favorite to delete
 */
export async function deleteFavorite(favorite: Favorite): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/favorites/${favorite.vin}`, {
        method: "DELETE",
        headers: HEADERS,
    });
    if (!res.ok) {
        throw new Error(`Delete failed: ${res.status} ${res.statusText}`);
    }
}
