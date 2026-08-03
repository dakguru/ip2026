import jsPDF from "jspdf";

/**
 * Runtime loader that embeds the "Palatino Linotype" TrueType font into a jsPDF
 * document. The .ttf files live in `public/fonts/` and are fetched + base64
 * encoded on first use, then cached for subsequent PDFs in the same session.
 *
 * jsPDF ships only helvetica / times / courier, so a serif like Palatino has to
 * be embedded. If the fetch/registration fails for any reason, callers fall back
 * to the built-in serif ("times") via the boolean return value.
 */

export const PALATINO = "PalatinoLinotype";

let regularB64: string | null = null;
let boldB64: string | null = null;

/** Base path for the font assets (absolute on native, root-relative on web). */
function fontUrl(filename: string): string {
    const isNative =
        typeof window !== "undefined" &&
        (window as any).Capacitor?.isNativePlatform?.();
    return isNative ? `https://dakguru.com/fonts/${filename}` : `/fonts/${filename}`;
}

/** Fetch a binary asset and return it as a base64 string. */
async function fetchAsBase64(url: string): Promise<string> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch font: ${url} (${res.status})`);
    const buf = new Uint8Array(await res.arrayBuffer());
    let binary = "";
    const chunk = 0x8000;
    for (let i = 0; i < buf.length; i += chunk) {
        binary += String.fromCharCode(...buf.subarray(i, i + chunk));
    }
    return btoa(binary);
}

/**
 * Registers Palatino Linotype (normal + bold) on the given document.
 * Returns `true` when the font is available, `false` when the caller should
 * fall back to a built-in font.
 */
export async function registerPalatino(doc: jsPDF): Promise<boolean> {
    try {
        if (!regularB64) regularB64 = await fetchAsBase64(fontUrl("PalatinoLinotype-Regular.ttf"));
        if (!boldB64) boldB64 = await fetchAsBase64(fontUrl("PalatinoLinotype-Bold.ttf"));

        doc.addFileToVFS("PalatinoLinotype-Regular.ttf", regularB64);
        doc.addFont("PalatinoLinotype-Regular.ttf", PALATINO, "normal");
        doc.addFileToVFS("PalatinoLinotype-Bold.ttf", boldB64);
        doc.addFont("PalatinoLinotype-Bold.ttf", PALATINO, "bold");
        return true;
    } catch (e) {
        console.warn("Palatino Linotype load failed; falling back to times", e);
        return false;
    }
}
