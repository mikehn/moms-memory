import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { AppError } from '../../utils/error.utils'

/**
 * Uploads a user media file to Firebase Storage under the "shared-media" folder.
 * Returns the download URL for the uploaded file.
 *
 * @param userId - The ID of the user uploading the file.
 * @param file - The file to be uploaded.
 * @returns A promise that resolves with the file's download URL.
 */
export const uploadUserMedia = (
  userId: string,
  file: File
): Promise<string> => {
  return uploadFile(`shared-media/${userId}/`, file)
}

/**
 * Uploads a file to Firebase Storage under the specified path.
 * Returns the download URL for the uploaded file.
 *
 * @param path - The storage path where the file should be saved.
 * @param file - The file to be uploaded.
 * @returns A promise that resolves with the file's download URL.
 */
export const uploadFile = async (path: string, file: File): Promise<string> => {
  const storage = getStorage()
  const uniqueName = `${Date.now()}-${file.name}` // Create a unique filename
  const storageRef = ref(storage, `${path}${uniqueName}`)
  const snapshot = await uploadBytes(storageRef, file)
  return await getDownloadURL(snapshot.ref)
}

/**
 * Deletes a user's media file from Firebase Storage.
 *
 * @param userId - The ID of the user who owns the file.
 * @param fileName - The name of the file to be deleted.
 * @returns A promise that resolves when the file is successfully deleted.
 */
export const deleteByLocation = async (location: string): Promise<void> => {
  try {
    const storage = getStorage()
    const fileRef = ref(storage, location)
    await deleteObject(fileRef)
    console.log(`File ${location} deleted successfully`)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw new AppError(`Failed to delete file ${location}`, 'DELETE_FAIL', {
      error
    })
  }
}
