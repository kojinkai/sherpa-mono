import { PrismaClient } from './generated/client';

const prisma = new PrismaClient();

async function testWatchlistTrigger() {
  try {
    console.log('🧪 Testing Watchlist Trigger...');
    
    // Create a test user
    const testUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User'
      }
    });
    
    console.log('✅ User created:', testUser);
    
    // Check if watchlist was automatically created
    const watchlist = await prisma.watchlist.findUnique({
      where: { userId: testUser.id },
      include: { user: true }
    });
    
    if (watchlist) {
      console.log('✅ Watchlist automatically created:', watchlist);
      console.log('✅ Trigger is working correctly!');
    } else {
      console.log('❌ Watchlist was not created automatically');
    }
    
    // Clean up test data
    await prisma.user.delete({
      where: { id: testUser.id }
    });
    
    console.log('🧹 Test data cleaned up');
    
  } catch (error) {
    console.error('❌ Error testing trigger:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testWatchlistTrigger();
