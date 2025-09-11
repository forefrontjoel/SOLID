import { DocumentService, Document } from "./bad-storage";

describe("DocumentService (Dåligt exempel - Svårt att testa)", () => {
  let documentService: DocumentService;

  beforeEach(() => {
    // Problem: Vi kan inte enkelt mocka storage eftersom DocumentService
    // skapar sin egen LocalFileStorage instans internt
    documentService = new DocumentService();
  });

  describe("saveDocument", () => {
    it("should save a document successfully", () => {
      const document: Document = {
        id: "test-123",
        title: "Test Document",
        content: "This is test content",
      };

      // Detta test kommer faktiskt att försöka spara till det riktiga filsystemet
      // eller åtminstone anropa de riktiga LocalFileStorage metoderna
      // Vi kan inte enkelt verifiera vad som sparades eller mocka storage-beteendet
      expect(() => documentService.saveDocument(document)).not.toThrow();
    });

    it("should throw error when save fails", () => {
      const document: Document = {
        id: "test-123",
        title: "Test Document",
        content: "This is test content",
      };

      // Problem: Vi kan inte enkelt simulera ett sparfel eftersom vi inte kan mocka
      // LocalFileStorage.saveFileToLocal metoden
      // LocalFileStorage returnerar alltid { success: true }
      // Vi skulle behöva modifiera LocalFileStorage klassen eller använda komplex mockning
      expect(() => documentService.saveDocument(document)).toThrow();
    });
  });

  describe("getDocument", () => {
    it("should retrieve a document", () => {
      // Problem: Vi kan inte kontrollera vilket innehåll som returneras
      // LocalFileStorage returnerar alltid samma hårdkodade sträng
      // Vi kan inte testa olika scenarier (fil inte hittad, olika innehåll, etc.)
      const content = documentService.getDocument("test-123");

      expect(content).toBe(
        "This is the content of the file from local storage"
      );
    });

    it("should return null when document not found", () => {
      // Problem: Vi kan inte testa "inte hittad"-scenariot eftersom
      // LocalFileStorage.getFileFromLocal alltid returnerar samma hårdkodade sträng
      // Vi skulle behöva modifiera LocalFileStorage klassen för att stödja detta testfall
      const content = documentService.getDocument("non-existent");

      // Detta kommer alltid att misslyckas eftersom LocalFileStorage alltid returnerar samma sträng
      expect(content).toBe(null);
    });
  });
});
