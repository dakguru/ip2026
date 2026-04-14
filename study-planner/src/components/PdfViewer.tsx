"use client";

import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import PdfReader from './pdf-reader/PdfReader';

interface PdfViewerProps {
    url: string;
    darkMode?: boolean;
}

export default function PdfViewer({ url, darkMode = false }: PdfViewerProps) {
    const [isAndroid, setIsAndroid] = useState(false);
    const [liquidModePref, setLiquidModePref] = useState(false);

    useEffect(() => {
        const platform = Capacitor.getPlatform();
        const android = platform === 'android';
        setIsAndroid(android);

        if (android) {
            const savedPref = localStorage.getItem('liquidModePref');
            setLiquidModePref(savedPref === 'true');
        }
    }, []);

    // Support for Google Drive Embeds
    if (url && url.includes('drive.google.com')) {
        const embedUrl = url.includes('/preview') ? url : url.replace(/\/view.*/, '/preview');
        return (
            <div className="w-full h-full bg-zinc-900 flex flex-col">
                <iframe
                    src={embedUrl}
                    className="flex-1 w-full h-full border-0"
                    title="Document Viewer"
                    allow="autoplay"
                />
            </div>
        );
    }

    const title = url.split('/').pop()?.replace(/%20/g, ' ') || 'Document';

    return (
        <PdfReader 
            url={url} 
            title={title}
            isAndroid={isAndroid}
            initialLiquidMode={liquidModePref}
        />
    );
}
