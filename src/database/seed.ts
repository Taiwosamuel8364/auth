import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User],
    synchronize: true,
  });

  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);

  // Check if data already exists
  const count = await userRepository.count();
  if (count > 0) {
    console.log('Database already seeded');
    await dataSource.destroy();
    return;
  }

  // Seed users
  const users = [
    {
      name: 'John Doe',
      username: 'john',
      password: 'password123', // In production, hash this!
    },
    {
      name: 'Jane Smith',
      username: 'jane',
      password: 'password456', // In production, hash this!
    },
    {
      name: 'Admin User',
      username: 'admin',
      password: 'admin123', // In production, hash this!
    },
  ];

  await userRepository.save(users);
  console.log('✅ Database seeded successfully!');

  await dataSource.destroy();
}

seed()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
