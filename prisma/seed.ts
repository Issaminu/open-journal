// const { bcrypt } = require("@bcrypt");
// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const { fakerEN_US } = require("@faker-js/faker");

const userCount = 20;
const articleCount = 300;
const categoryCount = 300;
const commentCount = 500;

enum Role {
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
}
const prisma = new PrismaClient();
const faker = fakerEN_US;

async function main() {
  try {
    const fakeUsers = generateFakeUsers(userCount, Role.AUTHOR);
    const testUser = {
      name: "Issam Boubcher",
      email: "test@gmail.com",
      password: "123123123",
      role: Role.AUTHOR,
    };
    // const fakeAdmin = generateFakeUsers(1, Role.ADMIN);

    await prisma.user.createMany({ data: fakeUsers }),
      // prisma.user.create({ data: fakeAdmin }),
      await prisma.user.upsert({
        where: {
          email: testUser.email,
        },
        update: testUser,
        create: testUser,
      });

    const lastUser = await prisma.user.findFirst({
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
      },
    });
    const lastAuthorId = lastUser ? lastUser.id : 1;
    const firstAuthorId = lastUser ? lastAuthorId - userCount + 1 : 1;

    const fakeCategories = generateFakeCategories(
      categoryCount,
      firstAuthorId,
      lastAuthorId
    );
    await prisma.category.createMany({ data: fakeCategories });

    const fakeArticles = generateFakeArticles(
      articleCount,
      firstAuthorId,
      lastAuthorId
    );

    await prisma.article.createMany({ data: fakeArticles });

    const lastArticle = await prisma.article.findFirst({
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
      },
    });
    const lastArticleId = lastArticle ? lastArticle.id : 1;
    const firstArticleId = lastArticle ? lastArticleId - articleCount + 1 : 1;

    const fakeComments = generateFakeComments(
      commentCount,
      firstAuthorId,
      lastAuthorId,
      firstArticleId,
      lastArticleId
    );

    await prisma.comment.createMany({ data: fakeComments });

    console.log(
      `Added ${userCount} users, ${articleCount} articles, ${categoryCount} categories, and ${commentCount} comments.`
    );
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
}
main();

function generateFakeUsers(count: number, role: Role) {
  return [...Array(count)].map(() => {
    // const password = bcrypt.hash(faker.internet.password(), 10);
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: role,
    };
  });
}

function generateContent(minSentences: number, maxSentences: number) {
  let content = "";
  const numSentences =
    Math.floor(Math.random() * (maxSentences - minSentences + 1)) +
    minSentences;

  for (let i = 0; i < numSentences; i++) {
    const sentence = faker.lorem.sentence();

    // Apply random Markdown styling to the sentence
    const formattedSentence = formatSentence(sentence);

    content += `${formattedSentence} `;
  }

  return content.trim();
}

function formatSentence(sentence: string) {
  const formattingOptions = ["**", "*", "_"];
  const numFormattingTags = Math.floor(Math.random() * 2) + 1; // Apply 1-2 formatting tags randomly
  let formattedSentence = sentence;

  for (let i = 0; i < numFormattingTags; i++) {
    const formattingTag =
      formattingOptions[Math.floor(Math.random() * formattingOptions.length)];
    const startIndex = Math.floor(Math.random() * formattedSentence.length);
    const endIndex =
      Math.floor(Math.random() * (formattedSentence.length - startIndex)) +
      startIndex +
      1;

    formattedSentence =
      formattedSentence.substring(0, startIndex) +
      formattingTag +
      formattedSentence.substring(startIndex, endIndex) +
      formattingTag +
      formattedSentence.substring(endIndex);
  }

  return formattedSentence;
}

function generateArticle(
  numParagraphs: number,
  minSentences: number,
  maxSentences: number
) {
  let article = "";
  let tableOfContents = "";
  for (let i = 0; i < numParagraphs; i++) {
    const header1 = `# Header 1 ${i + 1}\n\n`;
    const content = generateContent(minSentences, maxSentences);
    article += `${header1}${content}\n\n`;

    tableOfContents += `${header1}`;

    const numHeader2 = Math.floor(Math.random() * 3) + 2; // Generate 2-4 Header 2 sections
    for (let j = 0; j < numHeader2; j++) {
      const header2 = `## Header 2 ${j + 1}\n\n`;
      const header2Content = generateContent(minSentences, maxSentences);
      article += `${header2}${header2Content}\n\n`;

      const numHeader3 = Math.floor(Math.random() * 3) + 2; // Generate 2-4 Header 3 sections
      for (let k = 0; k < numHeader3; k++) {
        const header3 = `### Header 3 ${k + 1}\n\n`;
        const header3Content = generateContent(minSentences, maxSentences);
        article += `${header3}${header3Content}\n\n`;
      }
    }
  }

  return { article, tableOfContents };
}

function generateFakeArticles(
  count: number,
  minAuthorId: number,
  maxAuthorId: number
) {
  return [...Array(count)].map(() => {
    const title = faker.lorem.sentence();
    const content = faker.lorem.paragraphs(10);
    return {
      title: title.charAt(0).toUpperCase() + title.slice(1).slice(0, -1), // The last slice is for removing the dot from the end of sentence
      content: content,
      isPublished: true,
      authorId: faker.number.int({ min: minAuthorId, max: maxAuthorId }),
      image: `https://picsum.photos/1024/600?fakeSearchParam=${Math.floor(
        Math.random() * 1000
      )}`, // The fake search param is to avoid getting a cache HIT from next/image for the same URL, which would result in the same image being used for all articles
      categoryId: faker.number.int({ min: 1, max: categoryCount }),
    };
  });
}

function generateFakeCategories(
  count: number,
  minAuthorId: number,
  maxAuthorId: number
) {
  return [...Array(count)].map(() => {
    const name = faker.word.noun();
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      authorId: faker.number.int({ min: minAuthorId, max: maxAuthorId }),
    };
  });
}

function generateFakeComments(
  count: number,
  minAuthorId: number,
  maxAuthorId: number,
  minArticleId: number,
  maxArticleId: number
) {
  return [...Array(count)].map(() => {
    const content = faker.lorem.paragraph();
    return {
      content: content.charAt(0).toUpperCase() + content.slice(1),
      authorId: faker.number.int({ min: minAuthorId, max: maxAuthorId }),
      articleId: faker.number.int({ min: minArticleId, max: maxArticleId }),
    };
  });
}
