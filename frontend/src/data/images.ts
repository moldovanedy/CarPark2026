import type { Image } from "../models/Image";
import { API_BASE_URL } from "./constants";
import { apiHandle } from "./helper";

/**
 * Uploads an image file to the backend as multipart/form-data
 * @param file - The image file to upload
 * @returns The stored image's file name and url
 */
export async function uploadImage(file: File): Promise<Image> {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API_BASE_URL}/images`, {
        method: "POST",
        body: formData,
    });
    return apiHandle<Image>(res);
}
