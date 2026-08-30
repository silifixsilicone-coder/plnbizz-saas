import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
} from 'firebase/storage';
import { storage } from './firebase';
import { StorageImageData } from '@/types/landing-page';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export interface UploadResult {
  url: string;
  storagePath: string;
  name: string;
  size: number;
}

/**
 * Validate image file type and size
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: 'Please select a valid image.' };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return { valid: false, error: 'Only JPG, PNG, and WEBP images are supported.' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: 'Image size must be less than 10 MB.' };
  }

  return { valid: true };
};

/**
 * Generate unique predictable filename
 */
export const generateUniqueFileName = (originalName: string): string => {
  const ext = originalName.split('.').pop() || 'png';
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  return `img-${timestamp}-${randomId}.${ext.toLowerCase()}`;
};

/**
 * Upload image to Firebase Storage with progress tracking
 */
export const uploadImageToStorage = (
  file: File,
  folderPath: string,
  onProgress?: (progressPct: number) => void
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return reject(new Error(validation.error || 'Invalid file.'));
    }

    const uniqueFileName = generateUniqueFileName(file.name);
    const cleanFolder = folderPath.replace(/\/+$/, '');
    const fullPath = `${cleanFolder}/${uniqueFileName}`;
    const storageRef = ref(storage, fullPath);

    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) {
          onProgress(progress);
        }
      },
      (error) => {
        console.error('Storage Upload Error:', error);
        reject(new Error('Image upload failed. Please try again.'));
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            url: downloadUrl,
            storagePath: fullPath,
            name: file.name,
            size: file.size,
          });
        } catch (err) {
          reject(new Error('Failed to retrieve image download URL.'));
        }
      }
    );
  });
};

/**
 * Delete image from Firebase Storage
 */
export const deleteImageFromStorage = async (storagePath: string): Promise<void> => {
  if (!storagePath || !storagePath.includes('landing-pages/')) {
    return; // Safety guard: Do not attempt to delete external URLs
  }

  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error: any) {
    // Ignore object-not-found errors gracefully
    if (error.code !== 'storage/object-not-found') {
      console.error('Failed to delete storage file:', error);
    }
  }
};

/**
 * Replace image in Firebase Storage: Uploads new image FIRST, then deletes old image.
 */
export const replaceImageInStorage = async (
  newFile: File,
  oldStoragePath?: string,
  folderPath: string = 'landing-pages/general',
  onProgress?: (progressPct: number) => void
): Promise<UploadResult> => {
  // Step 1: Upload new image first to prevent broken state
  const newUploadResult = await uploadImageToStorage(newFile, folderPath, onProgress);

  // Step 2: Only after successful upload, delete old storage file
  if (oldStoragePath) {
    try {
      await deleteImageFromStorage(oldStoragePath);
    } catch (err) {
      console.warn('Could not delete previous storage image:', err);
    }
  }

  return newUploadResult;
};

/**
 * List all uploaded media files from Storage for Admin Media Library
 */
export const listAllStorageMedia = async (folderPath: string = 'landing-pages'): Promise<StorageImageData[]> => {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);

    const items: StorageImageData[] = [];

    // Recursive subfolders listing
    for (const prefix of result.prefixes) {
      const subItems = await listAllStorageMedia(prefix.fullPath);
      items.push(...subItems);
    }

    for (const itemRef of result.items) {
      try {
        const url = await getDownloadURL(itemRef);
        const meta = await getMetadata(itemRef);
        items.push({
          url,
          storagePath: itemRef.fullPath,
          name: meta.name,
          size: meta.size,
          type: meta.contentType,
          uploadedAt: meta.timeCreated,
        });
      } catch (err) {
        // Skip unreadable item
      }
    }

    return items;
  } catch (error) {
    console.error('Error listing storage media:', error);
    return [];
  }
};
