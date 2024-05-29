import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.post.update({
        where: {
          slug: 'my-first-post',
        },
        data: {
          comments: {
            createMany: {
              data: [
                { comment: 'Great post!' },
                { comment: "Can't wait to read more!" },
              ],
            },
          },
        },
      })
      const posts = await prisma.post.findMany({
        include: {
          comments: true,
        },
      })
    
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.dir(posts, { depth: Infinity })
  console.dir(allUsers, { depth: null });
};

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
