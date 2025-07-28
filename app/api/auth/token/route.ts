import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
 
export async function GET() {
  const { userId } = await auth(); 
  
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 }); 
  }
 
  const token = userId;
  
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 }); 
  }

  return new NextResponse(token);
}
