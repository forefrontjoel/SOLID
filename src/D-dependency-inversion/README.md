# Dependency Inversion Principle (DIP)

Kolla koden i bad-storage och diskutera innan ni läser här.

**Problemet**: `DocumentService` klassen är direkt kopplad till konkreta lagringsimplementationer (`LocalFileStorage` och `CloudStorage`). I bad-storage-exemplet returnerar även funktionerna i de implementerade klasserna olika typer. Detta skapar flera problem:

1. **Tight Coupling**: DocumentService kan inte fungera utan att veta exakt vilken storage som används
2. **Svår testning**: Det är svårt att mocka storage för enhetstester
3. **Svår utbytbarthet**: Att byta storage kräver ändringar i DocumentService klassen
4. **Bryter mot Open/Closed Principle**: Vi måste modifiera befintlig kod för att lägga till nya storage-typer
5. **Olika interfaces**: LocalFileStorage och CloudStorage har olika method-signaturer, return-typer och konstruktor-parametrar

Detta bryter mot Dependency Inversion Principle som säger att high-level moduler inte ska bero på low-level moduler. Båda ska bero på abstraktioner.

_SPOILERS NEDANFÖR_

**En lösning**: Skapa ett interface som definierar lagringsoperationer och låt DocumentService bero på detta interface istället för konkreta implementationer. Använd dependency injection för att injicera rätt implementation.

```typescript
// Abstraktion som både high-level och low-level moduler kan bero på
interface Storage {
  saveFile(filename: string, content: string): boolean;
  getFile(filename: string): string | null;
}

// High-level modul som nu beror på abstraktion
class DocumentService {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  saveDocument(document: Document): void {
    const filename = `${document.id}.txt`;
    const content = `${document.title}\n\n${document.content}`;
    const success = this.storage.saveFile(filename, content);
    if (!success) {
      throw new Error("Failed to save document");
    }
  }

  getDocument(id: string): string | null {
    const filename = `${id}.txt`;
    return this.storage.getFile(filename);
  }
}

// Low-level moduler implementerar abstraktionen
class LocalFileStorage implements Storage {
  private directory: string;

  constructor(directory: string) {
    this.directory = directory;
  }

  saveFile(filename: string, content: string): boolean {
    const result = this.saveFileToLocal(filename, content);
    return result.success;
  }

  getFile(filename: string): string | null {
    return this.getFileFromLocal(filename);
  }

  private saveFileToLocal(
    filename: string,
    content: string
  ): { success: boolean } {
    console.log(`Saving file ${filename} to local directory ${this.directory}`);
    return { success: true };
  }

  private getFileFromLocal(filename: string): string | null {
    console.log(`Reading file ${filename} from ${this.directory}`);
    return "This is the content of the file from local storage";
  }
}

class CloudStorage implements Storage {
  private bucketId: number;

  constructor(bucketId: number) {
    this.bucketId = bucketId;
  }

  saveFile(filename: string, content: string): boolean {
    const result = this.saveFileToCloud(filename, content);
    return result.url !== null;
  }

  getFile(filename: string): string | null {
    const result = this.getFileFromCloud(filename);
    return result.content;
  }

  private saveFileToCloud(filename: string, content: string): { url: string } {
    console.log(`Uploading file ${filename} to cloud bucket ${this.bucketId}`);
    return {
      url: `https://storage.cloud.com/bucket-${this.bucketId}/${filename}`,
    };
  }

  private getFileFromCloud(filename: string): { content: string } {
    console.log(`Downloading file ${filename} from bucket ${this.bucketId}`);
    return { content: "This is the content of the file from cloud storage" };
  }
}

// Användning med dependency injection
const localStorage = new LocalFileStorage("/documents");
const documentService = new DocumentService(localStorage);

// Eller med CloudStorage
const cloudStorage = new CloudStorage(12345);
const cloudDocumentService = new DocumentService(cloudStorage);

// För testning kan vi enkelt mocka
class MockStorage implements Storage {
  saveFile(filename: string, content: string): boolean {
    console.log(`Mock: Saving ${filename}`);
    return true;
  }

  getFile(filename: string): string | null {
    console.log(`Mock: Reading ${filename}`);
    return "mock content";
  }
}

const mockStorage = new MockStorage();
const testDocumentService = new DocumentService(mockStorage);
```

## Fördelar med denna lösning:

1. **Lös koppling**: DocumentService vet inte vilken storage som används
2. **Enkel testning**: Mocka interface istället för konkreta klasser
3. **Flexibilitet**: Byt storage utan att ändra DocumentService
4. **Standardiserat interface**: Alla storage-typer följer samma kontrakt
5. **Följer SOLID**: Följer även OCP vilket gör det enklare att lägga till nya typer av lagring
