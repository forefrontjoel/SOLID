class LocalFileStorage {
  constructor(private directory: string) {}

  saveFileToLocal(filename: string, content: string): { success: boolean } {
    console.log(`Saving file ${filename} to local directory ${this.directory}`);
    console.log(`Content: ${content}`);
    return { success: true };
  }

  getFileFromLocal(filename: string): string | null {
    console.log(`Reading file ${filename} from ${this.directory}`);

    return "This is the content of the file from local storage";
  }
}

class CloudStorage {
  constructor(private bucketId: number) {}

  saveFileToCloud(filename: string, content: string): { url: string } {
    console.log(`Uploading file ${filename} to cloud bucket ${this.bucketId}`);
    console.log(`Content: ${content}`);
    return {
      url: `https://storage.cloud.com/bucket-${this.bucketId}/${filename}`,
    };
  }

  getFileFromCloud(filename: string): { content: string } {
    console.log(`Downloading file ${filename} from bucket ${this.bucketId}`);

    return {
      content: "This is the content of the file from cloud storage",
    };
  }
}

interface Document {
  id: string;
  title: string;
  content: string;
}

class DocumentService {
  private localStorage: LocalFileStorage;

  constructor() {
    this.localStorage = new LocalFileStorage("/documents");
  }

  saveDocument(document: Document): void {
    const filename = `${document.id}.txt`;
    const content = `${document.title}\n\n${document.content}`;

    const result = this.localStorage.saveFileToLocal(filename, content);

    if (!result.success) {
      throw new Error("Failed to save document locally");
    }
  }

  getDocument(id: string): string | null {
    const filename = `${id}.txt`;
    return this.localStorage.getFileFromLocal(filename);
  }
}

export { DocumentService, LocalFileStorage, CloudStorage, Document };

// Uppgift 1
// Testa att börja byta ut LocalFileStorage mot CloudStorage och se vad som behöver ändras I DocumentService.

// Uppgift 2
// Refaktorera koden så att den följer Dependency Inversion Principle så att det enklare går att byta ut LocalFileStorage mot CloudStorage.
// Skapa abstraktioner (interfaces) som high-level moduler kan bero på.
// Använd dependency injection för att injicera konkreta implementationer.

// Uppgift 3
// Kolla i bad-storage.test.ts vilka problem i testen som kan uppstå om DIP inte följs.
// Se om du kan få alla test att köra genom att ändra DocumentService att använda CloudStorage istället för LocalFileStorage.
