import { newSpecPage } from '@stencil/core/testing';
import { HhFileUpload } from './file-upload';

function makeFile(name: string, size: number, type = 'text/plain'): File {
  const file = new File(['x'.repeat(size)], name, { type });
  return file;
}

describe('hh-file-upload', () => {
  it('accepts a valid file and emits hhFilesChange', async () => {
    const page = await newSpecPage({ components: [HhFileUpload], html: '<hh-file-upload accept=".txt"></hh-file-upload>' });
    const instance = page.rootInstance as HhFileUpload;
    const spy = jest.fn();
    page.root?.addEventListener('hhFilesChange', (e: Event) => spy((e as CustomEvent<File[]>).detail));
    (instance as unknown as { addFiles: (files: File[]) => void }).addFiles([makeFile('notes.txt', 10)]);
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
    expect(page.root?.textContent).toContain('notes.txt');
  });

  it('rejects a file with a disallowed extension', async () => {
    const page = await newSpecPage({ components: [HhFileUpload], html: '<hh-file-upload accept=".txt"></hh-file-upload>' });
    const instance = page.rootInstance as HhFileUpload;
    const spy = jest.fn();
    page.root?.addEventListener('hhFileError', (e: Event) => spy((e as CustomEvent).detail));
    (instance as unknown as { addFiles: (files: File[]) => void }).addFiles([makeFile('photo.png', 10, 'image/png')]);
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
    expect(page.root?.textContent).not.toContain('photo.png');
  });

  it('rejects a file over maxSizeBytes', async () => {
    const page = await newSpecPage({ components: [HhFileUpload], html: '<hh-file-upload max-size-bytes="5"></hh-file-upload>' });
    const instance = page.rootInstance as HhFileUpload;
    const spy = jest.fn();
    page.root?.addEventListener('hhFileError', (e: Event) => spy((e as CustomEvent).detail));
    (instance as unknown as { addFiles: (files: File[]) => void }).addFiles([makeFile('big.txt', 100)]);
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
  });
});
