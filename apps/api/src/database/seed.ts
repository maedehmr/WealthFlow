import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../app.module';
import { UsersRepository } from '../users/users.repository';

const SEED_EMAIL = 'maedeh@gmail.com';
const SEED_PASSWORD = 'M@edeh1234';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersRepository = app.get(UsersRepository);

  const existing = await usersRepository.findByEmail(SEED_EMAIL);
  if (existing) {
    console.log(`User ${SEED_EMAIL} already exists, skipping seed.`);
    await app.close();
    return;
  }

  const hashedPassword = await bcrypt.hash(SEED_PASSWORD, 10);
  await usersRepository.create({
    email: SEED_EMAIL,
    password: hashedPassword,
  });

  console.log(`Seeded user ${SEED_EMAIL}.`);
  await app.close();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
