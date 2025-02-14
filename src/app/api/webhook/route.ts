import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs-extra";
import path from "path";

const SECRET = process.env.WEBHOOK_SECRET || "my-secret-key"; 

// Define the JSON file path
const DB_FILE = path.join(process.cwd(), "src/app/db.json");

// 🔐 Validate request signature
function isValidSignature(payload: string, signature: string | null): boolean {
    if (!signature) return false;
    const computedSignature = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    console.log(computedSignature)
    return signature === computedSignature;
}


// 📝 Save event data to JSON file
async function saveToDatabase(newEvent: { eventType: string; data: any }) {
    try {
        let db: any[] = [];
        if (fs.existsSync(DB_FILE)) {
             await fs.promises.readFile(DB_FILE, 'utf-8');
        }

        // Add new event
        db.push(newEvent);

        // Save updated data
        await fs.writeJson(DB_FILE, db, { spaces: 2 });
    } catch (error) {
        console.error("Database Save Error:", error);
    }
}

export async function POST(request: NextRequest) {
    try {
        const rawBody = await request.text();
        const signature = request.headers.get("x-signature");
        if (!isValidSignature(rawBody, signature)) {
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 403 });
        }
        const body = JSON.parse(rawBody);

        const { eventType, data } = body;

        if (!eventType || !data) {
            return NextResponse.json({ success: false, error: "Invalid data format" }, { status: 400 });
        }
        await saveToDatabase({ eventType, data });
        return NextResponse.json({ success: true, message: "Received" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}



