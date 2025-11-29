// import Article from "../models/Articles.model";

// export async function saveArticle(articles) {
//   for (const article of articles) {
//     await Article.findOneAndUpdate(
//       { externalId: article.id },
//       {
//         title: article.title,
//         description: article.description,
//         cover_image: article.cover_image,
//         published_at: article.published_at,
//         tags: article.tags,
//         externalId: article.externalId,
//       },
//       { upsert: true, new: true }
//     );
//   }
// }
