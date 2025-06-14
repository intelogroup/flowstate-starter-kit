
import { googleOAuthService } from './googleOAuthService';

export interface DriveFolder {
  id: string;
  name: string;
  path: string;
  parentId?: string;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  webViewLink: string;
  downloadUrl: string;
  createdTime: string;
}

export interface UploadResult {
  file: DriveFile;
  folder: DriveFolder;
  success: boolean;
  error?: string;
}

class DriveService {
  private async getAuthHeaders(): Promise<Record<string, string>> {
    const status = await googleOAuthService.getServiceStatus();
    if (!status.connected) {
      throw new Error('Google Drive not connected. Please authenticate first.');
    }
    
    // In production, would get actual access token
    return {
      'Authorization': 'Bearer mock_access_token',
      'Content-Type': 'application/json'
    };
  }

  async createFolder(name: string, parentId?: string): Promise<DriveFolder> {
    try {
      console.log(`Creating folder "${name}" with parent: ${parentId}`);
      
      // Mock folder creation for development
      const mockFolder: DriveFolder = {
        id: `folder_${Date.now()}`,
        name,
        path: parentId ? `/EmailAttachments/${name}` : `/EmailAttachments`,
        parentId
      };
      
      console.log('Folder created:', mockFolder);
      return mockFolder;
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  async ensureFolderExists(path: string): Promise<DriveFolder> {
    try {
      console.log(`Ensuring folder exists: ${path}`);
      
      // Mock folder lookup/creation
      const pathParts = path.split('/').filter(Boolean);
      let currentPath = '';
      let parentId: string | undefined;
      
      for (const part of pathParts) {
        currentPath += `/${part}`;
        // In production, would check if folder exists
        parentId = `folder_${part}_${Date.now()}`;
      }
      
      return {
        id: parentId || `folder_${Date.now()}`,
        name: pathParts[pathParts.length - 1] || 'EmailAttachments',
        path,
        parentId
      };
    } catch (error) {
      console.error('Error ensuring folder exists:', error);
      throw error;
    }
  }

  async uploadFile(
    file: Blob, 
    filename: string, 
    folderId: string, 
    mimeType: string
  ): Promise<DriveFile> {
    try {
      console.log(`Uploading file "${filename}" to folder ${folderId}`);
      
      // Mock file upload for development
      const mockFile: DriveFile = {
        id: `file_${Date.now()}`,
        name: filename,
        mimeType,
        size: file.size,
        webViewLink: `https://drive.google.com/file/d/mock_file_id/view`,
        downloadUrl: `https://drive.google.com/uc?id=mock_file_id`,
        createdTime: new Date().toISOString()
      };
      
      console.log('File uploaded successfully:', mockFile);
      return mockFile;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async generateFolderPath(flowName: string, date: Date = new Date()): Promise<string> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Default format: /EmailAttachments/FlowName/YYYY/MM/DD
    return `/EmailAttachments/${flowName}/${year}/${month}/${day}`;
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.getAuthHeaders();
      console.log('Google Drive connection test successful');
      return true;
    } catch (error) {
      console.error('Google Drive connection test failed:', error);
      return false;
    }
  }
}

export const driveService = new DriveService();
