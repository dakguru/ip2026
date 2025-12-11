import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the data file
const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'postal-updates.json');

// Helper to read data
function getPostalUpdates() {
    if (!fs.existsSync(DATA_FILE_PATH)) {
        return [];
    }
    const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    try {
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
}

// GET: Fetch all updates
export async function GET() {
    const updates = getPostalUpdates();
    return NextResponse.json(updates);
}

// POST: Create a new update
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, date, category, description, link } = body;

        if (!title || !date || !category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const updates = getPostalUpdates();

        const newUpdate = {
            id: crypto.randomUUID(),
            title,
            date,
            category,
            description: description || "",
            link: link || "#"
        };

        // Add to beginning of array
        updates.unshift(newUpdate);

        // Save back to file
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updates, null, 2));

        return NextResponse.json({ success: true, update: newUpdate });

    } catch (error) {
        console.error('Failed to save update:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}


// DELETE: Delete an update by ID
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Missing update ID' },
                { status: 400 }
            );
        }

        let updates = getPostalUpdates();
        const initialLength = updates.length;
        updates = updates.filter((u: any) => u.id !== id);

        if (updates.length === initialLength) {
            return NextResponse.json(
                { error: 'Update not found' },
                { status: 404 }
            );
        }

        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updates, null, 2));

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Failed to delete update:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
