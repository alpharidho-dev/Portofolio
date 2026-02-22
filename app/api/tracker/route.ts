import { NextResponse } from 'next/server';
import { techStack } from '@/app/components/sections/Tracker';

export async function GET() {
    // This is a placeholder API.
    // The user can replace this with their own API or database fetch logic later.
    return NextResponse.json(techStack);
}
