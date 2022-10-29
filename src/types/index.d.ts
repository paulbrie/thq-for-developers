declare module "*.md" {
  const value: string; // markdown is just a string
  export default value;
}

declare namespace THQ {
  interface Subfolder {
    name: string;
    files: File[];
    subFolders: Subfolder[];
  }

  interface File {
    name: string;
    fileType: string;
    content: string;
  }

  interface ProjectFiles {
    name: string;
    files: File[];
    subFolders: Subfolder[];
  }
}
