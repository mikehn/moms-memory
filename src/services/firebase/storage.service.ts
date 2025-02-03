// src/services/storageService.ts
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const uploadUserMedia = (
  userId: string,
  file: File
): Promise<string> => {
  return uploadFile(`shared-media/${userId}/`, file)
}

/**
 * Uploads a file to Firebase Storage under the "shared-media" folder.
 * Returns the download URL for the uploaded file.
 *
 * @param file - The file to be uploaded.
 * @returns A promise that resolves with the file's download URL.
 */
export const uploadFile = async (path: string, file: File): Promise<string> => {
  const storage = getStorage() // Ensure your Firebase app is initialized
  const uniqueName = `${Date.now()}-${file.name}` // Create a unique filename
  const storageRef = ref(storage, `${path}${uniqueName}`)
  const snapshot = await uploadBytes(storageRef, file)
  return await getDownloadURL(snapshot.ref)
}
