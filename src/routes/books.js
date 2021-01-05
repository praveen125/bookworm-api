import express from "express";
import request from "request-promise";
import { parseString } from "xml2js";
import authenticate from "../middlewares/authenticate";

const router = express.Router();
router.use(authenticate);

router.get("/search", authenticate, (req, res) => {
  request
    .get(
      `https://www.goodreads.com/search/index.xml?key=2hQXKL4ciq2rLS3Ld3w=${req.query.q}`
    )
    .then((result) =>
      parseString(result, (err, goodreadsResult) =>
        res.json({
          books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
            (work) => ({
              goodreadsId: work.best_book[0].id[0]._,
              title: work.best_book[0].title[0],
              authors: work.best_book[0].author[0].name[0],
              covers: [work.best_book[0].image_url[0]],
            })
          ),
        })
      )
    );
});

//   res.json({
//     books: [
//       {
//
//
//         goodreadsId: 2,
//         title: "Three Men in a Boat",
//         authors: "Jerome K. Jerome",
//         covers: [
//           "https://images.gr-assets.com/books/1392791656l/4921.jpg",
//           "https://images.gr-assets.com/books/1312036878l/627830.jpg",
//         ],
//         pages: 256,
//       },
//     ],
//   });
// });

export default router;
