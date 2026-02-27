import { registerPlugin } from '@capacitor/core';

export interface PdfDownloaderPlugin {
    downloadPdf(options: { url: string; filename?: string }): Promise<void>;
    addListener(eventName: 'downloadProgress', listenerFunc: (data: { status: string, progress: number }) => void): Promise<any>;
}

const PdfDownloader = registerPlugin<PdfDownloaderPlugin>('PdfDownloader');

export default PdfDownloader;
