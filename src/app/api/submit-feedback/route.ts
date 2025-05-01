import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create a PostgreSQL connection pool with direct connection string
const pool = new Pool({
    connectionString: "postgresql://postgres.uulexbhqdrzdalcddwni:ntu3d1gpJxHlBp6Y@aws-0-ap-south-1.pooler.supabase.com:5432/postgres",
});

export async function POST(request: Request) {
    try {
        // Get form data from request
        const { product, email, message } = await request.json();

        // Validate data
        if (!product || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Connect to the database and insert the feedback
        const client = await pool.connect();
        try {
            await client.query(
                'INSERT INTO "daifFeedback" (product, email, message) VALUES ($1, $2, $3)',
                [product, email, message]
            );

            return NextResponse.json({ success: true }, { status: 201 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 