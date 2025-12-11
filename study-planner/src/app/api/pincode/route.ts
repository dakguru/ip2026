import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

// Path to the CSV file
const CSV_PATH = path.join(process.cwd(), "src", "data", "Pincode Directory.csv");

// Structure of the CSV Data
interface PincodeData {
    officename: string;
    pincode: string;
    divisionname: string;
    regionname: string;
    circlename: string;
    statename: string;
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const pincode = searchParams.get("pincode");

        if (!pincode || pincode.length < 6) {
            return NextResponse.json({ error: "Invalid Pincode" }, { status: 400 });
        }

        // Read the file - synchronous reading is acceptable for this file size (~20MB) in this context
        // Ideally, we'd cache this or use a database.
        if (!fs.existsSync(CSV_PATH)) {
            return NextResponse.json({ error: "Pincode Directory not found" }, { status: 500 });
        }

        const fileContent = fs.readFileSync(CSV_PATH, "utf-8");

        // Parse CSV
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        }) as PincodeData[];

        // Filter by pincode
        const results = records.filter(record => record.pincode === pincode);

        if (results.length === 0) {
            return NextResponse.json({ found: false, message: "No offices found for this pincode" });
        }

        // Map to a cleaner format
        const offices = results.map(r => ({
            name: r.officename,
            division: r.divisionname,
            circle: r.statename, // User asked for Circle to be fetched from State column
            region: r.regionname
        }));

        return NextResponse.json({
            found: true,
            offices: offices
        });

    } catch (error) {
        console.error("Pincode API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
