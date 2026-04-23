const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

// Required Adapter for Prisma 7.x in script context
const pool = new Pool({ connectionString: "postgresql://neondb_owner:npg_j3JwbGvpKLS4@ep-restless-darkness-andluoap.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require" });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@ngo.org";
  const password = "password123"; 
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log(`Admin created/verified: ${admin.email}`);
  console.log(`Credentials: admin@ngo.org / password123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
