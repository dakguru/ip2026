import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'postal-updates.json');

        if (!fs.existsSync(DATA_FILE_PATH)) {
            return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        const updates = JSON.parse(fileContent);

        const update = updates.find((u: any) => u.id === id);

        if (!update) {
            return NextResponse.json({ error: 'Update not found' }, { status: 404 });
        }

        return NextResponse.json(update);
    } catch (error) {
        console.error("Error fetching update:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
